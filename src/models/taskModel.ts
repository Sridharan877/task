import pool from '../config/database';


export interface Task {
    task_name: string;
    status: 'pending' | 'completed';
}

export const getFilteredTasks = async (status?: string) => {
    try {
        let query = 'SELECT * FROM tasks';
        const params: any[] = [];

        if (status) {
            query += 'WHERE status = ?';
            params.push(status)
        }
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.log(" error on filter : ", error)
        throw new Error('Error fetching the tasks')
    }
}