/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify'
import { CoursesContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

const allCoursesContext = createContext()

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
export const loader = async ({ request }) => {
  // HERE IM ACCESSING ALL THE QUERY PARAMETERS
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  try {
    const { data } = await customFetch.get('/courses', { params })
    return {
      data,
      params,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllCourses = () => {
  // DATA RETURNED FROM THE LOADER CAN BE ACCESSED WITH USE LOADER DATA HOOK
  const { data, params } = useLoaderData()

  return (
    <allCoursesContext.Provider value={{ data, params }}>
      <SearchContainer />
      <CoursesContainer />
    </allCoursesContext.Provider>
  )
}

// TO BASICALLY HAVE ACCESS TO THE DATA IN SEARCH AND COURSES CONTAINER
export const useAllCoursesContext = () => useContext(allCoursesContext)

export default AllCourses
