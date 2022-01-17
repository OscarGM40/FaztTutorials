


/* la funcion createConnection me permite conectarme a una db */
import { createConnection } from 'typeorm';
import { Users } from './entities/User';

const PE = process.env;

export const connectDB = async () => {
    await createConnection({
      type: 'mysql',
      host: PE.DB_HOST,
      port: +PE.DB_PORT!, // el port va como number
      username: PE.DB_USER,
      password: PE.DB_PASSWORD,
      database: PE.DB_DATABASE,
      entities: [Users],
      synchronize: true, // si no existe la db o las tablas la crea
      ssl: false, //como es local iremos sin ssl
    });
}