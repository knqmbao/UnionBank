import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function AccountSettings() {
  return (
    <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex justify-center items-center">
                    <h1>Welcome to account settings</h1>
                </div>
            </div>
        </>
  )
}
