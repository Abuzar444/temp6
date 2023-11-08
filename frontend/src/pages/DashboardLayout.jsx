/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react'
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { StyledWrapper } from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const DashboardContext = createContext()

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
// GET INFORMATION ABOUT THE CURRENT USER, TO DISPLAY INSIDE LOGOUT CONTAINER
export const loader = async () => {
  try {
    const { data } = await customFetch('/user/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardLayout = () => {
  const { user } = useLoaderData()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const [showSidebar, setShowSidebar] = useState(false)

  // OPEN AND CLOSE SIDEBAR
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // LOG OUT USER
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logging out...')
  }
  return (
    <DashboardContext.Provider
      value={{ user, showSidebar, toggleSidebar, logoutUser }}
    >
      <StyledWrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </StyledWrapper>
    </DashboardContext.Provider>
  )
}

// TO BASICALLY HAVE ACCESS TO THE DATA IN SMALL SIDEBAR , BIG SIDEBAR AND NAVBAR
export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
