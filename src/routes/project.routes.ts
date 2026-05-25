import { Router } from 'express'; // импорт компонента из библиотеки express, для создания и структурирования маршрутов
import { getMyProject, createProject, deleteProject } from '../controllers/project.controller';
import { auth } from '../middlewares/auth.middleware'; 
export const projectRouter = Router();

projectRouter.get('/project', auth, getMyProject);
projectRouter.post('/project', auth, createProject);
projectRouter.delete('/project/:id', auth, deleteProject);


// сделали маршрутизацию, осталось подключить в основном файле app.js