import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'

const Routes = createBrowserRouter([
  { path: '/', element: <Home  /> },
  { path: '/login', element: <Login /> }
])

export default Routes