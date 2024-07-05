import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header__Dashboard from '../../components/Header__dashboard'
import Toggle from '../../components/Toggle'
import axios from 'axios'

const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function UpdateAccount() {
    const [userRole, setUserRole] = useState('')
    const [values, setValues] = useState({
        name: '',
        email: '',
        mobileno: '',
        role: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')

            const { userId } = JSON.parse(credentials)
            const res = await axios.get(`${VITE_HOST}/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const name = res?.data?.data?.name
            const mobileno = res?.data?.data?.mobileno
            const email = res?.data?.data?.email
            const isRole = res?.data?.data?.role

            setValues((prev) => ({
                ...prev,
                name: name,
                email: email,
                mobileno: mobileno,
                role: isRole
            }))
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = sessionStorage.getItem('credentials')
        const { userId } = JSON.parse(credentials)
        const res = await axios.post(`${VITE_HOST}/api/updateuser/${userId}`, values, {
            headers: {
                Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
            }
        })

        if (res?.data?.success) {
            alert(res?.data?.message)
            sessionStorage.clear()
            location.reload()
        }
    }

    const handleCancel = () => {
        navigate('/profile')
    }

    const handleToggleCheck = (e) => {
        if (e === true) {
            setValues((prev) => ({
                ...prev,
                role: 'developer'
            }))
        } else {
            setValues((prev) => ({
                ...prev,
                role: 'user'
            }))
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
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-center p-[1rem] overflow-auto ">
                    <Header__Dashboard breadcrumbs={breadCrumbs} />
                    <form
                        onSubmit={handleSubmit}
                        className='w-full h-[95%] flex flex-col justify-start items-center px-[5rem]'>
                        <div className="space-y-12 pt-[5rem] pb-[20rem]">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleOnChange}
                                                value={values?.name}
                                                required
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3'>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleOnChange}
                                                value={values?.email}
                                                required
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="mobileno" className="block text-sm font-medium leading-6 text-gray-900">
                                            Mobile No.
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleOnChange}
                                                value={values?.mobileno}
                                                id="mobileno"
                                                name="mobileno"
                                                type="text"
                                                inputMode='numeric'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3'>
                                    <div className="sm:col-span-1 flex flex-col gap-[.7rem]">
                                        <div className="sm:col-span-1">
                                            <label htmlFor="currentpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                Current Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="currentpassword"
                                                    name="currentpassword"
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <label htmlFor="newpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                New Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="newpassword"
                                                    name="newpassword"
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="confirmpassword"
                                                    name="confirmpassword"
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {
                                    (values?.role === 'user' || values?.role === 'developer') && (
                                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3'>
                                            <div className="sm:col-span-1">
                                                <div className="sm:col-span-3 flex justify-between items-center">
                                                    <div className="block text-sm font-medium leading-6 text-gray-900">
                                                        Developer
                                                    </div>
                                                    <Toggle isCheck={values?.role === 'user' ? false : true} returnCheck={(e) => handleToggleCheck(e)} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                            <div className="w-full flex items-center justify-end gap-x-6">
                                <button
                                    onClick={handleCancel}
                                    className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

const breadCrumbs = [
    { title: 'Profile', href: '/profile', isLink: true },
    { title: 'Edit Profile', isLink: false },
]