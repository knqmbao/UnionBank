import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import { Link } from 'react-router-dom';

export default function Header_OnlineBank() {
    return (
        <>
            <div className="w-[20%] h-screen p-[1rem] bg-[#ffffff]">
                <div className="w-full h-[8%] flex justify-between items-center py-[1rem]">
                    <h1 className='text-[1.5rem]'>Solana</h1>
                    <MenuIcon style={{ cursor: 'pointer', fontSize: '2rem' }} />
                </div>
                <div className="w-full h-[92%] flex flex-col justify-between items-start">
                    <div className="w-full flex flex-col gap-[1rem]">
                        <div className="w-full py-[1rem] flex flex-col justify-start items-start gap-[1.5rem] px-[2rem]">
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Dashboard
                                </Link>
                            </div>
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Transactions
                                </Link>
                            </div>
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Make a Transfer
                                </Link>
                            </div>
                        </div>
                        <h1 className='text-[#9CA3AF]'>Settings</h1>
                        <div className="w-full py-[1rem] flex flex-col justify-start items-start gap-[1.5rem] px-[2rem]">
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Account Settings
                                </Link>
                            </div>
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Audit Log
                                </Link>
                            </div>
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Backup Restore
                                </Link>
                            </div>
                            <div className="w-full flex justify-start items-center gap-[1rem]">
                                <GridViewIcon />
                                <Link to='/' className='text-[#3D4751]'>
                                    Security
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center gap-[1rem] px-[1rem]">
                        <GridViewIcon />
                        <button className='text-[#3D4751]'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
