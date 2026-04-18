# nestjs-sequelize-hr

NestJS, Sequelize, MySQL, TypeScript를 이용한 HR REST API입니다.

## Requirements

- Node.js >= 18.17.1
- npm >= 9.6.7
- MySQL

## Install

```sh
npm install
```

## Environment

`.env.local` 또는 `.env`에 아래 값을 설정합니다. `.env.local`이 `.env`보다 먼저 로드됩니다.

```sh
NODE_ENV=development
LISTEN_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=database
DB_LOGGING=false
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_SYNC=false
DB_MIGRATE=true

JWT_SECRET=MDBjMWJlMzc4M2JhNGExY2FmNTRkZmU0NjlhNTRjYmY=
REFRESH_TOKEN_TTL_DAYS=7
ALLOWED_ORIGINS=http://localhost:3000
```

`DB_SYNC=true`는 Sequelize sync를 실행합니다. 일반 개발/운영에서는 migration 기반의 `DB_MIGRATE=true` 사용을 권장합니다.

## Run

```sh
npm run start:dev
npm run start:prod
```

Swagger 문서는 실행 후 `/api-docs`에서 확인할 수 있습니다.

## Test and Quality

```sh
npm run build
npm run lint
npm run lint:fix
npm test
npm run test:e2e
npm audit --omit=dev
```

`npm run lint`는 검사만 수행하고, 자동 수정은 `npm run lint:fix`로 분리되어 있습니다.

`npm run test:e2e`는 실제 MySQL 연결 대신 테스트 provider를 사용하므로 로컬 개발 DB를 변경하지 않습니다.
