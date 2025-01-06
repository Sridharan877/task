"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredTasks = void 0;
const database_1 = __importDefault(require("../config/database"));
const getFilteredTasks = async (status) => {
    try {
        let query = 'SELECT * FROM tasks';
        const params = [];
        if (status) {
            query += 'WHERE status = ?';
            params.push(status);
        }
        const [rows] = await database_1.default.query(query, params);
        return rows;
    }
    catch (error) {
        console.log(" error on filter : ", error);
        throw new Error('Error fetching the tasks');
    }
};
exports.getFilteredTasks = getFilteredTasks;
