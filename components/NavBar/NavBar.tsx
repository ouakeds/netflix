import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs'
import NavBarItem from './NavBarItem';
import NavBarMenu from './NavBarMenu';
import { useCallback, useEffect, useState } from 'react';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const NavBar = () => {

    const links = ['Home', 'Series', 'Films', 'News']

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    
    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [setShowMobileMenu])
    
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [setShowAccountMenu])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET)
                setShowBackground(true)
            else
                setShowBackground(false)
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return <nav className="w-full fixed z-40">
        <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-opacity-90 ${showBackground ? 'bg-zinc-900' : 'bg-transparent'}` }>
            <img src='/images/logo.png' alt='Logo' className="h-24"/>

            <div className="flex-row ml-8 gap-7 hidden lg:flex">
                {
                    links.map((link, key) => {
                        return <NavBarItem key={key} label={link}/>
                    })
                }
            </div>

            <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <BsChevronDown className={`text-white w-4 transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                <NavBarMenu visible={showMobileMenu} links={links}/>
            </div>
            <div className='flex flex-row ml-auto gap-10 items-center'>
                <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                    <BsSearch/>
                </div>
                <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                    <BsBell/>
                </div>
                <div className='flex flex-row items-center gap-2 cursor-pointer relative' onClick={toggleAccountMenu}>
                    <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                        <img src="/images/profile.png" alt="profile" />
                    </div>
                    <BsChevronDown className={`text-white w-4 transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <AccountMenu visible={showAccountMenu}/>
                </div>


            </div>
        </div>
    </nav>
}

export default NavBar;