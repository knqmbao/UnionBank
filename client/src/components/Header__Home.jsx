import Logo from '../assets/LogoUB.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Header__Home() {

    const handleClick = async () => {
        try {
            const sampleAccountNo = '000000001'
            const res = await axios.get(`${VITE_HOST}/api/unionbank/myaccount/auth/${sampleAccountNo}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            const url = res?.data?.url
            window.open(url, '_blank', 'width=1080,height=600')
        } catch (error) {
            console.error()
        }
    }
    return (
        <>
            <div className="fixed w-full h-[8%] flex justify-between items-center px-[7rem] sm:px-[10rem] md:px-[15rem] lg:px-[10rem] xl:px-[15rem] z-[1]">
                <div className="h-full flex justify-start items-center gap-[1rem]">
                    <div className="w-[12rem] h-full">
                        <img src={Logo} alt="Logo" className='w-full h-full object-contain' />
                    </div>
                    <Link to={`https://sdevmarc.notion.site/UNIONBANK-85dd31ebb2c34869a3dc59cfc845ec6f?pvs=4`} target='_blank' className='text-[#7ba1bf] font-[500] text-[.9rem] hover:text-white duration-300 ease'>
                        Terms of Use
                    </Link>
                    <Link to={`https://www.notion.so/sdevmarc/UnionBank-Privacy-Policy-565f098c06044eb4a84baeda6ad5364e`} target='_blank' className='text-[#7ba1bf] font-[500] text-[.9rem] hover:text-white duration-300 ease'>
                        Privacy Policy
                    </Link>
                </div>

                <div className=" h-full flex justify-end items-center gap-[.7rem] sm:gap-[1rem] md:gap-[1.5rem] lg:gap-[.8rem]">
                    <Link to={`/signup`} className='text-white px-[1rem] py-[.6rem] bg-[#1daeef] rounded-xl font-[600] text-[.8rem] hover:bg-[#58caff]'>
                        Sign Up
                    </Link>
                    <Link to={`/login`} className='text-white px-[1rem] py-[.6rem] border-[1px] border-white rounded-xl font-[500] text-[.8rem]  hover:bg-[#ffffff] hover:text-black'>
                        Login
                    </Link>
                </div>
            </div>
        </>
    )
}
