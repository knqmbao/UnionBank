import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function Dashboard() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex justify-center items-center">
                    <h1>Welcome to Dashboard</h1>

                </div>
            </div>

        </>
    )
}
