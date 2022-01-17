"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
/* UNO con la clase GraphQLSchema debo crear un schema,el cual tendrá una RootQuery y una RootMutation albergando todas las queries y mutations de este schema */
/* DOScon la clase GraphQLObjectType puedo crear un Object,será una RootQuery y una RootMutation*/
const graphql_1 = require("graphql");
const User_1 = require("./Mutations/User");
const User_2 = require("./Queries/User");
/* un GraphQLObjectType recibe un objeto de configuración con las propiedades name y fields.En fields irán definidas todas las queries o mutations que puedo usar */
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: User_2.GET_ALL_USERS,
        getOneUser: User_2.GET_ONE_USER,
    }
});
/* normalmente un schema tendrá queries y mutations */
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: User_1.CREATE_USER,
        deleteUser: User_1.DELETE_USER,
        updateUser: User_1.UPDATE_USER,
    }
});
/* un schema siempre va a tener dos propiedades,query(consultar datos,sin alterar) y mutation(alterar datos). */
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
