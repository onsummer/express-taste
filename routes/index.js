import About from './about.js'
import Blog from './blog.js'
const routes = [
  About,
  Blog,
]

/**
 * 传入 express 实例来注册所有路由
 * @param {import('express').Express} app - express 实例
 */
export const regist = (app) => {
  routes.forEach(route => app.use(route))
}