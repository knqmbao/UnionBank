import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar';
import Header__Dashboard from '../../../components/Header__dashboard';
import DataGrids from '../../../components/DataGrids';
import Toggle from '../../../components/Toggle';
import { useNavigate } from 'react-router-dom';

export default function Developers() {
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
    }

    const handleToggleCheck = (e) => {
        
    }

    const renderActionButtons = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Toggle isCheck={false} returnCheck={(e) => handleToggleCheck(e)} />
            </div>

        );
    };

    const developerCol = [
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
            field: 'actions',
            headerName: 'Active',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderActionButtons
        }
    ];

    const developerRows = [
        { id: 1, userid: '000000012', name: 'Jon', email: 14 },
        { id: 2, userid: '000000012', name: 'Jon', email: 14 },
        { id: 3, userid: '000000012', name: 'Jon', email: 14 },
        { id: 4, userid: '000000012', name: 'Jon', email: 14 },
        { id: 5, userid: '000000012', name: 'Jon', email: 14 },
        { id: 6, userid: '000000012', name: 'Jon', email: 14 },
        { id: 7, userid: '000000012', name: 'Jon', email: 14 },
        { id: 8, userid: '000000012', name: 'Jon', email: 14 },
    ]

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard title={`Developers`} />
                    <div className="w-full h-[95%] flex flex-col gap-[1rem]">
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
                        <DataGrids columnsTest={developerCol} rowsTest={developerRows} />
                    </div>
                </div>
            </div >
        </>
    )
}
