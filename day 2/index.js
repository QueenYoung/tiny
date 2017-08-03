const Koa = require('koa');

const app = new Koa();
const Router = require('koa-router');
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');

const route = new Router();

app.use(bodyparser());
app.use(serve(`${__dirname}/public`));

route
  .get('/', (ctx) => {
    ctx.response.body = fs.createReadStream('index.html');
  })
  .post('/cool/', (ctx) => {
    console.log(ctx.request.body);
    console.log(ctx.request.rawBody);
  });
app.use(route.routes());
app.listen(3000, () => console.log('i am in'));

class A {
}
