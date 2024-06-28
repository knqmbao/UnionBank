import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header__dashboard'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataGrids from '../../components/DataGrids';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 20, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 21, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 22, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 23, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 24, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 25, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 26, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 27, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 28, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const depositandwithdrawalCol = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'account',
        headerName: 'Account',
        width: 300,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 300,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 300,
        headerAlign: 'center',
        align: 'center'
    }
]

const transferCol = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'debit',
        headerName: 'Debit',
        width: 250,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'credit',
        headerName: 'Credit',
        width: 250,
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
        field: 'date',
        headerName: 'Date',
        width: 250,
        headerAlign: 'center',
        align: 'center'
    }
]

const depositRowTest = [
    {
        id: 1,
        account: '37475510',
        amount: '200',
        date: Date.now()
    },
    {
        id: 2,
        account: '37475510',
        amount: '400',
        date: Date.now()
    },
    {
        id: 3,
        account: '37475510',
        amount: '500',
        date: Date.now()
    },
]

const transferRowTest = [
    {
        id: 1,
        debit: '37475510',
        credit: '47356780',
        amount: '200',
        date: Date.now()
    },
    {
        id: 2,
        debit: '37475510',
        credit: '47356780',
        amount: '400',
        date: Date.now()
    },
    {
        id: 3,
        debit: '37475510',
        credit: '47356780',
        amount: '500',
        date: Date.now()
    },
]

export default function Transactions() {
    const [value, setValue] = useState('1');
    const [row, setRow] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header title={`Transactions`} />
                    <TabContext value={value}>
                        <div className="w-full h-[4rem]">
                            <TabList onChange={handleChange}>
                                <Tab label="Deposit" value="1" style={{ fontWeight: 'bold' }} />
                                <Tab label="Withdrawal" value="2" style={{ fontWeight: 'bold' }} />
                                <Tab label="Transfer" value="3" style={{ fontWeight: 'bold' }} />
                            </TabList>
                        </div>
                        <TabPanel value="1" className='w-full h-[90%]'>
                            <DataGrids columnsTest={depositandwithdrawalCol} rowsTest={depositRowTest} />
                        </TabPanel>
                        <TabPanel value="2" className='w-full h-[90%]'>
                            <DataGrids columnsTest={depositandwithdrawalCol} rowsTest={depositRowTest} />
                        </TabPanel>
                        <TabPanel value="3" className='w-full h-[90%]'>
                            <DataGrids columnsTest={transferCol} rowsTest={transferRowTest} />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </>
    )
}
