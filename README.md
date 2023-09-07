# AudsatTest

Este projeto foi inicializado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.1.

## Tecnologias

As seguintes ferramentas foram utilizadas para criar esse projeto:

- [Angular](https://angular.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [JSONServer](https://github.com/typicode/json-server)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [VSCode](https://code.visualstudio.com/)

## Desafios

- Utilizado LazyLoad para os módulos roteados
- Utilizado JSON Server para persistir as ações do Administrador
- Utilizado JSONPlaceholder para buscar os dados apresentados no projeto
- Adicionado teste unitários com Jest
- Usado service com BehaviorSubject para controlar/detectar as ações do usuário e persistir as ações
- Usado operador takeUntil do RxJS para se desenscrever das assisnaturas dos Observables automaticamente na destruição do componente
- Utilizado SAS para estilização

## 💻 Primeiros passos

### Requisitos

**Clone o projeto**

```bash
$ git clone https://github.com/matheusazambuja/audsat-test.git
```

## Iniciar

**Siga os passos abaixo**

Para iniciar a aplicação, use os seguintes comandos:

```bash
# - Se você tem instalado o Yarn
# Instalação de dependências
$ yarn
# Inicia o backend JSON Server
$ yarn json-server:start
# Rodar a aplicação
$ yarn start
```

```bash
# - Se você tem instalado o NPM
# Instalação de dependências
$ npm install
# Inicia o backend JSON Server
$ npm run json-server:start
# Rodar a aplicação
$ npm run start
```

A aplicação vai estar disponível para acessar em `http://localhost:4200/`

---

## Running unit tests

Rodar `yarn test` para executar os teste unitários via [Jest](https://jestjs.io/).
