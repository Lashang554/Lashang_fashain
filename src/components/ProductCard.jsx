import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({product}) => {
    const navigate = useNavigate()
    const {addToCart, cartItem} = useCart()

       console.log(cartItem)
    
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
      {product.discount > 0 && (
        <span className='absolute top-2 left-2 bg-[#F85606] text-white text-xs font-semibold px-2 py-1 rounded-md'>
          {product.discount}% OFF
        </span>
      )}
      <img src={product.image} alt="" className='bg-gray-100 aspect-square' onClick={()=>navigate(`/products/${product.id}`)}/>
      <h1 className='line-clamp-2 p-1 font-semibold'>{product.title}</h1>
      <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
      <button onClick={()=>addToCart(product)} className='bg-[#F85606] hover:bg-[#d94d05] px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6' /> Add to Cart</button>
    </div>
  )
}

export default ProductCard
