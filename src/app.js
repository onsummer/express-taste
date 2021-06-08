import express from 'express'
import pg from 'pg'
import { readFileSync } from 'fs'
import { regist } from '../routes/index.js'
const app = express()

/* PostgreSQL */
const config = {
  host: 'localhost',
  port: 9876,
  user: 'postgres',
  password: 'postgres',
  database: 'chenxh_test',
  ssl: false
}
const client = new pg.Client(config)
client.connect(err => {
  if (err) {
    throw err
  } else {
    queryDatabase()
  }
})

const queryDatabase = () => {
  const queryStr = /* sql */ `
  DROP SCHEMA IF EXISTS "express_test" CASCADE;
  CREATE SCHEMA "express_test";
  DROP TABLE IF EXISTS "express_test"."inventory";
  CREATE TABLE "express_test"."inventory" (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
  INSERT INTO "express_test"."inventory" (name, quantity) VALUES ('banana', 150);
  INSERT INTO "express_test"."inventory" (name, quantity) VALUES ('orange', 154);
  INSERT INTO "express_test"."inventory" (name, quantity) VALUES ('apple', 10);
  `
  client.query(queryStr)
  .then(() => {
    console.log('成功创建表！')
    client.end(() => {
      console.log('关闭数据库连接。')
    })
  })
  .catch(err => {
    console.log(err)
  })
  .then(() => {
    console.log('结束执行查询。')
    // process.exit()
  })
}
/* End PostgreSQL */

regist(app)

app.get('/', (req, res) => {
  res.type('html')
  res.send(readFileSync('pages/index.html').toString())
})

app.listen(3000, () => {
  console.log('http://localhost:3000 正在运行')
})