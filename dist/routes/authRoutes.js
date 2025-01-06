"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const excelcontroller_1 = require("../controllers/excelcontroller");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.post('/import', multer_1.default.single('file'), excelcontroller_1.getExcel);
router.get('/tasks', excelcontroller_1.filterTasks);
exports.default = router;
