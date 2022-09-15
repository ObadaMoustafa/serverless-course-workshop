const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();

const defaultResults = 8;
const TableName = process.env.restaurants_table;

const findRestaurantsByTheme = async (theme, count) => {
  console.log(
    `finding (up to ${count}) restaurants with the theme ${theme}...`
  );
  const req = {
    TableName,
    Limit: count,
    FilterExpression: "contains(themes, :theme)",
    ExpressionAttributeValues: { ":theme": theme },
  };

  const resp = await dynamodb.scan(req).promise();
  console.log(`found ${resp.Items.length} restaurants`);
  return resp.Items;
};

module.exports.handler = async (e, context) => {
  const req = JSON.parse(e.body);
  const theme = req.theme;
  const restaurants = await findRestaurantsByTheme(theme, defaultResults);
  const response = { statusCode: 200, body: JSON.stringify(restaurants) };
  return response;
};
