const Koa = require("koa");
const serve = require("koa-static");
const Router = require("koa-router");
const superagent = require("superagent");

const app = new Koa();
const router = new Router();

const juejinConfig = {
  url: "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed",
  body: { id_type: 2, sort_type: 0, limit: 20 },
  headers: {
    "content-type": "application/json",
  },
};

router.get("/api/articles", async (ctx) => {
  const randomIndex = Math.floor(Math.random() * 100 + 1);
  const originArticles = await superagent
    .post(juejinConfig.url)
    .send({
      ...juejinConfig.body,
      cursor: Buffer.from(
        `{"v":"7168775357762387999","i": ${randomIndex}}`
      ).toString("base64"),
    })
    .set(juejinConfig.headers);
  const articles = JSON.parse(originArticles.text)
    .data.flat()
    .filter((x) => x.item_type !== 14)
    .sort(
      (a, b) =>
        b.item_info.article_info.digg_count -
        a.item_info.article_info.digg_count
    );
  ctx.body = articles;
});

app.use(router.routes());
app.use(serve(__dirname + "/public"));

app.listen(3000);
