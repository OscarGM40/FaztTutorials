const AWS = require('aws-sdk');

exports.GET_TASK = async (event) => {
  const id = event.pathParameters.id;

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  try {
    const result = await dynamoDb.get({
      TableName: 'TaskTable',
      Key: { id:id }}).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the task item.',
    };
  }
}