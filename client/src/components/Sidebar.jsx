import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <>
            <div className="w-[20%] h-screen p-[1rem] bg-[#ffffff] border-r-[.1px] border-[#aaaaaa]">
                <div className="w-full h-[8%] flex justify-between items-center py-[1rem]">
                    <h1 className='text-[1.5rem]'>Solana</h1>
                    <MenuIcon style={{ cursor: 'pointer', fontSize: '2rem' }} />
                </div>
                <div className="w-full h-[92%] flex flex-col justify-between items-start">
                    <div className="w-full flex flex-col">
                        <div className="w-full py-[1rem] flex flex-col gap-[.2rem] justify-start items-start">
                            <NavLink to='/' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Dashboard
                                </h1>
                            </NavLink>
                            <NavLink to='/transactions' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Transactions
                                </h1>
                            </NavLink>
                            <NavLink to='/transfer' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Make a Transfer
                                </h1>
                            </NavLink>
                            <NavLink to='/employees' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Employees
                                </h1>
                            </NavLink>
                        </div>
                        <h1 className='text-[#9CA3AF] text-[.9rem]'>Settings</h1>
                        <div className="w-full py-[1rem] flex flex-col justify-start items-start gap-[.2rem]">
                            <NavLink to='/account' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Account Settings
                                </h1>
                            </NavLink>
                            <NavLink to='/auditlog' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Audit Log
                                </h1>
                            </NavLink>
                            <NavLink to='/backuprestore' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Backup Restore
                                </h1>
                            </NavLink>
                            <NavLink to='/security' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                                <GridViewIcon />
                                <h1 className='text-[#3D4751] text-[.9rem]'>
                                    Security
                                </h1>
                            </NavLink>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md">
                        <GridViewIcon />
                        <button className='text-[#3D4751] text-[.9rem]'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
