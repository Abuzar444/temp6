import { Router } from 'express'
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateTask,
  updateCourseLikes,
} from '../controllers/courses.js'
import {
  validateCourseInput,
  validateIdParams,
} from '../middlewares/validationMiddleware.js'

const router = Router()
router.route('/').get(getAllCourses).post(validateCourseInput, createCourse)
router.route('/like-course/:id').patch(updateCourseLikes)
router
  .route('/:id')
  .get(validateIdParams, getCourse)
  .patch(updateTask)
  .delete(validateIdParams, deleteCourse)

export default router
