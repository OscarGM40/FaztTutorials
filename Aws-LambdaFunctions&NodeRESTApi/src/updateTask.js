const AWS = require("aws-sdk");

exports.UPDATE_TASK = async (event) => {
  
  const id = event.pathParameters.id;
  const { title, description, done } = JSON.parse(event.body);
  
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  try {
    const result = await dynamoDb.update({
      TableName: "TaskTable",
      Key: { id, },
      /* para actualizar se usan PreparedStatements */
      UpdateExpression: "set title = :title, description = :description, done = :done",
      ExpressionAttributeValues: {
          ":title": title,
          ":description": description,
          ":done": done,
          },
      ReturnValues: "UPDATED",
          }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify("Task updated MQTT"),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch the task item.",
    };
  }
};
