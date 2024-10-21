import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createLesson, deleteLesson, findLessonById, getAllLessons, saveLesson } from '../service/lession.service';

// Get the list of lessons
export const lessonList = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const lessons = await getAllLessons()
  res.json(lessons);
});

export const lessonCreateGet = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.json({ message: 'Ready to create a new lesson' });
  });

export const lessonCreatePost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, progress, type, content, description, time, section_id } = req.body;

  const lesson = createLesson({
    name,
    progress,
    type,
    content,
    description,
    time,
    section_id,
  });
  res.status(201).json(lesson);
});

export const lessonDetails = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const lesson = await findLessonById(parseInt(req.params.id))

  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found' });
    return;
  }

  res.json(lesson);
});

export const lessonUpdateGet = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lesson = await findLessonById(parseInt(req.params.id));

    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    // You can return an HTML form here if you're rendering views
    // For now, let's return the lesson data as JSON
    res.json(lesson);
  });

// Update an existing lesson
export const lessonUpdatePost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lesson = await findLessonById(parseInt(req.params.id))

  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found' });
    return;
  }

  const { name, progress, type, content, description, time } = req.body;

  lesson.name = name;
  lesson.progress = progress;
  lesson.type = type;
  lesson.content = content;
  lesson.description = description;
  lesson.time = time;

  await saveLesson(lesson)
  res.json(lesson);
});
