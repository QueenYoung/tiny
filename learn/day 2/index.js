const Koa = require('koa');

const app = new Koa();
const Router = require('koa-router');
const serve = require('koa-static');
const fs = require('fs');
const port = 3001;

const route = new Router();

app.use(serve(`${__dirname}/public/`));

route
  .get('/', (ctx) => {
    ctx.response.body = fs.createReadStream('index.html');
  });
app.use(route.routes());
app.use(require('./cool'));

app.listen(port, () => console.log('i am in'));
