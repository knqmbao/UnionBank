import React from 'react'
import Logo from '../assets/LogoUB.png'
import { Link } from 'react-router-dom'

export default function Header__Home() {
    return (
        <>
            <div className="fixed w-full h-[8%] flex justify-between items-center px-[7rem] sm:px-[10rem] md:px-[15rem] lg:px-[10rem] xl:px-[15rem] z-[1]">
                <div className="h-full flex justify-start items-center gap-[1rem]">
                    <div className="w-[12rem] h-full">
                        <img src={Logo} alt="Logo" className='w-full h-full object-contain' />
                    </div>
                    <Link to={`/unionbank`} className='text-[#7ba1bf] font-[500] text-[.9rem] hover:text-white duration-300 ease'>
                        Terms of Use
                    </Link>
                    <Link to={`/unionbank`} className='text-[#7ba1bf] font-[500] text-[.9rem] hover:text-white duration-300 ease'>
                        Privacy Policy
                    </Link>
                </div>

                <div className=" h-full flex justify-end items-center gap-[.7rem] sm:gap-[1rem] md:gap-[1.5rem] lg:gap-[.8rem]">
                    <Link to={`/signup`} className='text-white px-[1rem] py-[.6rem] bg-[#1daeef] rounded-xl font-[600] text-[.8rem] hover:bg-[#58caff]'>
                        Sign Up
                    </Link>
                    <Link to={`/login`} className='text-white px-[1rem] py-[.6rem] border-[1px] border-white rounded-xl font-[500] text-[.8rem]  hover:bg-[#ffffff] hover:text-black'>
                        Login
                    </Link>
                </div>
            </div>
        </>
    )
}
