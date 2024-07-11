import React from 'react'
import { Link } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import SolanaPic from '../../assets/SolanaPic.webp'

export default function Home() {
    return (
        <div className='w-full h-screen flex justify-start items-center flex-col bg-[#121212]'>
            <Header__Home />
            <div className="overflow-hidden w-full h-full flex flex-col justify-evenly items-center relative">
                <img src={SolanaPic} alt="Solana Pic" className='absolute top-[-2rem] left-[30rem] sm:left-[25rem] md:left-[20rem] lg:-left-[15rem] w-[20rem] h-[10rem] scale-[5]' />
                <img src={SolanaPic} alt="Solana Pic" className='absolute top-[10rem] right-[-30rem] sm:right-[-25rem] md:right-[-20rem] lg:right-[-15rem] w-[20rem] h-[10rem] scale-[5]' />
                <div className="absolute w-full h-screen bg-[rgba(0,0,0,0.54)] flex justify-center items-center z-[2]">
                    <h1 className='text-white text-[4rem] text-bold'>Maintenance break, we will be right back</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-[1rem]">
                    <h1 className='text-white text-[4rem] font-[600] text-center z-[1]'>
                        Powerful for developers. <br /> Fast for everyone.
                    </h1>
                    <div className="w-full">
                        <h1 className='text-[#87878e] text-center'>
                            Bring blockchain to the people. UnionBank supports experiences <br /> for power users, new consumers, and everyone in between.
                        </h1>
                    </div>
                    <div className="w-full flex justify-center items-center gap-[1rem] z-[1]">
                        <Link to={`https://spiritual-wire-287.notion.site/UnionBank-API-Documentation-6a2928ba55e5442b91423fda3ebd8f78?pvs=4`}
                            className='text-white px-[1.7rem] py-[.7rem] border-white border-[1px] rounded-3xl hover:bg-white hover:text-black'
                            target='_blank'
                        >
                            READ DOCS
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
