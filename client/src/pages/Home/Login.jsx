import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import LogoUB from '../../assets/LogoUB.png'
import LoginBG from '../../assets/LoginBG.png'

export default function Login() {
    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleLogin = () => {
        navigate('/')
    }
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-start items-center">
                {/* <Header__Home /> */}
                <div className="w-full h-full flex justify-start items-center">
                    <div className="w-[70%] h-full flex justify-start items-center">
                        <img src={LoginBG} alt="BG" className='w-full h-full object-cover' />
                    </div>
                    <div className="w-[30%] h-full flex justify-center items-center">
                        <form className='w-full h-full flex flex-col justify-center items-center gap-[1rem] px-[4rem]'>
                            <div className="w-full h-[5rem] flex justify-start items-center">
                                <img src={LogoUB} alt="BG" className='w-full h-full object-contain' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1>Mobile No.</h1>
                                <input type="text" inputMode='numeric' className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your mobile number...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1>Password</h1>
                                <input type="password" className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your password...' />
                            </div>
                            <button onClick={handleLogin} className='w-full py-[.6rem] rounded-lg text-[#7b7b7b] hover:bg-[#111111] hover:text-white duration-300 ease bg-[#dcdcdc] shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                                Login
                            </button>
                            <div className="w-full flex flex-col justify-start items-start">
                                <p className='text-[.8rem]'>
                                    Don't have an account? <span className='cursor-pointer text-yellow-500' onClick={handleSignUp}>Sign Up.</span>
                                </p>
                                <p className='cursor-pointer text-[.8rem]'>
                                    Forgot password?
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
