const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();

const defaultResults = 8;
const tableName = process.env.restaurants_table;
console.log("table name is", tableName);
const getRestaurants = async count => {
  console.log(`fetching ${count} restaurants from ${tableName}...`);
  const req = {
    TableName: tableName,
    Limit: count,
  };

  const resp = await dynamodb.scan(req).promise();
  console.log(`found ${resp.Items.length} restaurants`);
  return resp.Items;
};

module.exports.handler = async (e, context) => {
  const restaurants = await getRestaurants(defaultResults);
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants),
  };

  return response;
};
