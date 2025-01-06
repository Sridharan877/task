"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    await database_1.default.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const [data] = await database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = data;
    console.log(" data : ", data);
    return user.length ? user[0] : null;
};
exports.findUserByEmail = findUserByEmail;
