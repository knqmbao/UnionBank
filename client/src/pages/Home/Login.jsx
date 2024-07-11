import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoUB from '../../assets/LogoUB.png'
import LoginBG from '../../assets/LoginBG.png'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import axios from 'axios'
import { InputOTPForm } from '@/components/OTP'
import Loading from '@/components/Loading'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [verify, setVerify] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            setVerify(false)
            const credentials = sessionStorage.getItem('credentials')
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
            setLoading(true)
            const res = await axios.post(`${VITE_HOST}/api/loginuser`, values, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            if (res.data.success) {
                setVerify(true)
                toast({ title: "2-Factor-Authentication", description: 'A one-time-password has been sent to your email!' })
                // const token = res.data.token
                // const userId = res.data.userId
                // const role = res.data.role

                // sessionStorage.setItem('credentials', JSON.stringify({ token, userId, role }))
            } else {
                toast({ title: "Uh oh! Something went wrong.", description: res?.data?.message })
                return
            }
        } catch (error) {
            console.error(error)
        } finally {
            // fetchCredentials()
            setLoading(false)
        }
    }

    const handleLoadOtp = (e) => {
        setLoading(e)
    }

    const handleCancelOtp = (e) => {
        setVerify(e)
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
            <div className="bg-[#121212] w-full h-screen flex flex-col justify-start items-center">
                <Toaster />
                <div className="w-full h-full flex justify-start items-center">
                    <div className="w-[70%] h-full flex justify-start items-center">
                        <img src={LoginBG} alt="BG" className='w-full h-full object-cover' />
                    </div>
                    <div className="relative w-[30%] h-full flex justify-center items-center">
                        {isLoading && <Loading />}
                        {
                            verify ?
                                <InputOTPForm isLoad={handleLoadOtp} isVerify={handleCancelOtp} /> :
                                (
                                    <form
                                        onSubmit={handleLogin}
                                        className='w-full h-full flex flex-col justify-center items-center gap-[1rem] px-[4rem]'>
                                        <div className="w-full h-[5rem] flex justify-start items-center">
                                            <img src={LogoUB} alt="BG" className='w-full h-full object-contain' />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <h1 className='text-white'>Email</h1>
                                            <input onChange={handleOnChange} type="email" required name='email' className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your email...' />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <h1 className='text-white'>Password</h1>
                                            <input onChange={handleOnChange} type="password" required name='password' className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your password...' />
                                        </div>
                                        <button type='submit' className={`w-full py-[.6rem] rounded-lg  ${values?.email && values?.password ? 'text-[#ffffff]' : 'text-[#7b7b7b]'} hover:bg-[#007eff] hover:text-white duration-300 ease ${values?.email && values?.password ? 'bg-[#007eff]' : 'bg-[#dcdcdc]'} shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)]`}>
                                            Login
                                        </button>
                                        <div className="w-full flex flex-col justify-start items-start">
                                            <p className='text-[.8rem] text-white'>
                                                Don't have an account? <span className='cursor-pointer text-white text-decoration-line: underline' onClick={handleSignUp}>Sign Up.</span>
                                            </p>
                                            <p className='cursor-pointer text-[.8rem] text-decoration-line: underline text-white'>
                                                Forgot password?
                                            </p>
                                        </div>
                                    </form>
                                )
                        }


                    </div>
                </div>
            </div>
        </>
    )
}
