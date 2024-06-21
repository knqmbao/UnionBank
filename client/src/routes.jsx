import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import SignUp from './pages/Home/SignUp'

const Routes = createBrowserRouter([
  { path: '/', element: <Home  /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> }
])

export default Routes