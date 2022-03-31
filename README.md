1. main.js : 기본 db 연결 및 DB injection attack 예방
2. sequelize.js : sequelize.js 이용한 db 마이그레이션
3. gql.js : GraphQL 이용한 db 제어

FRONT :none
BACK : none
DB : MSSQL, Sequelize, sequelize-cli , GraphQL
DevOps : dotenv, prompt, command

sequelize 명령어

```
npm run seq init
npm run seq -- migration:generate --name initialize
npm run seq -- migration:generate --name add-cities
npm run seq db:migrate
npm run seq db:migrate:undo
```

DB 마이그레이션 하는 이유
개발하다보면프롣덕션 코드와 db 버전이 달라지는경우가 발생
그래서 db 버전관리를 하기 위함
