import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please provide all fields" });
        return;

    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        res.status(400).json({ message: "user already exists" })
        return;
    }

    await createUser(name, email, password);
    res.status(201).json({ message: "User created" });
    return;

}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;

    }

    try {
        const user = await findUserByEmail(email);

        // console.log(" user ---> ", user)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user.id, eamil: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        })

        // console.log(" token ---> ", token)
        res.status(200).json({ message: "login successful", token })
        return
    } catch (error) {
        console.log(" login error : ", error)
        res.status(500).json({ message: " login error : ", error });
        return
    }



}
