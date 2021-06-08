import express from 'express'
const r = express.Router()

r.get('/blog', (req, res) => {
  res.send('blog 路由')
})

export default r