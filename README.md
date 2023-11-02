<h1 align="center">Welcome to nestjs-prisma-hr 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.17.1-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D9.6.7-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: UNLICENSED" src="https://img.shields.io/badge/License-UNLICENSED-yellow.svg" />
  </a>
</p>

> NestJS, Sequelize, MySQL, TypeScript를 이용한 REST API

## Prerequisites

- node >=18.17.1
- npm >=9.6.7
- [download & run SQL script - MySQL](https://github.com/nomemory/hr-schema-mysql/blob/master/hr-schema-mysql.sql)
  - DB & Table Create
  - Sample Data Insert

## Install

```sh
$ npm install
```

## Usage

```sh
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## .env configuration

```sh
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=database
DB_LOGGING=false
DB_POOL_MAX=5
DB_POOL_MIN=0
JWT_SECRET=MDBjMWJlMzc4M2JhNGExY2FmNTRkZmU0NjlhNTRjYmY=
```

## Author

👤 **Changhoon Jee <chjee71@gmail.com>**

- Github: [@chjee](https://github.com/chjee)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
