import Course from '../models/Course.js'
import { StatusCodes } from 'http-status-codes'

// GET ALL COURSES
const getAllCourses = async (req, res) => {
  const { search } = req.query

  const queryObject = {}

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: 'i' } },
      { instructor: { $regex: search, $options: 'i' } },
    ]
  }

  const courses = await Course.find(queryObject)

  res.status(StatusCodes.OK).json({ courses, totalCourses: courses.length })
}

// CREATE A COURSE
const createCourse = async (req, res) => {
  req.body.createdBy = req.user.userId
  const course = await Course.create(req.body)

  res.status(StatusCodes.CREATED).json({ course })
}

// GET SINGLE COURSE
const getCourse = async (req, res) => {
  const { id } = req.params
  const course = await Course.findById(id)

  res.status(StatusCodes.OK).json({ course })
}

// UPDATE COURSE LIKES
const updateCourseLikes = async (req, res) => {
  const { id } = req.params
  console.log(req.body)
  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({
    likes: updatedCourse.likes,
    msg: 'Thank you for liking the course',
  })
}

// UPDATE A COURSE
const updateTask = async (req, res) => {
  const { id } = req.params
  let message
  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (req.body.progress === 100) {
    message = 'Course marked as completed and course progress updated'
  } else {
    message = 'Course enrolled successfully'
  }

  res.status(StatusCodes.OK).json({
    msg: message,
    updatedCourse,
  })
}

// DELETE A COURSE
const deleteCourse = async (req, res) => {
  const { id } = req.params
  const courseRemoved = await Course.findByIdAndDelete(id)

  res
    .status(StatusCodes.OK)
    .json({ msg: `${courseRemoved.name} course deleted` })
}

export {
  getAllCourses,
  createCourse,
  getCourse,
  updateTask,
  deleteCourse,
  updateCourseLikes,
}
