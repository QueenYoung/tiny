const Router = require('koa-router');
const route = new Router();
const fs = require('fs');
const path = require('path');
const bodyparser = require('koa-bodyparser');
route.use(bodyparser());

route
  .get('/cool', (ctx) => {
    const imgPath = path.resolve(__dirname, './public/heben.jpeg');
    ctx.body = fs.createReadStream(imgPath);
  })
  .post('/cool', (ctx) => {
    console.log(ctx.request.body);
    ctx.body = { a: 1, b: 2 };
});
module.exports = route.routes();
