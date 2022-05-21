const Router = require('@koa/router')
const router = new Router({
  prefix: '/users'
})

router.post('/login', (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      username: '吴沧海',
      user_token: 'AN9230lkjfefjiefjeil212121',
      time: +new Date()
    },
    msg: '=ok'
  }
})

module.exports = router
