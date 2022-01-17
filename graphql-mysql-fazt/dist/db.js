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
exports.connectDB = void 0;
/* la funcion createConnection me permite conectarme a una db */
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const PE = process.env;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: 'mysql',
        host: PE.DB_HOST,
        port: +PE.DB_PORT,
        username: PE.DB_USER,
        password: PE.DB_PASSWORD,
        database: PE.DB_DATABASE,
        entities: [User_1.Users],
        synchronize: true,
        ssl: false, //como es local iremos sin ssl
    });
});
exports.connectDB = connectDB;
