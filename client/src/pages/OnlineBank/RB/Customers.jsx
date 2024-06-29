import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard';
import DataGrids from '../../../components/DataGrids';
import { Link } from 'react-router-dom';

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
        width: 100,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 250,
        headerAlign: 'center',
        align: 'center'
    },

];

const rows = [
    { id: 1, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Not Active' },
    { id: 2, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Not Active' },
    { id: 3, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Not Active' },
    { id: 4, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Active' },
    { id: 5, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Not Active' },
    { id: 6, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Active' },
    { id: 7, userid: '0000000123', name: 'Jon Doe', email: 'Jon@gmail.com', isactive: 'Active' },
];

export default function Customers() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard title={`Customers`} />
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
                            <div className="w-full flex items-center justify-end gap-x-3">
                                <Link
                                    to={`/customers/addcustomer`}
                                    className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Open Account
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
