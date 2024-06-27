import React from 'react'
import Logo from '../assets/LogoUB.png'
import { Link } from 'react-router-dom'

export default function Header__Home() {
    return (
        <>
            <div className="fixed w-full h-[8%] flex justify-between items-center px-[1rem]">
                <div className="w-[12rem] h-full">
                    <img src={Logo} alt="Logo" className='w-full h-full object-contain' />
                </div>
                <div className="h-full flex justify-center items-center gap-[3rem]">
                    <Link to={`/unionbank`} className='text-black font-[500] text-[.9rem]'>
                        Home
                    </Link>
                    <Link to={`/unionbank`} className='text-black font-[500] text-[.9rem]'>
                        Developer
                    </Link>
                    <Link to={`/unionbank`} className='text-black font-[500] text-[.9rem]'>
                        About Us
                    </Link>
                    <Link to={`/unionbank`} className='text-black font-[500] text-[.9rem]'>
                        Contact Us
                    </Link>
                    <Link to={`/login`} className='text-white font-[500] text-[.9rem] px-[1.5rem] py-[.4rem] rounded-md bg-black hover:bg-[#333333] duration-300 ease'>
                        Login
                    </Link>
                </div>
            </div>
        </>
    )
}
