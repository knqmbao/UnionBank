import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import DataGrids from '../../../components/DataGrids'
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Ledger() {
    const [values, setValues] = useState([])
    const [details, setDetails] = useState({
        role: '',
        uid: ''
    })
    const [userTransactions, setUserTransactions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials();
    }, []);

    useEffect(() => {
        if (details?.role === 'rb' || details?.role === 'admin') {
            fetchTransactions();
        } else if (details.role === 'user') {
            fetchUserTransactions();
        }
    }, [details.role]);

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/unionbank')
            const { userId, role } = JSON.parse(credentials)
            setDetails((prev) => ({
                ...prev,
                role: role,
                uid: userId
            }))

        } catch (error) {
            console.error(error)
        }
    }

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/transactions`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const transactions = res?.data?.data
            const formattedData = transactions.map((trans, index) => ({
                id: index + 1,
                date: trans?.createdAt,
                reference: trans?._id,
                debit: trans?.amount,
                credit: trans?.amount,
                description: trans?.description,
                transactionType: trans?.transactionType
            }))
            setValues(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchUserTransactions = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            const { userId } = JSON.parse(credentials)
            const res = await axios.get(`${VITE_HOST}/api/transactions/${userId}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const transactions = res?.data?.data
            const formattedData = transactions.map((trans, index) => ({
                id: index + 1,
                date: trans?.createdAt,
                reference: trans?._id,
                debit: trans?.amount,
                credit: trans?.amount,
                description: trans?.description,
                transactionType: trans?.transactionType,
                balance: trans?.balance
            }))
            setUserTransactions(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const renderDebitCell = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                {
                    (params.row.transactionType === 'withdrawal' || params.row.transactionType === 'transfer_debit') ? params.row.debit : '---'
                }
            </div>

        );
    };

    const renderCreditCell = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1 className='font-bold'>
                    {
                        (params.row.transactionType === 'deposit' || params.row.transactionType === 'transfer_credit') ? params.row.credit : '---'
                    }
                </h1>
            </div>

        );
    };

    const RBColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'reference',
            headerName: 'Reference',
            type: 'number',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'debit',
            headerName: 'Debit (PHP)',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderDebitCell
        },
        {
            field: 'credit',
            headerName: 'Credit (PHP)',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderCreditCell
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            headerAlign: 'center',
            align: 'center'
        }
    ]

    const UserColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'reference',
            headerName: 'Reference',
            type: 'number',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'debit',
            headerName: 'Debit (PHP)',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderDebitCell
        },
        {
            field: 'credit',
            headerName: 'Credit (PHP)',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderCreditCell
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 300,
            headerAlign: 'center',
            align: 'center'
        }
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
                            {(details?.role === 'rb' || details?.role === 'admin') && (<DataGrids columnsTest={RBColumns} rowsTest={values} />)}
                            {(details?.role === 'user' || details?.role === 'developer') && (<DataGrids columnsTest={UserColumns} rowsTest={userTransactions} />)}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
