import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import SignUp from './pages/Home/SignUp'
import Dashboard from './pages/OnlineBank/Dashboard'
import AccountSettings from './pages/OnlineBank/AccountSettings'
import AuditLog from './pages/OnlineBank/AuditLog'
import BackupRestore from './pages/OnlineBank/BackupRestore'
import Employees from './pages/OnlineBank/Employees'
import Security from './pages/OnlineBank/Security'
import Transactions from './pages/OnlineBank/Transactions'
import Transfer from './pages/OnlineBank/Transfer'
import Developer from './pages/Home/Developer'

const Routes = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/unionbank', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/developer', element: <Developer /> },
  { path: '/account', element: <AccountSettings /> },
  { path: '/auditlog', element: <AuditLog /> },
  { path: '/backuprestore', element: <BackupRestore /> },
  { path: '/employees', element: <Employees /> },
  { path: '/security', element: <Security /> },
  { path: 'transactions', element: <Transactions /> },
  { path: '/transfer', element: <Transfer /> }
])

export default Routes