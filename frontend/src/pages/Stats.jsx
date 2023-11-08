import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { StyledWrapper } from '../assets/wrappers/Stats'

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/user/course-stats')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Stats = () => {
  // THIS COMPONENT ACTS AS A ADMIN PAGE
  const {
    data: { totalCourses, totalUsers, userCourses },
  } = useLoaderData()

  return (
    <StyledWrapper>
      <p>
        <span className='stat-key'>Total number of user&apos;s course</span>
        <span className='stat-key-value'>{userCourses}</span>
      </p>
      <p>
        <span className='stat-key'>Total number of users</span>
        <span className='stat-key-value'>{totalUsers}</span>
      </p>
      <p>
        <span className='stat-key'>Total number of course&apos;s</span>
        <span className='stat-key-value'>{totalCourses}</span>
      </p>
    </StyledWrapper>
  )
}
export default Stats
