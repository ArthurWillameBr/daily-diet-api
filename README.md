# Daily Diet API

## Descrição do Projeto 📃

Daily Diet API é uma aplicação backend focada no controle de dietas com elementos de gamificação e integração com inteligência artificial (IA). O objetivo é ajudar os usuários a monitorar suas métricas alimentares e se manterem motivados a seguir suas dietas por meio de uma abordagem interativa e personalizada.

## Tecnologias utilizadas 👩‍💻
- [Node.js](https://nodejs.org/pt) - Plataforma backend.
- [Fastify](https://fastify.dev/) - Framework para construção de APIs REST.
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para maior segurança no desenvolvimento.
- [Prisma ORM](https://www.prisma.io/) - Mapeamento objeto-relacional para manipulação de dados.
- [PostgresSQL]([https://www.mysql.com/](https://www.postgresql.org/download/)) - Bancos de dados relacional
- [JWT](https://jwt.io/) - Autenticação baseada em tokens.

## Pré-requisitos ⚠

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).


## Rodando a aplicação 🚀

```bash
# Clone este repositório
$ git clone <https://github.com/ArthurWillameBr/daily-diet-api.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd daily-diet-api

# Instale as dependências
$ npm install

# Configure o arquivo de variáveis de ambiente
# Existe um arquivo chamado .env.example no projeto. Renomeie-o para .env e configure as variáveis de acordo com seu ambiente.

# No arquivo .env, adicione a string de conexão com o banco de dados, como por exemplo:
DATABASE_URL="mysql://user:password@localhost:3306/diet_dail_db"

# Execute as migrações do Prisma para criar as tabelas no banco de dados
$ npx prisma migrate dev

# Opcional: Visualize o banco de dados com o Prisma Studio
$ npx prisma studio

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```
