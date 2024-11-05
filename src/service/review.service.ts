﻿import { AppDataSource } from "../repos/db";
import { Review } from "../entity/Review";

const reviewRepository = AppDataSource.getRepository(Review);

export const getReviewByCourseId = (courseId: number) => {
  return reviewRepository.find({
    where: { course_id: courseId },
    relations: ["user", "comments"],
  });
};

export const getReviewsWithDetails = async () => {
  return await reviewRepository.find({
    relations: {
      user: true,     
      course: true,    
      comments: {
        user: true,    
      },
    },
    select: {
      id: true,
      rating: true,
      created_at: true,
      user: {
        name: true,
      },
      course: {
        name: true,
      },
      comments: {
        id: true,
        comment_text: true,
        created_at: true,
        user: {
          name: true,
        },
      },
    },
  });
};

export const createReview = (
  user_id: number,
  rating: number,
  course_id: number
) => {
  return reviewRepository.save({
    user_id,
    rating,
    course_id,
  });
};
