const mode = process.env.TEST_MODE;
const cheerio = require("cheerio");
const when = require("../steps/when");
const { init } = require("../steps/init");

describe(`When we invoke the GET / endpoint`, () => {
  beforeAll(async () => await init());
  it(`Should return the index page with 8 restaurants`, async () => {
    const res = await when.we_invoke_get_index();

    expect(res.statusCode).toEqual(200);
    const contentType = mode === "handler" ? "Content-Type" : "content-type";
    expect(res.headers[contentType]).toEqual("text/html");
    expect(res.body).toBeDefined();

    const $ = cheerio.load(res.body);
    const restaurants = $(".restaurant", "#restaurantsUl");
    expect(restaurants.length).toEqual(8);
  });
});
