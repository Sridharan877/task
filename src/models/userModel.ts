import pool from '../config/database';
import bcrypt from 'bcrypt';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
}

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword])
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const [data] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = data as User[]
    console.log(" data : ", data)
    return user.length ? user[0] : null;
}