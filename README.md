# Desafio U4C

## Especificações técnicas

- API RESTful
- Typescript
- HapiJS
- TypeORM
- PostgresSQL
- Jest

## Problema

Modele um domínio para o seguinte problema:

Sistema para uma empresa de proteção veicular.

Casos de uso [link](features/desafio.md)

## Como rodar

Na raiz do projeto instale os pacotes necessários usando `npm i`.

### Modo Teste

Para rodar a aplicação em modo teste:
`npm test`

### Configuração de Tabelas e Banco de Dados

Para rodar a aplicação em modo de Dev, devemos primeiro subir o banco de dados:

Alterando o campo de `{CAMINHO_DA_SUA_MAQUINA_PARA_O_VOLUME}` para uma pasta local e persistir os dados dentro do Postgres

Então basta subir usando o comando `docker compose up` lembrando que é necessário ter o docker instalado.

Quando o banco de dados subir crie um arquivo .env no diretório raiz do projeto com as seguintes configurações:

```
POSTGRES_DATABASE=u4c
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=changeme
```

> **_NOTE:_**  Caso o banco de dados padrão não for criado via compose, deve ser feito de maneira manual dentro do docker Postgres.

Feito essa parte estamos prontos para subir nosso esquema de Banco de Dados com os comandos: 

1. `npm run typeorm:generate-migration` 
2. `npm run typeorm:run`

### Modo Dev

Criado nosso banco de dados e nossas tabelas podemos finalmente executar o comando:

`npm run dev` e estamos rodando em http://localhost:3005 !

Para acessar as Docs vá até o link: http://localhost:3005/documentation

### Modo Produção

Comando para Rodar em produção: `npm run start:prod` e a aplicação estará rodando na porta 3005 do localhost (http://localhost:3005)
