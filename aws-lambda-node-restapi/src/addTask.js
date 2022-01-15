const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
  /* recibiré un title y una description para crear una task.Ojo,hay que parsearlo desde el JSON en este BaaS */
  const { title, description } = JSON.parse(event.body);
  const createdAt = new Date();

  /* me conecto a la tabla de DynamoDB(usará las Credentials actuales) */
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    /* para guardar necesitaré la TableName,el Item a guardar,el cual es un objeto  */
    const dataToSave = {
      TableName: "TaskTable",
      /* creo una task con los datos recibidos */
      Item: {
        /* creo un id con la libreria uuid */
        id: v4(),
        title,
        description,
        createdAt,
      },
    };

    /* una vez conectado puedo usar la conexión,la cual la tengo en la variable dynamoDb para interactuar con la tabla */
    /* hay que usar promise para pasarlo a promesa */
    await dynamoDb.put(dataToSave).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(dataToSave.Item),
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
  addTask,
}