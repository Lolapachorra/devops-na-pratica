const http = require('node:http');

// Tarefas em memória; trocar por banco (RDS) nas próximas fases
function createApp() {
  const tasks = [];
  let nextId = 1;

  const send = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') return send(res, 200, { status: 'ok' });
    if (req.url !== '/tasks') return send(res, 404, { error: 'not found' });
    if (req.method === 'GET') return send(res, 200, tasks);
    if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });

    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      let data;
      try { data = JSON.parse(raw); } catch { return send(res, 400, { error: 'invalid json' }); }
      if (!data || typeof data.title !== 'string' || !data.title.trim()) {
        return send(res, 400, { error: 'title is required' });
      }
      const task = { id: nextId++, title: data.title.trim(), done: false };
      tasks.push(task);
      send(res, 201, task);
    });
  });
}

module.exports = { createApp };
