import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddCourse,
  Stats,
  AllCourses,
  CourseDetailsPage,
} from './pages'

// // ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as addCourseAction } from './pages/AddCourse'

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as allCourseLoader } from './pages/AllCourses'
import { loader as courseDetailsLoader } from './pages/CourseDetailsPage'
import { loader as statsLoader } from './pages/Stats'
import EnrolledCourses, {
  loader as enrolledCoursesLoader,
} from './pages/EnrolledCourses'

// LATEST VERSION OF REACT ROUTER
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddCourse />,
            action: addCourseAction,
          },
          {
            path: 'course-stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'all-courses',
            element: <AllCourses />,
            loader: allCourseLoader,
          },
          {
            path: 'all-courses/:id',
            element: <CourseDetailsPage />,
            loader: courseDetailsLoader,
          },
          {
            path: 'enrolled-courses',
            element: <EnrolledCourses />,
            loader: enrolledCoursesLoader,
          },
        ],
      },
    ],
  },
])

// ENTRY POINT
const App = () => {
  return <RouterProvider router={router} />
}
export default App
