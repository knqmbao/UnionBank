import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard';
import DataGrids from '../../../components/DataGrids';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../../components/Toggle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button } from '@mui/material'
import axios from 'axios'

const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Customers() {
    const [value, setValue] = useState('1');
    const [details, setDetails] = useState([])
    const [accounts, setAccounts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
        fetchRBUsers()
        fethcRBAccounts()
    }, [])

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')

        } catch (error) {
            console.error(error)
        }
    }

    const fetchRBUsers = async () => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/rbusers`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const users = res?.data?.data
            const formattedData = users.map((user, index) => ({
                id: index + 1,
                uid: user?._id,
                name: user?.name,
                email: user?.email,
                mobileno: user?.mobileno,
                isactive: user?.isactive,
                accountactive: user?.isactive
            }))
            setDetails(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChangeRBUsers = async (e) => {
        try {
            const { value } = e.target
            if (value === '') return fetchRBUsers()

            const res = await axios.get(`${VITE_HOST}/api/searchrbusers/${value}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const users = res?.data?.data

            const formattedData = users.map((user, index) => ({
                id: index + 1,
                uid: user?._id,
                name: user?.name,
                email: user?.email,
                mobileno: user?.mobileno,
                isactive: user?.isactive,
                accountactive: user?.isactive
            }))
            setDetails(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const fethcRBAccounts = async () => {
        try {

            const res = await axios.get(`${VITE_HOST}/api/rbaccounts`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const RBaccounts = res?.data?.data
            const formattedData = RBaccounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                email: acc?.user?.email,
                mobileno: acc?.user?.mobileno,
                accountactive: acc?.isactive
            }))
            setAccounts(formattedData)

        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChangeRBAccounts = async (e) => {
        try {
            const { value } = e.target
            if (value === '') return fethcRBAccounts()

            const res = await axios.get(`${VITE_HOST}/api/searchrbaccounts/${value}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const RBaccounts = res?.data?.data
            const formattedData = RBaccounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                email: acc?.user?.email,
                mobileno: acc?.user?.mobileno,
                accountactive: acc?.isactive
            }))
            setAccounts(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event, newValue) => {
        try {
            setValue(newValue);
        } catch (error) {
            console.error(error)
        } finally {
            if (value == '1') {
                fetchRBUsers()
            } else if (value === '2') {
                fethcRBAccounts()
            }
        }
    }

    const handleOpenAccount = async (name) => {
        try {
            const res = await axios.post(`${VITE_HOST}/api/createaccount`, { userId: name, accountType: 'savings' }, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            if (res?.data?.success) return alert(res?.data?.message)
            alert(res?.data?.message)
        } catch (error) {
            console.error(error)
        } finally {
            fetchRBUsers()
            fethcRBAccounts()
        }
    }

    const handleUpdateActiveCustomer = async (e, id) => {
        try {
          await axios.post(`${VITE_HOST}/api/updateactiveuser/${id}`, { isactive: e }, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateActiveAccount = async (e, id) => {
        try {
            await axios.post(`${VITE_HOST}/api/updateactiveaccount/${id}`, { isactive: e }, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const renderIsRBUserActiveToggle = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Toggle isCheck={params.row.isactive} returnCheck={(checkState) => handleUpdateActiveCustomer(checkState, params.row.uid)} />
            </div>

        );
    };

    const renderIsRBAccountActiveToggle = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Toggle isCheck={params.row.accountactive} returnCheck={(checkState) => handleUpdateActiveAccount(checkState, params.row.uid)} />
            </div>

        );
    };


    const renderActionButtons = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Button onClick={() => handleOpenAccount(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
                    <h1>Open Account</h1>
                </Button>
            </div>
        );
    };

    const CustomerColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Full Name',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'mobileno',
            headerName: 'Mobile No.',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'isactive',
            headerName: 'Active',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderIsRBUserActiveToggle
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderActionButtons
        }
    ]

    const AccountColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'accountno',
            headerName: 'Account No.',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Full Name',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'mobileno',
            headerName: 'Mobile No.',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'isactive',
            headerName: 'Active',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderIsRBAccountActiveToggle
        }
    ]

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard breadcrumbs={breadCrumbs} />
                    <div className="w-full h-[5%]">
                        <h1 className='text-black font-[600] text-[1.2rem]'>
                            Manage
                        </h1>
                    </div>
                    <TabContext value={value}>
                        <div className="w-full h-[7.5%] overflow-hidden">
                            <TabList onChange={handleChange}>
                                <Tab label="Registered Users" value="1" style={{ fontWeight: '500' }} />
                                <Tab label="Account Holders" value="2" style={{ fontWeight: '500' }} />
                            </TabList>
                        </div>

                        <TabPanel value="1" className='w-full h-[82%]'>
                            <div className="w-full h-[5%] flex justify-between items-center pt-[.5rem] pb-[2rem]">
                                <div className="flex justify-start items-center gap-[1rem]">
                                    <h1>
                                        Search
                                    </h1>
                                    <input
                                        onChange={handleOnChangeRBUsers}
                                        type="text"
                                        className="block w-[20rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder='Search here...'
                                    />
                                </div>
                                <div className="w-full flex items-center justify-end gap-x-3">
                                    <Link
                                        to={`/customers/addcustomer`}
                                        className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Open Account
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full h-[90%]">
                                <DataGrids columnsTest={CustomerColumns} rowsTest={details} descCol={`id`} />
                            </div>
                        </TabPanel>
                        <TabPanel value="2" className='w-full h-[82%]'>
                            <div className="w-full h-[5%] flex justify-between items-center pt-[.5rem] pb-[2rem]">
                                <div className="flex justify-start items-center gap-[1rem]">
                                    <h1>
                                        Search
                                    </h1>
                                    <input
                                        onChange={handleOnChangeRBAccounts}
                                        type="text"
                                        className="block w-[20rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder='Search here...'
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[90%]">
                                <DataGrids columnsTest={AccountColumns} rowsTest={accounts} descCol={`accountno`} colVisibility={{ id: false }} />
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
            </div >
        </>
    )
}

const breadCrumbs = [
    // { title: 'Home', href: '/', isLink: true },
    { title: 'Customers', isLink: false },
]