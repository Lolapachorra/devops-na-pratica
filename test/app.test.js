const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { createApp } = require('../src/app');

let server, base;
before(async () => {
  server = createApp().listen(0);
  await new Promise((r) => server.once('listening', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const post = (body) => fetch(`${base}/tasks`, { method: 'POST', body });

test('GET /health retorna ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('POST /tasks cria tarefa e GET lista', async () => {
  const res = await post(JSON.stringify({ title: '  Configurar CI  ' }));
  assert.strictEqual(res.status, 201);
  assert.deepStrictEqual(await res.json(), { id: 1, title: 'Configurar CI', done: false });
  const list = await (await fetch(`${base}/tasks`)).json();
  assert.strictEqual(list.length, 1);
});

test('POST /tasks rejeita título vazio e JSON inválido', async () => {
  assert.strictEqual((await post(JSON.stringify({ title: '' }))).status, 400);
  assert.strictEqual((await post('{nope')).status, 400);
});

test('rota desconhecida retorna 404 e método inválido 405', async () => {
  assert.strictEqual((await fetch(`${base}/x`)).status, 404);
  assert.strictEqual((await fetch(`${base}/tasks`, { method: 'DELETE' })).status, 405);
});
