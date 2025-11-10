import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrums = ({title}) => {
    const navigate = useNavigate()
  return (
    <div className='max-w-6xl mx-auto my-10'>
      <h1 className='text-xl text-theme-secondary font-semibold '><span className='cursor-pointer hover:text-[#F85606]' onClick={()=>navigate('/')}>Home</span> / <span className='cursor-pointer hover:text-[#F85606]' onClick={()=>navigate('/products')}>Products</span> / <span>{title}</span></h1>
    </div>
  )
}

export default Breadcrums
