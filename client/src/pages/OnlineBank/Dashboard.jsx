import React from 'react'
import Header_OnlineBank from '../../components/Header_OnlineBank'

export default function Dashboard() {
    return (
        <>
            <div className="flex">
                <Header_OnlineBank />
                <div className="w-[80%] h-screen bg-black flex justify-center items-center">
                    <h1>Welcome to Dashboard</h1>

                </div>
            </div>

        </>
    )
}
