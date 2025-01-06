"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTasks = exports.getExcel = void 0;
const database_1 = __importDefault(require("../config/database"));
const xlsx_1 = __importDefault(require("xlsx"));
const taskModel_1 = require("../models/taskModel");
const getExcel = async (req, res) => {
    try {
        if (!req.file) {
            console.log(" no file");
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const sheet = xlsx_1.default.readFile(req.file.path);
        const sheet_name = sheet.SheetNames[0];
        console.log(" sheet name => ", sheet_name);
        const worksheet = sheet.Sheets[sheet_name];
        const data = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(" data ----> ", data);
        const tasks = data.slice(1).map((row) => ({
            task_name: row[0],
            status: row[1],
        }));
        const insertData = tasks.map((task) => {
            return database_1.default.execute('INSERT INTO tasks (task_name, status) VALUES (?, ?)', [task.task_name, task.status]);
        });
        await Promise.all(insertData);
        res.status(200).json({ message: 'Tasks imported successfully' });
    }
    catch (error) {
        console.log(" error on file : ", error);
        res.status(500).json({ message: 'Error processing file', error: error });
    }
};
exports.getExcel = getExcel;
const filterTasks = async (req, res) => {
    try {
        const { status } = req.query;
        const tasks = await (0, taskModel_1.getFilteredTasks)(status);
        res.status(200).json({ tasks });
        return;
    }
    catch (error) {
        console.log(" error on filter : ", error);
        res.status(500).json({ message: 'Error fetching the tasks', error: error });
        return;
    }
};
exports.filterTasks = filterTasks;
