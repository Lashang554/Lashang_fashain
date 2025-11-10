import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const { user } = useUser()
    const { theme, toggleTheme } = useTheme()
    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-theme px-8 pb-6 pt-16 text-theme-primary md:hidden rounded-r-xl shadow-md transition-all`}>
            <div>
                <div className='flex items-center justify-start gap-3'>
                    <SignedIn>
                        <UserButton size={50} />
                    </SignedIn>
                    <SignedOut>
                        <FaUserCircle size={50} />
                    </SignedOut>
                    <div>
                        <SignedIn>
                            <h1 className='text-theme-primary'>Hello, {user?.firstName}</h1>
                            <h1 className='text-sm text-theme-tertiary'>Premium User</h1>
                        </SignedIn>
                        <SignedOut>
                            <h1 className='text-theme-primary'>Hello, Guest</h1>
                            <SignInButton className="bg-[#F85606] hover:bg-[#dd4a05] text-white px-4 py-2 rounded-md cursor-pointer transition-all text-sm mt-2">
                                Sign In
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
                <nav className='mt-12'>
                    <ul className='flex flex-col gap-7 text-2xl font-semibold'>
                        <Link to={'/'} onClick={()=>setOpenNav(false)} className="cursor-pointer text-theme-primary hover:text-[#F85606]"><li>Home</li></Link>
                        <Link to={"/products"} onClick={()=>setOpenNav(false)} className="cursor-pointer text-theme-primary hover:text-[#F85606]"><li>Products</li></Link>
                        <Link to={"/about"} onClick={()=>setOpenNav(false)} className="cursor-pointer text-theme-primary hover:text-[#F85606]"><li>About</li></Link>
                        <Link to={"/contact"} onClick={()=>setOpenNav(false)} className="cursor-pointer text-theme-primary hover:text-[#F85606]"><li>Contact</li></Link>
                    </ul>
                </nav>
            </div>
            
            {/* Theme Toggle Button - Mobile */}
            <div className='mt-auto pb-4'>
                <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-3 w-full p-3 rounded-md bg-surface hover:bg-surface-hover transition-all"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <>
                            <MdLightMode className="h-6 w-6 text-theme-primary" />
                            <span className="text-lg font-semibold text-theme-primary">Light Mode</span>
                        </>
                    ) : (
                        <>
                            <MdDarkMode className="h-6 w-6 text-theme-primary" />
                            <span className="text-lg font-semibold text-theme-primary">Dark Mode</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ResponsiveMenu
