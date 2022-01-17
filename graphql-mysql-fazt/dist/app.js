"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/* me traigo express y lo inicio */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
/* graphqlHTTP es un middleware para definir donde va GraphiQL,la interfaz gráfica y qué schema usará*/
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
/* Defino la url donde sacar a GraphiQL(un schema define qué es lo que puede consultar) */
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema: schema_1.schema
}));
