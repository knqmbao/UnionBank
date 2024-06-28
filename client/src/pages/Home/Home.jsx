import React from 'react'
import { Link } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import test from '../../assets/Test.png'

export default function Home() {
    return (
        <div className='w-full h-screen flex justify-start items-center flex-col'>
            <Header__Home />
            <div className="w-full h-full p-[5rem]">
                <img src={test} alt="asd" className='w-full h-full object-cover' />
            </div>
            {/* <h1 className='font-[600] text-[2rem]'>
                Welcome to UnionBank
            </h1>
            <Link to='/login'>
                Login
            </Link> */}
        </div>
    )
}
