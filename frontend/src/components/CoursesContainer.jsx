import { useAllCoursesContext } from '../pages/AllCourses'
import { StyledWrapper } from '../assets/wrappers/CoursesContainer'
import Course from './Course'

const CoursesContainer = () => {
  const { data } = useAllCoursesContext()
  const { courses } = data
  // IF THERE ARE NOT COURSES TO DISPLAY
  if (courses.length === 0) {
    return (
      <StyledWrapper>
        <h2>No courses to display...</h2>
      </StyledWrapper>
    )
  }

  return (
    <StyledWrapper>
      <div className='courses'>
        {courses.map((course) => {
          return <Course key={course._id} {...course} isLink showDueDate />
        })}
      </div>
    </StyledWrapper>
  )
}

export default CoursesContainer
