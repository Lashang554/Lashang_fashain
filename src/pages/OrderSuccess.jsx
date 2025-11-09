import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaCheckCircle } from 'react-icons/fa'

const OrderSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearCart } = useCart()
  const [amount, setAmount] = useState(location.state?.amount)

  useEffect(() => {
    // Clear cart once on mount to avoid update loops
    if (clearCart) clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (amount == null) {
      try {
        const raw = sessionStorage.getItem('lastOrder')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (parsed && parsed.amount != null) setAmount(parsed.amount)
        }
      } catch {}
    }
  }, [amount])

  return (
    <div className='max-w-3xl mx-auto px-4 mt-20 mb-16 text-center'>
      <div className='flex justify-center mb-4'>
        <FaCheckCircle className='h-16 w-16 text-[#10b981]' />
      </div>
      <h1 className='text-3xl font-bold text-[#F85606]'>Order Successful</h1>
      <p className='mt-3 text-gray-700'>Thank you for your order.</p>
      {amount != null ? (
        <p className='mt-1 text-gray-700'>Charged: ${amount}</p>
      ) : (
        <p className='mt-1 text-gray-700'>Your order has been placed.</p>
      )}
      <div className='mt-8 flex gap-4 justify-center'>
        <button onClick={() => navigate('/products')} className='bg-[#F85606] hover:bg-[#d94d05] text-white px-4 py-2 rounded-md'>Continue Shopping</button>
        <button onClick={() => navigate('/')} className='bg-white text-black border border-gray-200 px-4 py-2 rounded-md'>Go Home</button>
      </div>
    </div>
  )
}

export default OrderSuccess


