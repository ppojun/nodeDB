require('dotenv').config()

const sql = require('mssql')
const program = require('commander')
const prompts = require('prompts')

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  port: Number(process.env.DB_PORT),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local(true) dev / self-signed certs
  },
}

async function connect() {
  try {
    const client = await sql.connect(sqlConfig)
    return client
  } catch (err) {
    console.log(err)
  }
}
program.command('list').action(async () => {
  const client = await connect()
  const query = `SELECT * FROM users`
  const result = await client.query(query)
  console.log(result.recordset)
  console.log(result.rowsAffected)
  await client.close()
})

program.command('add').action(async () => {
  const client = await connect()
  const userName = await prompts({
    type: 'text',
    name: 'userName',
    message: 'Provide a user name to insert',
  })

  try {
    await client
      .request()
      .input('userName', sql.VarChar, userName.userName)
      .query(`INSERT INTO users (name) VALUES ( @userName )`)
  } catch (err) {
    throw err
  }

  //injection 취약점
  // const query = `INSERT INTO users (name) VALUES ('${userName.userName}')`
  // await client.query(query)
  await client.close()
})
program.command('remove').action(async () => {
  const client = await connect()
  const userName = await prompts({
    type: 'text',
    name: 'userName',
    message: 'Provide a user name to delete',
  })

  try {
    await client
      .request()
      .input('userName', sql.VarChar, userName.userName)
      .query(`DELETE FROM users WHERE name = @userName`)
  } catch (err) {
    throw err
  }

  await client.close()
})
program.parseAsync()
