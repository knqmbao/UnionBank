import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header__dashboard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Profile() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        isactive: '',
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
            const isactive = res?.data?.data?.isactive
            const email = res?.data?.data?.email
            const role = res?.data?.data?.role

            setValues((prev) => ({
                ...prev,
                name: name,
                isactive: isactive,
                email: email,
                role: role
            }))
            console.log(values)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = () => {
        navigate('/profile/updateprofile')
    }
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-center p-[1rem] overflow-auto">
                    <Header breadcrumbs={breadCrumbs} />
                    <div className="w-full h-[95%] px-[20rem] py-[5rem]">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Account Information</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
                        </div>
                        <div className="border-t border-gray-100 mt-[1.5rem] pb-[20rem]">
                            <dl className="divide-y divide-gray-100 ">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {values?.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {values?.email}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Account status</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {values?.isactive === false ? 'Inactive' : 'Active'}
                                    </dd>
                                </div>
                                {
                                    (values?.role === 'user' || values?.role === 'developer') && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Developer</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {values?.role === 'user' && 'Inactive'}
                                                {values?.role === 'developer' && 'Active'}
                                            </dd>
                                        </div>
                                    )
                                }

                                <div className="w-full flex items-center justify-end gap-x-6 pt-[2rem]">
                                    <button
                                        onClick={handleEdit}
                                        className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const breadCrumbs = [
    // { title: 'Home', href: '/', isLink: true },
    { title: 'Profile', isLink: false },
]