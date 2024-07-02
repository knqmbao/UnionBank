import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import DataGrids from '../../../components/DataGrids'
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Ledger() {
    const [carddetails, setCardDetails] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')
            const { userId, role } = JSON.parse(credentials)
            setRole(role)

            const res = await axios.get(`${VITE_HOST}/api/useraccount/${userId}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            if (res?.data?.success) {
                setCardDetails(res?.data?.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const CustomerColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'transId',
            headerName: 'ID',
            width: 300,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        }
    ]

    const rowste = [
        { id: 1, transId: '1123', amount: '123123', type: 'Deposit', status: 'Completed', description: '' }
    ]

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-auto">
                    <Header__Dashboard title={`Ledger`} />
                    <div className="w-full h-[95%] flex flex-col justify-start items-start gap-[1rem]">
                        <div className="w-full h-[5%]">
                            <h1 className='text-black font-[600] text-[1.2rem]'>
                                Transaction History
                            </h1>
                        </div>
                        <div className="w-full h-[90%]">
                            <DataGrids columnsTest={CustomerColumns} rowsTest={rowste} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
