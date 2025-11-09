import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"

const Cart = ({location, saveManualLocation}) => {
  const { cartItem , updateQuantity, deleteItem} = useCart()
  const {user} = useUser()
  const navigate = useNavigate()
  
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

  const totalQuantity = cartItem.reduce((total, item) => total + (item.quantity || 1), 0)
  const totalPrice = cartItem.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
  const handling = 5
  const grandTotal = totalPrice + handling

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {
        cartItem.length > 0 ? <div>
          <h1 className='font-bold text-2xl'>My Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})</h1>
          <div>
            <div className='mt-10'>
              {cartItem.map((item, index) => {
                const itemTotal = item.price * (item.quantity || 1)
                return <div key={index} className='bg-gray-100 p-5 rounded-md flex flex-col md:flex-row items-center justify-between gap-4 mt-3 w-full'>
                  <div className='flex items-center gap-4 flex-1'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md object-cover' />
                    <div className='flex-1'>
                      <h1 className='md:w-[300px] line-clamp-2 font-medium'>{item.title}</h1>
                      <p className='text-[#F85606] font-semibold text-lg mt-1'>${item.price}</p>
                      <p className='text-sm text-gray-600 mt-1'>Subtotal: <span className='font-semibold'>${itemTotal.toFixed(2)}</span></p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='bg-[#F85606] hover:bg-[#d94d05] text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                      <button onClick={()=>updateQuantity(cartItem, item.id, "decrease")} className='cursor-pointer hover:scale-110 transition-transform'>-</button>
                      <span className='min-w-[30px] text-center'>{item.quantity || 1}</span>
                      <button onClick={()=>updateQuantity(cartItem, item.id, "increase")} className='cursor-pointer hover:scale-110 transition-transform'>+</button>
                    </div>
                    <span onClick={()=>deleteItem(item.id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl cursor-pointer'>
                      <FaRegTrashAlt className='text-[#F85606] text-2xl' />
                    </span>
                  </div>
                </div>
              })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-3'>
                <h1 className='text-gray-800 font-bold text-xl mb-4'>Delivery Info</h1>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="deliveryName" className='text-gray-700 font-medium'>Full Name</label>
                  <input 
                    id="deliveryName"
                    type="text" 
                    placeholder='Enter your name' 
                    className='p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F85606]' 
                    value={deliveryInfo.fullName}
                    onChange={(e) => setDeliveryInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="deliveryAddress" className='text-gray-700 font-medium'>Address</label>
                  <input 
                    id="deliveryAddress"
                    type="text" 
                    placeholder='Enter your address' 
                    className='p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F85606]' 
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="deliveryState" className='text-gray-700 font-medium'>State</label>
                    <input 
                      id="deliveryState"
                      type="text" 
                      placeholder='Enter your state' 
                      className='p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F85606]' 
                      value={deliveryInfo.state}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="deliveryCountry" className='text-gray-700 font-medium'>Country</label>
                    <input 
                      id="deliveryCountry"
                      type="text" 
                      placeholder='Enter your country' 
                      className='p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F85606]' 
                      value={deliveryInfo.country}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="deliveryPhone" className='text-gray-700 font-medium'>Phone No</label>
                    <input 
                      id="deliveryPhone"
                      type="text" 
                      placeholder='Enter your Number' 
                      className='p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F85606]' 
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const locationToSave = {
                      county: deliveryInfo.address,
                      state: deliveryInfo.state,
                      country: deliveryInfo.country,
                      fullName: deliveryInfo.fullName,
                      phone: deliveryInfo.phone
                    }
                    saveManualLocation(locationToSave)
                  }}
                  className='bg-[#F85606] hover:bg-[#d94d05] text-white px-4 py-2 rounded-md transition-all font-medium w-full mt-4'
                >
                  Save Location
                </button>
              </div>
              <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-3 h-max'>
                <h1 className='text-gray-800 font-bold text-xl mb-4'>Bill Details</h1>
                
                {/* Item Breakdown */}
                <div className='space-y-2 max-h-48 overflow-auto pr-2 mb-3'>
                  {cartItem.map((item, idx) => (
                    <div key={idx} className='flex justify-between items-center text-sm border-b border-gray-100 pb-2'>
                      <div className='flex-1'>
                        <p className='line-clamp-1 text-gray-700'>{item.title}</p>
                        <p className='text-xs text-gray-500'>Item {idx + 1}</p>
                      </div>
                      <p className='font-semibold ml-2'>${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className='flex justify-between items-center pt-2'>
                  <h1 className='flex gap-2 items-center text-gray-700'><LuNotebookText className='text-lg' />Items total</h1>
                  <p className='font-semibold'>${totalPrice.toFixed(2)}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-2 items-center text-gray-700'><MdDeliveryDining className='text-lg' />Delivery Charge</h1>
                  <p className='text-[#F85606] font-semibold'><span className='text-gray-600 line-through mr-2'>$25</span> FREE</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-2 items-center text-gray-700'><GiShoppingBag className='text-lg' />Handling Charge</h1>
                  <p className='text-[#F85606] font-semibold'>${handling.toFixed(2)}</p>
                </div>
                <hr className='text-gray-200 my-3'/>
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-lg text-gray-800'>Grand Total</h1>
                  <p className='font-semibold text-lg text-[#F85606]'>${grandTotal.toFixed(2)}</p>
                </div>
                <div className='mt-6'>
                  <h1 className='font-semibold text-gray-700 mb-3'>Apply Promo Code</h1>
                  <div className='flex gap-3'>
                    <input type="text" placeholder='Enter code' className='p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F85606]'/>
                    <button className='bg-white text-black border border-gray-300 hover:bg-gray-50 px-4 cursor-pointer py-2 rounded-md transition-all whitespace-nowrap'>Apply</button>
                  </div>
                </div>
                <button onClick={()=>navigate('/checkout')} className='bg-[#F85606] hover:bg-[#d94d05] text-white px-3 py-2 rounded-md w-full cursor-pointer mt-4 font-semibold transition-all'>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div> : <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-[#F85606]/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="" className='w-[400px]'/>
          <button onClick={()=>navigate('/products')} className='bg-[#F85606] hover:bg-[#d94d05] text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
        </div>
      }
    </div>
  )
}

export default Cart
