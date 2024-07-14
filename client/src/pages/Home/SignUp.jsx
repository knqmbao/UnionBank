"use client"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoUB from '../../assets/LogoUB.png'
import LoginBG from '../../assets/LoginBG.png'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function SignUp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        mobileno: '',
        password: ''
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const { toast } = useToast()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (credentials) return navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignUp = async (e) => {
        try {
            e.preventDefault()
            const { name, email, mobileno, password } = values
            const lowerCasedEmail = email.toLowerCase()
            if (password === confirmPassword) {
                const res = await axios.post(`${VITE_HOST}/api/createuser`, { name, email: lowerCasedEmail, mobileno, password }, {
                    headers: {
                        Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                    }
                })

                if (res.data.success) {
                    toast({ title: "Success!", description: res.data.message })
                    return
                }

                toast({
                    title: "Uh oh! Something went wrong.",
                    description: res.data.message
                });

            } else {
                alert('Password do not match')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setValues((prev) => ({
                ...prev,
                name: '',
                email: '',
                mobileno: '',
                password: ''
            }))
            setConfirmPassword('')
        }

    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleOnChangeConfirmPassword = (e) => {
        const { value } = e.target
        setConfirmPassword(value)
    }

    return (
        <>
            <Toaster />
            <div className="bg-[#121212] w-full h-screen flex flex-col justify-start items-center">
                <div className="w-full h-full flex justify-start items-center">
                    <div className="w-[70%] h-full flex justify-start items-center">
                        <img src={LoginBG} alt="BG" className='w-full h-full object-cover' />
                    </div>
                    <div className="w-[30%] h-full flex justify-center items-center">
                        <form
                            onSubmit={handleSignUp}
                            className='w-full h-full flex flex-col justify-center items-center gap-[1rem] px-[4rem]'>
                            <div className="w-full h-[5rem] flex justify-start items-center">
                                <img src={LogoUB} alt="BG" className='w-full h-full object-contain' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1 className='text-white'>Full Name</h1>
                                <input autoFocus onChange={handleOnChange} value={values?.name} name='name' type="text" required className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your full name...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1 className='text-white'>Email</h1>
                                <input onChange={handleOnChange} value={values?.email} name='email' type="email" required className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your email...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1 className='text-white'>Mobile No.</h1>
                                <input onChange={handleOnChange} value={values?.mobileno} name='mobileno' type="text" required inputMode='numeric' className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your mobile number...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1 className='text-white'>Password</h1>
                                <input onChange={handleOnChange} value={values?.password} name='password' type="password" required className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your password...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1 className='text-white'>Confirm Password</h1>
                                <input onChange={handleOnChangeConfirmPassword} value={confirmPassword} type="password" required className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Confirm your password' />
                            </div>
                            <button className={`w-full py-[.6rem] rounded-lg ${values?.name && values?.email && values?.mobileno && values?.password && confirmPassword ? 'text-[#ffffff]' : 'text-[#7b7b7b]'} hover:bg-[#007eff] hover:text-white duration-300 ease ${values?.name && values?.email && values?.mobileno && values?.password && confirmPassword ? 'bg-[#007eff]' : 'bg-[#dcdcdc]'} shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)]`}>
                                Sign Up
                            </button>
                            <div className="w-full flex flex-col justify-start items-start">
                                <p className='text-[.8rem] text-white'>
                                    Already have an account? <span className='cursor-pointer text-white text-decoration-line: underline' onClick={handleLogin}>Sign In.</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

function ToastWithTitle() {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
            }}
        >
            Show Toast
        </Button>
    )
}