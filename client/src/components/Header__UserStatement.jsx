import React from 'react'

export default function Header__UserStatement() {
    return (
        <div className="w-full h-[15%]  flex justify-between items-center px-[1rem]">
            <div className="flex flex-col">
                <h1 className='text-black text-[1.5rem] font-[600]'>Welcome back! (USER)</h1>
                <h1 className='text-[#9b9ba4] text-[.9rem] font-[500]'>
                    Here's a list of your transactions!
                </h1>
            </div>
        </div>
    )
}
