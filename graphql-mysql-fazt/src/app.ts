/* me traigo express y lo inicio */
import express from 'express';
const app = express();


/* graphqlHTTP es un middleware para definir donde va GraphiQL,la interfaz gráfica y qué schema usará*/
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';

/* Defino la url donde sacar a GraphiQL(un schema define qué es lo que puede consultar) */
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}));


export { app };
