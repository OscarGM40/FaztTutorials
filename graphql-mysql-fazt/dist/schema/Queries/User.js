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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ONE_USER = exports.GET_ALL_USERS = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../entities/User");
const User_2 = require("../customTypes/User");
exports.GET_ALL_USERS = {
    type: new graphql_1.GraphQLList(User_2.UserType),
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.Users.find();
        });
    }
};
exports.GET_ONE_USER = {
    type: User_2.UserType,
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.Users.findOne(args.id);
        });
    }
};
