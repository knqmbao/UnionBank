import React, { useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import { useNavigate } from 'react-router-dom'

export default function APIKeys() {
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-center p-[1rem] overflow-auto">
                    <Header__Dashboard title={`API KEYS`} />
                    <div className="w-full h-[95%] px-[20rem] py-[5rem]">
                        <div className="w-full flex justify-between items-center">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">API Information</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Your API key details.</p>
                            </div>
                            <button
                                type="submit"
                                className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create a token
                            </button>
                        </div>

                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Token</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
