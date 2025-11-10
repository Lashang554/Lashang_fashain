import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../assets/Loading4.webm";
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import { useGetProductByIdQuery } from '../services/productApi';

const SingleProduct = () => {
  const params = useParams();
  const { data: SingleProduct, isLoading } = useGetProductByIdQuery(params.id);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <video muted autoPlay loop>
          <source src={Loading} type='video/webm' />
        </video>
      </div>
    );
  }

  if (!SingleProduct) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-xl text-red-600 mb-4'>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4 pb-4 md:px-0'>
      <Breadcrums title={SingleProduct.title} />
      <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='w-full'>
          <img
            src={SingleProduct.image}
            alt={SingleProduct.title}
            className='rounded-2xl w-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-6'>
          <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{SingleProduct.title}</h1>
          <div className='text-gray-700'>
            {SingleProduct.brand?.toUpperCase()} /
            {SingleProduct.category?.toUpperCase()} /
            {SingleProduct.model}
          </div>
          <p className='text-xl text-[#F85606] font-bold'>
            ${SingleProduct.price}
            <span className='line-through text-gray-700 ml-2'>
              ${Math.round(SingleProduct.price + (SingleProduct.price * SingleProduct.discount / 100))}
            </span>
            <span className='bg-[#F85606] text-white px-4 py-2 rounded-full ml-2'>
              {SingleProduct.discount}% discount
            </span>
          </p>
          <p className='text-gray-600'>{SingleProduct.description}</p>

          <div className='flex items-center gap-4'>
            <label className='text-sm font-medium text-gray-700'>Quantity:</label>
            <input
              type="number"
              min={1}
              value={1}
              className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#F85606]'
            />
          </div>

          <div className='flex gap-4 mt-4'>
            <button
              onClick={() => addToCart(SingleProduct)}
              className='px-6 flex gap-2 py-2 text-lg bg-[#F85606] hover:bg-[#d94d05] text-white rounded-md'
            >
              <IoCartOutline className='w-6 h-6' /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
