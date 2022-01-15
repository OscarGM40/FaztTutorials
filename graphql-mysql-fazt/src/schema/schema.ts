
/* UNO con la clase GraphQLSchema debo crear un schema,el cual tendrá una RootQuery y una RootMutation albergando todas las queries y mutations de este schema */
/* DOScon la clase GraphQLObjectType puedo crear un Object,será una RootQuery y una RootMutation*/
import { GraphQLSchema,GraphQLObjectType } from 'graphql';
import { CREATE_USER } from './Mutations/User';
import { GREETING } from './Queries/Greeting';

/* un GraphQLObjectType recibe un objeto de configuración con las propiedades name y fields.En fields irán definidas todas las queries o mutations que puedo usar */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    greeting:GREETING
  }
});

/* normalmente un schema tendrá queries y mutations */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER
  }
})

/* un schema siempre va a tener dos propiedades,query(consultar datos,sin alterar) y mutation(alterar datos). */
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

