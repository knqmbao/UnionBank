import { useEffect, useState } from 'react'
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
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env
import io from 'socket.io-client';

export default function Sidebar() {
    const [carddetails, setCardDetails] = useState('')
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()
    const socket = io(VITE_HOST);

    useEffect(() => {
        fetchCredentials()
        fetchLang()
    }, [])

    const fetchLang = () => {
        socket.on('receive_message', (data) => {
            alert(data.message)
        })
    }

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')
            const { userId, role } = JSON.parse(credentials)
            setUserRole(role)

            const res = await axios.get(`${VITE_HOST}/api/useraccount/${userId}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            if (res?.data?.success) {
                setCardDetails(res?.data?.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const maskAccountNumber = (accountNumber) => {
        if (accountNumber.length !== 9) return accountNumber;
        return '******' + accountNumber.slice(-3);
    };

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.reload()
    }

    const handleSend = () => {
        socket.emit('send_message', { message: 'Hello World' })
    }

    return (
        <>
            <div className="sm:w-[none] md:w-[none] lg:w-[20%] h-screen px-[.1rem] sm:px-[.3rem] md:px-[.5rem] lg:px-[1rem] py-[1rem] bg-[#ffffff] border-r border-gray-900/10 overflow-auto">
                {
                    carddetails && (
                        <div className="rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] bg-[#111111] w-full min-h-[8rem] flex justify-center items-start flex-col px-[1rem] gap-[.5rem]">
                            <div className="w-full flex justify-start items-center gap-[.5rem]">
                                <div className="lex flex-col justify-center items-start">
                                    <h1 className='text-white'>REGULAR SAVINGS</h1>
                                    <button onClick={handleSend} className='text-white'>Testing</button>
                                    <h1 className='text-white'>{maskAccountNumber(carddetails?.accountno)}</h1>
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center">
                                <h1 className='text-white text-[.9rem]'>Balance</h1>
                                <h1 className='text-white text-[.9rem]'>PHP {carddetails?.balance}</h1>
                            </div>
                        </div>
                    )
                }

                <div className="w-full flex flex-col justify-between items-start pb-[6rem]">
                    <div className="w-full flex flex-col">
                        <div className="hnavs w-full py-[1rem] flex flex-col gap-[.2rem] justify-start items-start">
                            <NavLink to='/' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <GridViewIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Dashboard
                                </h1>
                            </NavLink>
                            {
                                (userRole === 'user' || userRole === 'developer') && (
                                    <>
                                        <NavLink to='/statement' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <ReceiptLongOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                View Statement
                                            </h1>
                                        </NavLink>
                                        <NavLink to='/transfer' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <MoveDownOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Make a Transfer
                                            </h1>
                                        </NavLink>
                                    </>
                                )
                            }

                            {
                                (userRole === 'it' || userRole === 'admin') && (
                                    <NavLink to='/developers' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <CodeOutlinedIcon />
                                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                            Developers
                                        </h1>
                                    </NavLink>
                                )
                            }
                            {
                                (userRole === 'hr' || userRole === 'admin') && (
                                    <NavLink to='/employees' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <SupervisorAccountOutlinedIcon />
                                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                            Employees
                                        </h1>
                                    </NavLink>
                                )
                            }
                            {
                                (userRole === 'rb' || userRole === 'admin') && (
                                    <>
                                        <NavLink to='/ledger' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <SyncAltOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Ledger
                                            </h1>
                                        </NavLink>
                                        <NavLink to='/customers' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <AccessibilityOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Manage Customers
                                            </h1>
                                        </NavLink>
                                    </>
                                )
                            }
                        </div>
                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#9CA3AF] text-[.3rem] sm:text-[.5rem] md:text-[.7rem] lg:text-[.9rem]'>Settings</h1>
                        <div className="hnavs w-full py-[1rem] flex flex-col justify-start items-start gap-[.2rem]">
                            <NavLink to='/profile' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <Person2OutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Profile
                                </h1>
                            </NavLink>
                            {
                                (userRole === 'it' || userRole === 'admin') && (
                                    <>
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
                                    </>
                                )
                            }
                            {
                                (userRole === 'developer' || userRole === 'admin') && (
                                    <NavLink to='/apikeys' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <HttpOutlinedIcon />
                                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                            API Keys
                                        </h1>
                                    </NavLink>
                                )
                            }
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
