import {signup , login } from '../controllers/authController';
import {Router} from 'express';
import {filterTasks,getExcel} from '../controllers/excelcontroller';
import upload from '../config/multer';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/import', upload.single('file'), getExcel);
router.get('/tasks', filterTasks)

export default router;