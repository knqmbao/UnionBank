import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Header__Dashboard from '../../components/Header__dashboard'
import SavingsIcon from '@mui/icons-material/Savings';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            const credentials = localStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-auto">
                    <Header__Dashboard title={`Dashboard`} />
                    <div className="w-full h-[95%] flex flex-col justify-start items-start gap-[1rem]">
                        <div className="w-full h-[5%]">
                            <h1 className='text-black font-[600] text-[1.2rem]'>Your Accounts</h1>
                        </div>
                        <div className="w-full flex justify-start items-start gap-[1rem] flex-wrap">
                            <Link
                                to={`/statement`}
                                className="cursor-pointer hover:scale-[.98] duration-300 ease w-[18rem] sm:w-[20rem] md:w-[22rem] lg:w-[24rem] h-[10rem] sm:h-[11re] md:h-[12rem] lg:h-[13rem] rounded-md shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.15)] flex flex-col justify-evenly bg-[#111111] items-start p-[1rem]">
                                <h1 className='text-white font-[500] text-[.9rem]'>Savings Account</h1>
                                <div className="w-full flex justify-start items-center gap-[1rem]">
                                    <SavingsIcon style={{ color: 'white', fontSize: '2rem' }} />
                                    <div className="flex flex-col justify-center items-start">
                                        <h1 className='text-white'>REGULAR SAVINGS</h1>
                                        <h1 className='text-white'>******1238</h1>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <h1 className='text-white'>Current Balance</h1>
                                    <h1 className='text-white'>PHP 15,993.04</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
