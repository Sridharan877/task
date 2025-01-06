"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please provide all fields" });
        return;
    }
    const existingUser = await (0, userModel_1.findUserByEmail)(email);
    if (existingUser) {
        res.status(400).json({ message: "user already exists" });
        return;
    }
    await (0, userModel_1.createUser)(name, email, password);
    res.status(201).json({ message: "User created" });
    return;
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    try {
        const user = await (0, userModel_1.findUserByEmail)(email);
        // console.log(" user ---> ", user)
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, eamil: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        // console.log(" token ---> ", token)
        res.status(200).json({ message: "login successful", token });
        return;
    }
    catch (error) {
        console.log(" login error : ", error);
        res.status(500).json({ message: " login error : ", error });
        return;
    }
};
exports.login = login;
