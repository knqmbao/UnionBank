import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import SignUp from './pages/Home/SignUp'
import Dashboard from './pages/OnlineBank/Dashboard'

const Routes = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/unionbank', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> }
])

export default Routes