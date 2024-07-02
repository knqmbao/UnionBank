import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Header__Dashboard from '../../../components/Header__dashboard'
import Sidebar from '../../../components/Sidebar'
import DataGrids from '../../../components/DataGrids';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../../components/Toggle';

export default function Employees() {
    const [value, setValue] = useState('1')
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
    }

    const handleToggleCheck = (e) => {
        
    }

    const renderIsActiveToggle = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Toggle isCheck={false} returnCheck={(e) => handleToggleCheck(e)} />
            </div>
    
        );
    };
    
    const renderActionButtons = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Button variant="text">
                    <h1>Edit</h1>
                </Button>
            </div>
        );
    };
    
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
            field: 'name',
            headerName: 'Full Name',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'isactive',
            headerName: 'Active',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderIsActiveToggle
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderActionButtons
        }
    ];
    
    const rows = [
        { id: 1, userid: '000000012', name: 'Jon', email: 'yourpareng@gmail.coms' },
        { id: 2, userid: '000000012', name: 'Jon', email: 'yourpareng@gmail.com' },
        { id: 3, userid: '000000012', name: 'Jon', email: 'yourpareng@gmail.com' },
        { id: 4, userid: '000000012', name: 'Jon', email: 'yourpareng@gmail.com' },
        { id: 5, userid: '000000012', name: 'Jon', email: 'yourpareng@gmail.com' },
        { id: 6, userid: '000000012', name: 'Jon', email: 'yourpareng@gmail.com' },
    ];
    
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard title={`Employees`} />
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
                            <div className="w-full flex items-center justify-end gap-x-6">
                                <Link
                                    to={`/employees/addemployee`}
                                    className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Employee
                                </Link>
                            </div>
                        </div>
                        <DataGrids columnsTest={columns} rowsTest={rows} />
                    </div>
                </div>
            </div >
        </>
    )
}
