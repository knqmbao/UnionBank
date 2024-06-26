import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header__dashboard'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Transactions() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem]">
                    <Header />
                    <TabContext value={value}>
                        <div className="w-full h-[4rem]">
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Deposit Transaction" value="1" />
                                <Tab label="Withdrawal Transaction" value="2" />
                                <Tab label="Transfer Transaction" value="3" />
                            </TabList>
                        </div>
                        <TabPanel value="1">Deposit Transaction</TabPanel>
                        <TabPanel value="2">Withdrawal Transaction</TabPanel>
                        <TabPanel value="3">Transfer Transaction</TabPanel>
                    </TabContext>
                </div>
            </div>
        </>
    )
}
