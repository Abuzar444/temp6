import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import CourseDetails from '../components/CourseDetails'

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
// GET'S SINGLE COURSE DETAILS
export const loader = async (request) => {
  const {
    params: { id },
  } = request
  try {
    const { data } = await customFetch.get(`/courses/${id}`)
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const CourseDetailsPage = () => {
  const {
    data: { course },
  } = useLoaderData()

  return <CourseDetails {...course} />
}
export default CourseDetailsPage
