const Koa = require('koa')
// Users
const userAuth = require('./userAuth')
const app = new Koa()

app.use(userAuth.routes()).use(userAuth.allowedMethods())

app.listen(12000)
