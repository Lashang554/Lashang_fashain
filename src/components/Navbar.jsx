import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'

const Navbar = () => {

    const {cartItem} = useCart()
    const [openNav, setOpenNav] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const onSearchSubmit = (e)=>{
        e.preventDefault()
        const trimmed = query.trim()
        if(trimmed.length === 0){
            navigate('/products')
            setQuery("")
            return
        }
        navigate(`/products?q=${encodeURIComponent(trimmed)}`)
        setQuery("")
        setOpenNav(false)
    }
    
    return (
        <div className="bg-[#f45512] shadow-sm border-b border-[#f45512] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
      
            {/* LOGO */}
            <div className="flex gap-7 items-center">
              <Link to={"/"}>
                <h1 className="font-bold text-3xl text-white tracking-wide">
                  Lashang Fashion
                </h1>
              </Link>
            </div>
      
            {/* NAVIGATION + CART + LOGIN */}
            <nav className="flex gap-6 items-center">
      
              {/* Links */}
              <ul className="hidden md:flex gap-7 items-center text-base font-semibold">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `${isActive ? "text-[#F85606]" : "text-white"}`
                  }
                >
                  <li className="text-white transition-all">Home</li>
                </NavLink>
      
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    `${isActive ? "text-[#F85606]" : "text-white"}`
                  }
                >
                  <li className="text-white transition-all">Products</li>
                </NavLink>
      
                <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    `${isActive ? "text-[#F85606]" : "text-white"}`
                  }
                >
                  <li className="text-white transition-all">About</li>
                </NavLink>
      
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    `${isActive ? "text-[#F85606]" : "text-white"}`
                  }
                >
                  <li className="text-white transition-all">Contact</li>
                </NavLink>
              </ul>

              {/* Search */}
              <form onSubmit={onSearchSubmit} className="hidden md:flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="Search products or categories..."
                  className="px-3 py-2 rounded-l-md focus:outline-none text-sm w-56"
                />
                <button type="submit" className="bg-[#F85606] hover:bg-[#dd4a05] text-white px-3 py-2 rounded-r-md text-sm">Search</button>
              </form>
      
              {/* Cart */}
              <Link to={"/cart"} className="relative">
                <IoCartOutline className="h-7 w-7 text-white transition-all" />
                <span className="bg-[#F85606] border-2 border-white px-2 text-center rounded-full absolute -top-3 -right-3 text-white text-xs">
                  {cartItem.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              </Link>
      
              {/* Login / User */}
              <div className="hidden md:block">
                <SignedOut>
                  <SignInButton className="bg-[#F85606] hover:bg-[#dd4a05] text-white px-4 py-2 rounded-md cursor-pointer transition-all text-sm" />
                </SignedOut>
      
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
      
              {/* Mobile */}
              {openNav ? (
                <HiMenuAlt3
                  onClick={() => setOpenNav(false)}
                  className="h-7 w-7 md:hidden text-white"
                />
              ) : (
                <HiMenuAlt1
                  onClick={() => setOpenNav(true)}
                  className="h-7 w-7 md:hidden text-white"
                />
              )}
            </nav>
          </div>
      
          {/* Mobile Menu Drawer */}
          <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
        </div>
      );
      
      
}

export default Navbar
