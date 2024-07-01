import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import SignUp from './pages/Home/SignUp'
import Dashboard from './pages/OnlineBank/Dashboard'
import AccountSettings from './pages/OnlineBank/AccountSettings'
import Security from './pages/OnlineBank/Security'
import Transfer from './pages/OnlineBank/Transfer'
import APIKeys from './pages/OnlineBank/IT/APIKeys'
import AuditLog from './pages/OnlineBank/IT/AuditLog'
import Developers from './pages/OnlineBank/IT/Developers'
import Employees from './pages/OnlineBank/HR/Employees'
import Transactions from './pages/OnlineBank/Transactions'
import Customers from './pages/OnlineBank/RB/Customers'
import AddCustomer from './pages/OnlineBank/RB/AddCustomer'
import OpenAccount from './pages/OnlineBank/RB/OpenAccount'
import AddEmployees from './pages/OnlineBank/HR/AddEmployees'
import UpdateAccount from './pages/OnlineBank/UpdateAccount'
import AccountStatement from './pages/OnlineBank/AccountStatement'
import Deposit from './pages/OnlineBank/RB/Deposit'
import Withdrawal from './pages/OnlineBank/RB/Withdrawal'

const Routes = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/unionbank', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/account', element: <AccountSettings /> },
  { path: '/account/updateaccount', element: <UpdateAccount /> },
  { path: '/security', element: <Security /> },
  { path: '/transactions', element: <Transactions /> },
  { path: '/transfer', element: <Transfer /> },
  { path: '/statement', element: <AccountStatement /> },

  // HR DEPARTMENT
  { path: '/employees', element: <Employees /> },
  { path: '/employees/addemployee', element: <AddEmployees /> },

  //RB DEPARTMENT
  { path: '/customers', element: <Customers /> },
  { path: '/customers/addcustomer', element: <AddCustomer /> },
  { path: '/customers/addcustomer/openaccount', element: <OpenAccount /> },
  { path: '/deposit', element: <Deposit /> },
  { path: '/withdrawal', element: <Withdrawal /> },

  // IT DEPARTMENT
  { path: '/developers', element: <Developers /> },
  { path: '/apikeys', element: <APIKeys /> },
  { path: '/auditlog', element: <AuditLog /> }
])

export default Routes