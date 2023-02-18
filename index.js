const app = require("./config");
const USER_TABLE = "Music";
module.exports.handler = async (event) => {
  const { Items } = await app.scan({ TableName: USER_TABLE }).promise();
  console.log("=============>", Items);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: Items,
      },
      null,
      2
    ),
  };
};

module.exports.addUser = async (event) => {
  console.log("==============>", event.pathParameters);
  // const params = {
  //   ID: 1,
  //   Artist: "shaem & co",
  //   SongTitle: "2song",
  // };
    const params = { "Artist": "Acme Band", "SongTitle": "Happy Day"}
  const { Item } = await app
    .put({ TableName: USER_TABLE, Item: params })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "POST executed successfully!",
        input: Item,
      },
      null,
      2
    ),
  };
};

module.exports.updateUser = async (event) => {
  // update-item \
  //   --table-name Music \
  //   --key '{ "Artist": {"S": "Acme Band"}, "SongTitle": {"S": "Happy Day"}}' \
  //   --update-expression "SET AlbumTitle = :newval" \
  //   --expression-attribute-values '{":newval":{"S":"Updated Album Title"}}' \
  //   --return-values ALL_NEW

  const { Item } = await app
      .update({ 
        TableName: USER_TABLE,
        Key: { "Artist": "shaem & co", "SongTitle": "2song"} ,
        UpdateExpression: "SET ID = :newval",
        ExpressionAttributeValues: {":newval": 20},
        ReturnValues: 'ALL_NEW'
        })
      .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "POST updateUser executed successfully!",
        input: Item,
      },
      null,
      2
    ),
  };
};

module.exports.viewUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GET viewUser executed successfully!",
        // input: event.body,
      },
      null,
      2
    ),
  };
};
