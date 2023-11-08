import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { Course } from '../components'
import { StyledWrapper } from '../assets/wrappers/EnrolledCourses'
// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
// GET ENROLLED COURSES OF THE USER
export const loader = async () => {
  try {
    const { data } = await customFetch.get(`/user/enrolled-courses`)
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const EnrolledCourses = () => {
  // DATA RETURNED FROM THE LOADER CAN BE ACCESSED WITH THE USE LOADER DATA
  const {
    data: { userCourses, count },
  } = useLoaderData()

  return (
    <StyledWrapper>
      <h3 className='enrolled-course-title'>
        total number of enrolled courses{' '}
        <span className='course-count'>{count}</span>{' '}
      </h3>
      {userCourses.map((course) => {
        return (
          <StyledWrapper key={course._id}>
            {/* CODE - REUSABILITY */}
            <Course
              {...course}
              showStatus
              markCourse
              showProgress
              showDueDate
            />
          </StyledWrapper>
        )
      })}
    </StyledWrapper>
  )
}
export default EnrolledCourses
