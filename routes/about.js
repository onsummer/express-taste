import express from 'express'
const r = express.Router()

r.get('/about', (req, res) => {
  res.send('about 路由')
})

export default r