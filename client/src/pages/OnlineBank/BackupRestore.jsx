import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function BackupRestore() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-[80%] h-screen flex justify-center items-center">
          <h1>Welcome to backup and restore</h1>
        </div>
      </div>
    </>
  )
}
