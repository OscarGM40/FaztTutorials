"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_USER = exports.DELETE_USER = exports.CREATE_USER = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../entities/User");
const User_2 = require("../customTypes/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Message_1 = require("../customTypes/Message");
/* cuando ejecute CREATE_USER voy a devolver algun tipo.Ese tipo debe suministrarse en la propiedad type y coincidir con el return del resolver */
exports.CREATE_USER = {
    type: User_2.UserType,
    /* los argumentos se reciben en la propiedad args */
    args: {
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    },
    /* si una acción usa args el resolve los va a recibir en la segunda posición */
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = args;
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            const result = yield User_1.Users.insert({ name, email, password: hashedPassword });
            console.log(result);
            return Object.assign(Object.assign({ id: result.identifiers[0].id }, args), { password: hashedPassword });
        });
    }
};
exports.DELETE_USER = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield User_1.Users.delete(id);
            // console.log(result);
            if (result.affected === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    }
};
exports.UPDATE_USER = {
    type: Message_1.MessageType,
    args: {
        id: { type: graphql_1.GraphQLID },
        campos: {
            type: new graphql_1.GraphQLInputObjectType({
                name: 'campos',
                fields: {
                    name: { type: graphql_1.GraphQLString },
                    email: { type: graphql_1.GraphQLString },
                    oldPassword: { type: graphql_1.GraphQLString },
                    newPassword: { type: graphql_1.GraphQLString }
                }
            })
        }
        /* name: { type: GraphQLString },
        email: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString } */
    },
    resolve(_, { campos: input, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            /* habria que comparar las passwords */
            const userFound = yield User_1.Users.findOne(id);
            if (!userFound) {
                return {
                    success: false,
                    message: "User not found"
                };
            }
            const isMatch = bcryptjs_1.default.compareSync(input.oldPassword, userFound.password); //normal-hashed
            /* si no coinciden no tiene autorización */
            if (!isMatch) {
                return {
                    success: false,
                    message: "Las contraseñas no coinciden"
                };
            }
            /* si coinciden puede cambiar su password,luego encripto su nueva password*/
            const encryptedPassword = bcryptjs_1.default.hashSync(input.newPassword, bcryptjs_1.default.genSaltSync(10));
            const result = yield User_1.Users.update({ id }, {
                name: input.name,
                email: input.email,
                password: encryptedPassword
            });
            console.log(result);
            if (result.affected === 1) {
                return {
                    success: true,
                    message: "Usuario actualizado"
                };
            }
            else {
                return {
                    success: false,
                    message: "No se pudo actualizar el usuario"
                };
            }
        });
    }
};
