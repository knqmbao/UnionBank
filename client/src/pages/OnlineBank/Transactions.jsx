import React, { useState } from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Sidebar from '../../components/Sidebar';
import Header__Dashboard from '../../components/Header__dashboard';
import DataGrids from '../../components/DataGrids';

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard title={`Transactions`} />
                    <TabContext value={value}>
                        <div className="w-full h-[4rem]">
                            <TabList onChange={handleChange}>
                                <Tab label="Deposit" value="1" style={{ fontWeight: '500' }} />
                                <Tab label="Withdrawal" value="2" style={{ fontWeight: '500' }} />
                                <Tab label="Transfer" value="3" style={{ fontWeight: '500' }} />
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
