import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import SignUp from './pages/Home/SignUp'
import Dashboard from './pages/OnlineBank/Dashboard'
import Profile from './pages/OnlineBank/Profile'
import Security from './pages/OnlineBank/IT/Security'
import Transfer from './pages/OnlineBank/Transfer'
import APIKeys from './pages/OnlineBank/IT/APIKeys'
import AuditLog from './pages/OnlineBank/IT/AuditLog'
import Developers from './pages/OnlineBank/IT/Developers'
import Employees from './pages/OnlineBank/HR/Employees'
import Statement from './pages/OnlineBank/Statement'
import Customers from './pages/OnlineBank/RB/Customers'
import AddCustomer from './pages/OnlineBank/RB/AddCustomer'
import OpenAccount from './pages/OnlineBank/RB/OpenAccount'
import ManageEmployees from './pages/OnlineBank/HR/ManageEmployees'
import UpdateProfile from './pages/OnlineBank/UpdateProfile'
import CardDetails from './pages/OnlineBank/CardDetails'
import Deposit from './pages/OnlineBank/RB/Deposit'
import Withdrawal from './pages/OnlineBank/RB/Withdrawal'
import Ledger from './pages/OnlineBank/RB/Ledger'
import Accounts from './pages/OnlineBank/RB/Accounts'
import UserStatement from './pages/Home/UserStatement'
import Error404 from './pages/Errors/Error404'

const Routes = createBrowserRouter([
  { path: '*', element: <Error404 /> },
  { path: '/', element: <Dashboard /> },
  { path: '/unionbank', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/profile', element: <Profile /> },
  { path: '/profile/updateprofile', element: <UpdateProfile /> },
  { path: '/security', element: <Security /> },
  { path: '/statement', element: <Statement /> },
  { path: '/transfer', element: <Transfer /> },
  { path: '/carddetails', element: <CardDetails /> },
  { path: '/unionbank/myaccount', element: <UserStatement /> },

  // HR DEPARTMENT
  { path: '/employees', element: <Employees /> },
  { path: '/employees/:userId', element: <ManageEmployees /> },
  { path: '/employees/manageemployee', element: <ManageEmployees /> },

  //RB DEPARTMENT
  { path: '/customers', element: <Customers /> },
  { path: '/ledger', element: <Accounts /> },
  { path: '/ledger/:accountid', element: <Ledger /> },
  { path: '/customers/addcustomer', element: <AddCustomer /> },
  { path: '/customers/addcustomer/openaccount', element: <OpenAccount /> },
  { path: '/ledger/deposit/:accountid', element: <Deposit /> },
  { path: '/ledger/withdrawal/:accountid', element: <Withdrawal /> },

  // IT DEPARTMENT
  { path: '/developers', element: <Developers /> },
  { path: '/apikeys', element: <APIKeys /> },
  { path: '/auditlog', element: <AuditLog /> }
])

export default Routes