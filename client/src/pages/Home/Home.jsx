import React from 'react'
import { Link } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import test from '../../assets/Test.png'

export default function Home() {
    return (
        <div className='w-full h-screen flex justify-start items-center flex-col'>
            <Header__Home />
            {/* <div className="w-full h-full p-[5rem]">
                <img src={test} alt="asd" className='w-full h-full object-cover' />
            </div> */}
            <div className="w-full h-full flex justify-center items-center gap-[7rem]">
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className='text-[2rem] font-bold'>Department</h1>
                    <h1>ADMIN</h1>
                    <h1>HUMAN RESOURCE</h1>
                    <h1>IT DEPARTMENT</h1>
                    <h1>RETAIL BANKING</h1>
                    <h1>DEVELOPER</h1>
                    <h1>USER</h1>
                    <h1>USER</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className='text-[2rem] font-bold'>Email</h1>
                    <h1>admin@gmail.com</h1>
                    <h1>hr@gmail.com</h1>
                    <h1>it@gmail.com</h1>
                    <h1>rb@gmail.com</h1>
                    <h1>developer@gmail.com</h1>
                    <h1>user@gmail.com</h1>
                    <h1>yourparengmarc</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className='text-[2rem] font-bold'>Password</h1>
                    <h1>admin</h1>
                    <h1>hr</h1>
                    <h1>it</h1>
                    <h1>rb</h1>
                    <h1>developer</h1>
                    <h1>user</h1>
                    <h1>!SecuredPassword123</h1>
                </div>
            </div>
            <marquee width="60%" direction="right" behavior="alternate" height="100px">
                <h1 className='text-[2rem] font-bold px-[3rem]' >
                    Ledger for developer side, need adjustments
                </h1>
            </marquee>
        </div>
    )
}
