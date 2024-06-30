import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import { NavLink, useNavigate } from 'react-router-dom';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

export default function Sidebar() {

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <>
            <div className="sm:w-[none] md:w-[none] lg:w-[20%] h-screen px-[.1rem] sm:px-[.3rem] md:px-[.5rem] lg:px-[1rem] py-[1rem] bg-[#ffffff] border-r border-gray-900/10 overflow-auto">
                <div className="w-full h-[8%] flex justify-center sm:justify-center md:justify-center lg:justify-between items-center scale-[.7] sm:scale-[.7] md:scale-[.9] lg:scale-[1] py-[1rem]">
                    <h1 className='hidden sm:hidden md:hidden lg:block text-[.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]'>Solana</h1>
                    <MenuIcon style={{ cursor: 'pointer', fontSize: '2rem' }} />
                </div>
                <div className="w-full flex flex-col justify-between items-start pb-[6rem]">
                    <div className="w-full flex flex-col">
                        <div className="hnavs w-full py-[1rem] flex flex-col gap-[.2rem] justify-start items-start">
                            <NavLink to='/' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <GridViewIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Dashboard
                                </h1>
                            </NavLink>
                            <NavLink to='/transactions' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <ReceiptLongOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Transactions
                                </h1>
                            </NavLink>
                            <NavLink to='/transfer' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <MoveDownOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Make a Transfer
                                </h1>
                            </NavLink>
                            <NavLink to='/developers' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <CodeOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Developers
                                </h1>
                            </NavLink>
                            <NavLink to='/employees' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <SupervisorAccountOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Employees
                                </h1>
                            </NavLink>
                            <NavLink to='/customers' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <AccessibilityOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Customers
                                </h1>
                            </NavLink>
                            <NavLink to='/deposit' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <AddCardOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Deposit
                                </h1>
                            </NavLink>
                            <NavLink to='/withdrawal' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <HourglassEmptyOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Withdrawal
                                </h1>
                            </NavLink>
                        </div>
                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#9CA3AF] text-[.3rem] sm:text-[.5rem] md:text-[.7rem] lg:text-[.9rem]'>Settings</h1>
                        <div className="hnavs w-full py-[1rem] flex flex-col justify-start items-start gap-[.2rem]">
                            <NavLink to='/account' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <Person2OutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Account
                                </h1>
                            </NavLink>
                            <NavLink to='/auditlog' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <BookOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Audit Log
                                </h1>
                            </NavLink>
                            <NavLink to='/security' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <GppGoodOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Security
                                </h1>
                            </NavLink>
                            <NavLink to='/apikeys' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <HttpOutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    API Keys
                                </h1>
                            </NavLink>
                        </div>
                    </div>
                    <div onClick={handleLogout} className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1] cursor-pointer hover:bg-[#d4d4d4] duration-300 ease">
                        <ExitToAppOutlinedIcon />
                        <button className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
