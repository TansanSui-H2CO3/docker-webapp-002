const express = require('express')
const app = express()
const port = 8080

const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'sample',
    password: 'postgres',
    port: 5432,
})

app.get('/', (req, res) => {
  res.send('Hello World! konnnititha')
})

app.get('/database', async(req, res) => {
    const db_columns = await pool.query('select * from test')
    res.send(db_columns)
})

app.get('/insert', async(req, res) => {
    await pool.query("insert into test values (nextval('test_id_seq'), 'test_user')")
    res.redirect('/database')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})