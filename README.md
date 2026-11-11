# DevOps na Prática — Fase 1

![CI](https://github.com/Lolapachorra/devops-na-pratica/actions/workflows/ci.yml/badge.svg)

API REST simples de tarefas (Node.js, sem dependências) usada para demonstrar CI e IaC.

| Item | Onde |
|---|---|
| Código da API | `src/` |
| Testes automatizados (`node:test`) | `test/` |
| Pipeline de CI (GitHub Actions) | `.github/workflows/ci.yml` |
| Infraestrutura como Código (Terraform/AWS) | `infra/` |

## Rodar local
```bash
npm start      # http://localhost:3000/health
npm test
```

## Endpoints
- `GET /health` → `{ "status": "ok" }`
- `GET /tasks` → lista tarefas
- `POST /tasks` `{ "title": "..." }` → cria tarefa

## Infraestrutura
```bash
cd infra
terraform init
terraform plan
terraform apply   # cria VPC, subnet pública, SG e EC2 t3.micro
terraform destroy
```
O CI apenas valida (`fmt`, `validate`) — não provisiona nada, então não gera custo.
