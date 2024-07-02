import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard';
import DataGrids from '../../../components/DataGrids';
import { useNavigate } from 'react-router-dom';

const columns = [
    {
        field: 'id',
        headerName: 'No.',
        width: 90,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'userid',
        headerName: 'ID',
        width: 200,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 500,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 200,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 200,
        headerAlign: 'center',
        align: 'center'
    }
];

const rows = [
    { id: 1, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
    { id: 2, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
    { id: 3, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
    { id: 4, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
    { id: 5, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
    { id: 6, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
    { id: 7, userid: '000000012', description: 'Added a new customer', role: 'Human Resource', date: 'June 30, 2024' },
];

export default function AuditLog() {
    const [value, setValue] = useState('1');
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard title={`Audit log`} />
                    <div className="w-full h-[95%] flex flex-col justify-start gap-[1rem]">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-start items-center gap-[1rem]">
                                <h1>
                                    Search
                                </h1>
                                <input
                                    type="text"
                                    className="block w-[20rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='Search here...'
                                />
                            </div>
                        </div>
                        <DataGrids columnsTest={columns} rowsTest={rows} />
                    </div>
                </div>
            </div >
        </>
    )
}
