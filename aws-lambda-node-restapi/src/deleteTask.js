const AWS = require("aws-sdk");

exports.DELETE_TASK = async (event) => {

  const {id} = event.pathParameters;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  try {
    await dynamoDb.delete({
      TableName: "TaskTable",
      Key: { id, },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify("Task deleted with success"),
    };
  }catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't delete the task item.Watch CloudWatch Logs for details.",
    };
  }
}