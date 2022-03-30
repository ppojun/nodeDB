require('dotenv').config()
const { Sequelize } = require('sequelize')

async function main() {
  const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    host: 'localhost',
    dialect: 'mssql', //postgres'|'sqlite'|''|'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // SQLite only
    //storage: 'path/to/database.sqlite'
  })

  const User = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  const City = sequelize.define(
    'city',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  User.belongsTo(City)

  await sequelize.sync({
    //alter: true,
    force: true,
  })

  const newCity = City.build({
    name: 'Seoul',
  }).save()

  const newUser = User.build({
    name: 'Coco',
    age: 24,
    cityId: (await newCity).getDataValue('id'),
  }).save()

  await sequelize.authenticate()
  await sequelize.close()
}

main()
