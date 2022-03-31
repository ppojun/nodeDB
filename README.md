FRONT
BACK
DB : MSSQL, Sequelize, sequelize-cli , GraphQL
DevOps : dotenv, prompt, command

npm run seq init
npm run seq -- migration:generate --name initialize
npm run seq db:migrate
npm run seq db:migrate:undo
npm run seq -- migration:generate --name add-cities

DB 마이그레이션 하는 이유
개발하다보면프롣덕션 코드와 db 버전이 달라지는경우가 발생
그래서 db 버전관리를 하기 위함
