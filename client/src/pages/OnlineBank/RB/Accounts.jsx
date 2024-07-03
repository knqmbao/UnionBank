import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import DataGrids from '../../../components/DataGrids'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Accounts() {
    const [values, setValues] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials();
        fetchRBAccounts()
    }, []);

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')
        } catch (error) {
            console.error(error)
        }
    }

    const fetchRBAccounts = async () => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/rbaccounts`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            const accounts = res?.data?.data
            const formattedData = accounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?.user?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                balance: acc?.balance
            }))
            setValues(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleViewAccount = (e) => {
        navigate(`/ledger/${e}`)
    }

    const renderViewCell = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Button onClick={() => handleViewAccount(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
                    <h1>View Statement</h1>
                </Button>
            </div>

        );
    };

    const UserColumns = [
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
            type: 'number',
            width: 350,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderViewCell
        }
    ]

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-auto">
                    <Header__Dashboard title={`View Accounts`} />
                    <div className="w-full h-[95%] flex flex-col justify-start items-start gap-[1rem]">
                        <div className="w-full h-[5%]">
                            <h1 className='text-black font-[600] text-[1.2rem]'>
                                Account Holders
                            </h1>
                        </div>
                        <div className="w-full h-[5%] flex justify-start items-center gap-[1rem]">
                            <h1>
                                Search
                            </h1>
                            <input
                                type="text"
                                className="block w-[20rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Search here...'
                            />
                            <Button>
                                <SearchIcon />
                            </Button>
                        </div>
                        <div className="w-full h-[80%]">
                            <DataGrids columnsTest={UserColumns} rowsTest={values} descCol={`id`} colVisibility={{ id: false }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
