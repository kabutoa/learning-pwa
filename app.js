const Koa = require("koa");
const serve = require("koa-static");
const Router = require("koa-router");
const data = require("./data");

const app = new Koa();
const router = new Router();

router.get("/api/news", async (ctx, next) => {
  const { keywords } = ctx.query;
  ctx.body = data.filter((item) => item.title.includes(keywords));
});

app.use(router.routes());
app.use(serve(__dirname + "/public"));

app.listen(3000);
