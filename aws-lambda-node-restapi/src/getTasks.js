const AWS = require('aws-sdk');

const GET_TASKS = async (event) => {

  /* lo primero será conectarme a la DD */
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    /* una vez conectado puedo usar la conexión,la cual la tengo en la variable dynamoDb para interactuar con la tabla */
    /* hay que usar promise para pasarlo a promesa */
    /* scan permite escanear una tabla */
    const data = await dynamoDb.scan({
      TableName: 'TaskTable'
    }).promise();
    /* siempre se devuelve xxx.Items?? */
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

module.exports = {
  GET_TASKS,
};
