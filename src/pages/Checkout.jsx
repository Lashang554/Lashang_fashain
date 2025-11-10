import React, { useMemo, useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaWallet, FaMoneyBillWave } from 'react-icons/fa'
import { MdLocalShipping, MdEdit } from 'react-icons/md'
import { useUser } from '@clerk/clerk-react'

const Checkout = ({ location, saveManualLocation }) => {
  const { cartItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  const [showPayment, setShowPayment] = useState(false)
  const [method, setMethod] = useState('cod') // 'cod' | 'card' | 'wallet'
  const [cardNumber, setCardNumber] = useState('')
  const [walletProvider, setWalletProvider] = useState('esewa')
  const [walletId, setWalletId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    state: '',
    country: '',
    phone: ''
  })

  // Update delivery info when location or user changes
  useEffect(() => {
    // Load saved delivery info from localStorage
    const savedDeliveryInfo = localStorage.getItem('deliveryInfo')
    if (savedDeliveryInfo) {
      const parsed = JSON.parse(savedDeliveryInfo)
      setDeliveryInfo(prev => ({
        ...prev,
        fullName: parsed.fullName || prev.fullName,
        phone: parsed.phone || prev.phone
      }))
    } else if (user?.fullName) {
      setDeliveryInfo(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName
      }))
    }
    
    if (location) {
      setDeliveryInfo(prev => ({
        ...prev,
        address: location.county || prev.address,
        state: location.state || prev.state,
        country: location.country || prev.country
      }))
    }
  }, [location, user])

  const itemsTotal = useMemo(() => cartItem.reduce((t, i) => t + (i.price * (i.quantity || 1)), 0), [cartItem])
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
      <div className='max-w-4xl mx-auto px-4 mt-10 bg-theme min-h-screen py-5'>
        <h1 className='text-2xl font-bold mb-4 text-theme-primary'>Your cart is empty</h1>
        <button onClick={() => navigate('/products')} className='btn-primary px-4 py-2 rounded-md'>Shop Products</button>
      </div>
    )
  }

  // Payment Step
  if (showPayment) {
    return (
      <div className='max-w-5xl mx-auto px-4 mt-10 mb-10 bg-theme min-h-screen py-5'>
        <h1 className='text-2xl font-bold mb-2 text-theme-primary'>Payment</h1>
        <button onClick={() => setShowPayment(false)} className='text-[#F85606] hover:underline mb-6'>← Back to Checkout</button>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-4'>
          <form onSubmit={onSubmit} className='md:col-span-2 bg-surface rounded-md p-6 space-y-5'>
            <h2 className='text-lg font-semibold text-theme-primary'>Payment Method</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              <button
                type='button'
                onClick={()=>setMethod('cod')}
                className={`text-left rounded-lg border p-4 card-theme hover:shadow transition ${method==='cod' ? 'border-[#F85606] ring-2 ring-[#F85606]/30' : 'border-theme'}`}
              >
                <div className='flex items-center gap-3'>
                  <MdLocalShipping className='h-6 w-6 text-[#F85606]' />
                  <div>
                    <div className='font-semibold text-theme-primary'>Cash on Delivery</div>
                    <div className='text-xs text-theme-tertiary'>Pay when you receive</div>
                  </div>
                </div>
              </button>

              <button
                type='button'
                onClick={()=>setMethod('card')}
                className={`text-left rounded-lg border p-4 card-theme hover:shadow transition ${method==='card' ? 'border-[#F85606] ring-2 ring-[#F85606]/30' : 'border-theme'}`}
              >
                <div className='flex items-center gap-3'>
                  <FaMoneyBillWave className='h-6 w-6 text-[#16a34a]' />
                  <div>
                    <div className='font-semibold text-theme-primary'>Credit / Debit Card</div>
                    <div className='flex items-center gap-2 mt-1 text-theme-secondary'>
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
                className={`text-left rounded-lg border p-4 card-theme hover:shadow transition ${method==='wallet' ? 'border-[#F85606] ring-2 ring-[#F85606]/30' : 'border-theme'}`}
              >
                <div className='flex items-center gap-3'>
                  <FaWallet className='h-6 w-6 text-[#10b981]' />
                  <div>
                    <div className='font-semibold text-theme-primary'>Digital Wallet</div>
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
                <label className='text-sm text-theme-secondary'>Enter a dummy card number</label>
                <input value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} placeholder='4242 4242 4242 4242' className='input-theme p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#F85606]' />
              </div>
            )}

            {method === 'wallet' && (
              <div className='space-y-3 pt-2'>
                <label className='text-sm text-theme-secondary'>Choose provider</label>
                <select value={walletProvider} onChange={(e)=>setWalletProvider(e.target.value)} className='input-theme p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#F85606]'>
                  <option value='esewa'>eSewa</option>
                  <option value='khalti'>Khalti</option>
                  <option value='paypal'>PayPal</option>
                </select>
                <input value={walletId} onChange={(e)=>setWalletId(e.target.value)} placeholder='Wallet ID / Phone (dummy)' className='input-theme p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#F85606]' />
              </div>
            )}

            <button disabled={submitting} type='submit' className='btn-primary disabled:opacity-70 px-4 py-2 rounded-md w-full font-semibold'>
              {submitting ? 'Processing...' : method === 'cod' ? 'Place Order' : 'Pay Now'}
            </button>
          </form>

          {/* Small Order Summary */}
          <div className='card-theme shadow-xl rounded-md p-6 h-max'>
            <h2 className='text-lg font-semibold mb-3 text-theme-primary'>Order Summary</h2>
            <div className='space-y-2 max-h-48 overflow-auto pr-2 mb-3'>
              {cartItem.map((i, idx) => (
                <div key={idx} className='flex justify-between text-sm border-b border-theme pb-2'>
                  <div className='flex-1'>
                    <p className='line-clamp-1 text-theme-secondary'>{i.title}</p>
                    <p className='text-xs text-theme-tertiary'>Item {idx + 1}</p>
                  </div>
                  <p className='font-semibold ml-2 text-theme-primary'>${(i.price * (i.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className='my-3 border-theme'/>
            <div className='flex justify-between text-sm text-theme-secondary'><span>Items</span><span>${itemsTotal.toFixed(2)}</span></div>
            <div className='flex justify-between text-sm text-theme-secondary'><span>Handling</span><span>${handling.toFixed(2)}</span></div>
            <div className='flex justify-between font-semibold text-base mt-2 text-theme-primary'><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    )
  }

  // Main Checkout Step
  return (
    <div className='max-w-6xl mx-auto px-4 mt-10 mb-10 bg-theme min-h-screen py-5'>
      <h1 className='text-2xl font-bold text-theme-primary'>Checkout</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
        {/* Delivery Info */}
        <div className='bg-surface rounded-md p-7 space-y-3'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-theme-primary font-bold text-xl'>Delivery Address</h1>
            <button 
              onClick={() => navigate('/cart')} 
              className='flex items-center gap-1 text-[#F85606] hover:text-[#d94d05] font-medium'
            >
              <MdEdit className='text-lg' />
              Edit
            </button>
          </div>
          
          <div className='space-y-2 text-theme-secondary'>
            <p><span className='font-semibold'>Name:</span> {deliveryInfo.fullName || 'Not provided'}</p>
            <p><span className='font-semibold'>Address:</span> {deliveryInfo.address || 'Not provided'}</p>
            <p><span className='font-semibold'>State:</span> {deliveryInfo.state || 'Not provided'}</p>
            <p><span className='font-semibold'>Country:</span> {deliveryInfo.country || 'Not provided'}</p>
            <p><span className='font-semibold'>Phone:</span> {deliveryInfo.phone || 'Not provided'}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className='card-theme shadow-xl rounded-md p-6 h-max'>
          <h2 className='text-lg font-semibold mb-4 text-theme-primary'>Order Summary</h2>
          <div className='space-y-2 max-h-64 overflow-auto pr-2 mb-3'>
            {cartItem.map((i, idx) => (
              <div key={idx} className='flex justify-between items-center text-sm border-b border-theme pb-2'>
                <div className='flex-1'>
                  <p className='line-clamp-1 text-theme-secondary'>{i.title}</p>
                  <p className='text-xs text-theme-tertiary'>Item {idx + 1}</p>
                </div>
                <p className='font-semibold ml-2 text-theme-primary'>${(i.price * (i.quantity || 1)).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <hr className='my-3 border-theme'/>
          <div className='flex justify-between text-sm text-theme-secondary'><span>Items</span><span>${itemsTotal.toFixed(2)}</span></div>
          <div className='flex justify-between text-sm text-theme-secondary'><span>Handling</span><span>${handling.toFixed(2)}</span></div>
          <div className='flex justify-between font-semibold text-lg mt-2 text-theme-primary'><span>Total</span><span className='text-[#F85606]'>${grandTotal.toFixed(2)}</span></div>
          <button 
            onClick={() => setShowPayment(true)} 
            className='btn-primary px-4 py-2 rounded-md w-full cursor-pointer mt-6 font-semibold transition-all'
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout


