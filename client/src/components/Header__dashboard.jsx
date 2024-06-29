import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function Header__Dashboard({ linkName,linkName1, link, link1, title }) {
    const breadcrumbs = [
        linkName &&
        <Link underline="hover" key="1" fontSize={`.9rem`} href={link}>
            {linkName}
        </Link>,
         linkName1 &&
         <Link underline="hover" key="1" fontSize={`.9rem`} href={link1}>
             {linkName1}
         </Link>,
        <h1 key="3" className='font-[500] text-[.9rem] text-[#111111]'>
            {title}
        </h1>,
    ];
    return (
        <>
            <div className="w-full h-[5%] flex justify-start items-center">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
        </>
    )
}
