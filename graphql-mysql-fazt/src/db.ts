


/* la funcion createConnection me permite conectarme a una db */
import { createConnection } from 'typeorm';
import { Users } from './entities/User';

export const connectDB = async () => {
    await createConnection({
      type: 'mysql',
      host: '0.0.0.0',
      port: 3307, // el port va como number
      username: 'root',
      password: 'root',
      database: 'graphql_typeorm_fazt',
      entities: [Users],
      synchronize: true, // si no existe la db o las tablas la crea
      ssl: false, //como es local iremos sin ssl
    });
}