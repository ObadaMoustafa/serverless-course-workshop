require("dotenv").config();
const AWS = require("aws-sdk");
AWS.config.region = "eu-central-1";
const dynamodb = new AWS.DynamoDB.DocumentClient();

const restaurants = [
  {
    name: "Fangtasia",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png",
    themes: ["true blood"],
  },
  {
    name: "Shoney's",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png",
    themes: ["cartoon", "rick and morty"],
  },
  {
    name: "Freddy's BBQ Joint",
    image:
      "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png",
    themes: ["netflix", "house of cards"],
  },
  {
    name: "Pizza Planet",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png",
    themes: ["netflix", "toy story"],
  },
  {
    name: "Leaky Cauldron",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png",
    themes: ["movie", "harry potter"],
  },
  {
    name: "Lil' Bits",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png",
    themes: ["cartoon", "rick and morty"],
  },
  {
    name: "Fancy Eats",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png",
    themes: ["cartoon", "rick and morty"],
  },
  {
    name: "Don Cuco",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png",
    themes: ["cartoon", "rick and morty"],
  },
];

const putReq = restaurants.map(restaurant => ({
  PutRequest: {
    Item: restaurant,
  },
}));

const req = {
  RequestItems: {
    [process.env.restaurants_table]: putReq,
  },
};

dynamodb
  .batchWrite(req)
  .promise()
  .then(() => console.log("all done"))
  .catch(err => console.error(err));
