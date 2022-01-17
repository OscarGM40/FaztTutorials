
/* UNO con la clase GraphQLSchema debo crear un schema,el cual tendrá una RootQuery y una RootMutation albergando todas las queries y mutations de este schema */
/* DOScon la clase GraphQLObjectType puedo crear un Object,será una RootQuery y una RootMutation*/
import { GraphQLSchema,GraphQLObjectType } from 'graphql';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './Mutations/User';
import { GET_ALL_USERS, GET_ONE_USER } from './Queries/User';

/* un GraphQLObjectType recibe un objeto de configuración con las propiedades name y fields.En fields irán definidas todas las queries o mutations que puedo usar */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: GET_ALL_USERS,
    getOneUser: GET_ONE_USER,
  }
});

/* normalmente un schema tendrá queries y mutations */
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
  }
})

/* un schema siempre va a tener dos propiedades,query(consultar datos,sin alterar) y mutation(alterar datos). */
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

