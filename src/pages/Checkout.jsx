import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaWallet, FaMoneyBillWave } from 'react-icons/fa'
import { MdLocalShipping } from 'react-icons/md'

const Checkout = () => {
  const { cartItem } = useCart()
  const navigate = useNavigate()

  const [method, setMethod] = useState('cod') // 'cod' | 'card' | 'wallet'
  const [cardNumber, setCardNumber] = useState('')
  const [walletProvider, setWalletProvider] = useState('esewa')
  const [walletId, setWalletId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const itemsTotal = useMemo(() => cartItem.reduce((t, i) => t + i.price, 0), [cartItem])
  const handling = 5
  const grandTotal = itemsTotal + handling

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      try { sessionStorage.setItem('lastOrder', JSON.stringify({ amount: grandTotal, method })) } catch {}
      navigate('/order-success', { replace: true, state: { amount: grandTotal } })
    }, 600)
  }

  if (cartItem.length === 0) {
    return (
      <div className='max-w-4xl mx-auto px-4 mt-10'>
        <h1 className='text-2xl font-bold mb-4'>Your cart is empty</h1>
        <button onClick={() => navigate('/products')} className='bg-[#F85606] hover:bg-[#d94d05] text-white px-4 py-2 rounded-md'>Shop Products</button>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto px-4 mt-10 mb-10'>
      <h1 className='text-2xl font-bold'>Checkout</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
        <form onSubmit={onSubmit} className='md:col-span-2 bg-gray-100 rounded-md p-6 space-y-5'>
          <h2 className='text-lg font-semibold'>Payment Method</h2>
          {/* method cards */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            <button
              type='button'
              onClick={()=>setMethod('cod')}
              className={`text-left rounded-lg border p-4 bg-white hover:shadow transition ${method==='cod' ? 'border-[#F85606] ring-2 ring-[#F85606]/30' : 'border-gray-200'}`}
            >
              <div className='flex items-center gap-3'>
                <MdLocalShipping className='h-6 w-6 text-[#F85606]' />
                <div>
                  <div className='font-semibold'>Cash on Delivery</div>
                  <div className='text-xs text-gray-500'>Pay when you receive</div>
                </div>
              </div>
            </button>

            <button
              type='button'
              onClick={()=>setMethod('card')}
              className={`text-left rounded-lg border p-4 bg-white hover:shadow transition ${method==='card' ? 'border-[#F85606] ring-2 ring-[#F85606]/30' : 'border-gray-200'}`}
            >
              <div className='flex items-center gap-3'>
                <FaMoneyBillWave className='h-6 w-6 text-[#16a34a]' />
                <div>
                  <div className='font-semibold'>Credit / Debit Card</div>
                  <div className='flex items-center gap-2 mt-1 text-[#1f2937]'>
                    <FaCcVisa className='h-5 w-5 text-[#1a1f71]' />
                    <FaCcMastercard className='h-5 w-5 text-[#eb001b]' />
                    <FaCcAmex className='h-5 w-5 text-[#2e77bb]' />
                  </div>
                </div>
              </div>
            </button>

            <button
              type='button'
              onClick={()=>setMethod('wallet')}
              className={`text-left rounded-lg border p-4 bg-white hover:shadow transition ${method==='wallet' ? 'border-[#F85606] ring-2 ring-[#F85606]/30' : 'border-gray-200'}`}
            >
              <div className='flex items-center gap-3'>
                <FaWallet className='h-6 w-6 text-[#10b981]' />
                <div>
                  <div className='font-semibold'>Digital Wallet</div>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-xs bg-[#10b981] text-white rounded px-2 py-0.5'>eSewa</span>
                    <span className='text-xs bg-[#6d28d9] text-white rounded px-2 py-0.5'>Khalti</span>
                    <FaPaypal className='h-5 w-5 text-[#003087]' />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {method === 'card' && (
            <div className='space-y-3 pt-2'>
              <label className='text-sm text-gray-600'>Enter a dummy card number</label>
              <input value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} placeholder='4242 4242 4242 4242' className='p-2 rounded-md w-full' />
            </div>
          )}

          {method === 'wallet' && (
            <div className='space-y-3 pt-2'>
              <label className='text-sm text-gray-600'>Choose provider</label>
              <select value={walletProvider} onChange={(e)=>setWalletProvider(e.target.value)} className='p-2 rounded-md w-full'>
                <option value='esewa'>eSewa</option>
                <option value='khalti'>Khalti</option>
                <option value='paypal'>PayPal</option>
              </select>
              <input value={walletId} onChange={(e)=>setWalletId(e.target.value)} placeholder='Wallet ID / Phone (dummy)' className='p-2 rounded-md w-full' />
            </div>
          )}

          <button disabled={submitting} type='submit' className='bg-[#F85606] hover:bg-[#d94d05] disabled:opacity-70 text-white px-4 py-2 rounded-md'>
            {submitting ? 'Processing...' : method === 'cod' ? 'Place Order' : 'Pay Now'}
          </button>
        </form>

        <div className='bg-white border border-gray-100 shadow-xl rounded-md p-6 h-max'>
          <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
          <div className='space-y-2 max-h-64 overflow-auto pr-2'>
            {cartItem.map((i, idx) => (
              <div key={idx} className='flex justify-between text-sm'>
                <span className='line-clamp-1'>{i.title}</span>
                <span>${i.price}</span>
              </div>
            ))}
          </div>
          <hr className='my-3'/>
          <div className='flex justify-between text-sm'><span>Items</span><span>${itemsTotal}</span></div>
          <div className='flex justify-between text-sm'><span>Handling</span><span>${handling}</span></div>
          <div className='flex justify-between font-semibold text-base mt-2'><span>Total</span><span>${grandTotal}</span></div>
        </div>
      </div>
    </div>
  )
}

export default Checkout


