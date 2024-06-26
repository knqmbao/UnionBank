import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function Header__Dashboard() {
    const breadcrumbs = [
        // <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
        //     MUI
        // </Link>,
        <h1 key="3" className='font-[500] text-[.9rem] text-[#111111]'>
            Transactions
        </h1>,
    ];
    return (
        <>
            <div className="w-full h-[3rem] flex justify-start items-center">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
        </>
    )
}
