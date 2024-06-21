import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <h1 className='font-[600] text-[2rem]'>
                Welcome to UnionBank
            </h1>
            <Link to='/login'>
                Login
            </Link>
        </div>
    )
}
