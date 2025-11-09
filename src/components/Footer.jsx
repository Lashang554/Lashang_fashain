import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from '../assets/Logo.png'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id='footer' className='bg-[#f45512] text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/*  info */}
        <div className='mb-6 md:mb-0'>
          <Link to='/'>
            {/* <img src={Logo} alt="" className='w-32'/> */}
            <h1 className='text-white-500 text-2xl font-bold'>Lashang Fashion</h1>
          </Link>
          <p className='mt-2 text-sm text-white'>Powering Your World with the Best in Electronics.</p>
          <p className='mt-2 text-sm text-white'>123 Electronics St, Style City, NY 10001</p>
          <p className='text-sm text-white'>Email: lashangfashion@gmail.com</p>
          <p className='text-sm text-white'>Phone: 9860998818</p>
        </div>
        {/* customer service link */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold'>Customer Service</h3>
          <ul className='mt-2 text-sm space-y-2'>
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* social media links */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold'>Follow Us</h3>
          <div className='flex space-x-4 mt-2'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
            <FaPinterest />
          </div>
        </div>
        {/* newsletter subscription */}
        <div>
          <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
          <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
          <form action="" className='mt-4 flex'>
            <input
              type="email"
              placeholder='Your email address'
              className='w-full p-2 rounded-l-md  text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
            <button
              type="submit"
              className="bg-[#F85606] border border-white text-white px-5 py-2 rounded-r-md 
             hover:bg-[#d94d05] transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* bottom section */}
      <div className='mt-8 border-t border-white-700 pt-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()} <span className='text-black-500'>Lashang Fashion</span>. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer