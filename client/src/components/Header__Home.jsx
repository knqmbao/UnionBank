import React from 'react'
import Logo from '../assets/LogoUB.png'
import { NavLink } from 'react-router-dom'
import './css/Header_home.css'

export default function Header__Home() {
    return (
        <>
            <div className="fixed w-full h-[8%] flex justify-between items-center px-[25rem] z-[1]">
                <div className="w-[12rem] h-full">
                    <img src={Logo} alt="Logo" className='w-full h-full object-contain' />
                </div>
                <div className="hhome h-full flex justify-center items-center gap-[3rem]">
                    <NavLink to={`/unionbank`} className='text-[#74878e] font-[500] text-[.9rem]'>
                        Home
                    </NavLink>
                    <NavLink to={`/login`} className='text-white font-[500] text-[.9rem]'>
                        About Us
                    </NavLink>
                    <NavLink to={`/login`} className='text-white font-[500] text-[.9rem]'>
                        Contact Us
                    </NavLink>
                    <NavLink to={`/login`} className='text-white font-[500] text-[.9rem]'>
                        Login
                    </NavLink>
                </div>
            </div>
        </>
    )
}
