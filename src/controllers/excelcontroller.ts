import { Request, Response } from 'express';
import pool from '../config/database';
import xlsx from 'xlsx';
import { Task, getFilteredTasks } from '../models/taskModel';


export const getExcel = async (req: Request, res: Response): Promise<void> => {

    try {

        if (!req.file) {
            console.log(" no file")
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const sheet = xlsx.readFile(req.file.path);
        const sheet_name = sheet.SheetNames[0];
        console.log(" sheet name => ", sheet_name)
        const worksheet = sheet.Sheets[sheet_name]

        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(" data ----> ", data)

        const tasks: Task[] = data.slice(1).map((row: any): any => ({
            task_name: row[0],
            status: row[1],
        }));

        const insertData = tasks.map((task) => {
            return pool.execute('INSERT INTO tasks (task_name, status) VALUES (?, ?)', [task.task_name, task.status]);
        })

        await Promise.all(insertData)

        res.status(200).json({ message: 'Tasks imported successfully' })

    } catch (error) {
        console.log(" error on file : ", error)
        res.status(500).json({ message: 'Error processing file', error: error })
    }
}

export const filterTasks = async (req: Request, res: Response): Promise<void> => {
    try {

        const { status } = req.query;
        const tasks = await getFilteredTasks(status as string);

        res.status(200).json({ tasks })
        return;

    } catch (error) {
        console.log(" error on filter : ", error)
        res.status(500).json({ message: 'Error fetching the tasks', error: error })
        return;
    }
}