import { Response } from "express";
import  Project  from '../models/Project';
import { AuthRequest } from "../types/AuthRequest";
import { NotFound } from "../errors/NotFoundError";
import { Conflict } from "../errors/ConflictError";
import { Unauthorized } from "../errors/UnauthorizedError";

export const getMyProject = async (  // получение проектов текущего пользователя
  req: AuthRequest,
  res: Response
) => {
  const projects = await Project.find({  // поиск среди всех проектов, проекта с одинаковым значением поля owner
    owner: req.user!.userId 
  });
  res.json(projects); // в результате получаем массив из проектов текущего пользователя и отправляем его пользователю в формате json
}

export const createProject = async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.user) { // Проверка пользователя
    throw new Unauthorized('Ошибка авторизации');
  }
  console.log(req);
  const { title, description } = req.body;   // присвоение полученных данных
  if (!title || !description) {
    throw new NotFound('Ошибка в названии илиописании проекта');
  }
  console.log(req.user!.userId);
  const userId = req.user.userId;
  const project = await Project.create({ // создание в БД нового проекта, с названием, описанием и Id создателя
    title,
    description,
    owner: userId,
  });
  res.status(201).json(project); // Отправляем данные обратно
}

export const deleteProject = async (
  req: AuthRequest,
  res: Response
) => {
  const project = await Project.findById(req.params.id)
  console.log(req.params.id)
  // console.log(project)
  if (!project) {
    throw new NotFound('Проект не найден или удален');
  }
  if (project.owner.toString() !== req.user!.userId) {
    throw new Conflict('У вас нет доступа')
  }
  console.log(project.owner.toString())
  console.log(req.user!.userId)

  await project.deleteOne();

  res.json({ message: 'Project deleted' });
}