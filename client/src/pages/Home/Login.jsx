import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoUB from '../../assets/LogoUB.png'
import LoginBG from '../../assets/LoginBG.png'
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            const credentials = localStorage.getItem('credentials')
            if (credentials) return navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleLogin = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`${VITE_HOST}/api/loginuser`, values, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            if (res.data.success) {
                const token = res.data.token
                const userId = res.data.userId
                const role = res.data.role

                localStorage.setItem('credentials', JSON.stringify({ token, userId, role }))
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            fetchCredentials()
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-start items-center">
                <div className="w-full h-full flex justify-start items-center">
                    <div className="w-[70%] h-full flex justify-start items-center">
                        <img src={LoginBG} alt="BG" className='w-full h-full object-cover' />
                    </div>
                    <div className="w-[30%] h-full flex justify-center items-center">
                        <form
                            onSubmit={handleLogin}
                            className='w-full h-full flex flex-col justify-center items-center gap-[1rem] px-[4rem]'>
                            <div className="w-full h-[5rem] flex justify-start items-center">
                                <img src={LogoUB} alt="BG" className='w-full h-full object-contain' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1>Email</h1>
                                <input onChange={handleOnChange} type="text" required name='email' inputMode='numeric' className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your email...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1>Password</h1>
                                <input onChange={handleOnChange} type="password" required name='password' className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your password...' />
                            </div>
                            <button type='submit' className='w-full py-[.6rem] rounded-lg text-[#7b7b7b] hover:bg-[#111111] hover:text-white duration-300 ease bg-[#dcdcdc] shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                                Login
                            </button>
                            <div className="w-full flex flex-col justify-start items-start">
                                <p className='text-[.8rem]'>
                                    Don't have an account? <span className='cursor-pointer text-black text-decoration-line: underline' onClick={handleSignUp}>Sign Up.</span>
                                </p>
                                <p className='cursor-pointer text-[.8rem] text-black text-decoration-line: underline'>
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
