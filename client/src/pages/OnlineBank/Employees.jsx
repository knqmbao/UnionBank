import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function Employees() {
  return (
    <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex justify-center items-center">
                    <h1>Welcome to employees</h1>
                </div>
            </div>
        </>
  )
}
