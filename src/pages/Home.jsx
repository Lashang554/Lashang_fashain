import React, { useMemo } from 'react'
import Carousel from '../components/Carousel'
import { useGetAllProductsQuery } from '../services/productApi'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data: products = [], isLoading: loading } = useGetAllProductsQuery()

  // Get unique categories
  const categoryOnlyData = useMemo(() => {
    const categories = products
      ?.map((item) => item?.category)
      .filter((val) => val != null && val !== '')
    return ['All', ...new Set(categories)]
  }, [products])

  const topCategories = Array.isArray(categoryOnlyData) ? categoryOnlyData.slice(1, 7) : []
  const featured = Array.isArray(products) ? products.slice(0, 8) : []
  const deals = Array.isArray(products) 
    ? [...products].filter(p => (typeof p.discount === 'number' ? p.discount : parseFloat(p.discount) || 0) > 0)
      .sort((a,b) => (b.discount||0) - (a.discount||0))
      .slice(0, 8)
    : []

  return (
    <div className='overflow-x-hidden'>
      <Carousel/>

      

      <MidBanner/>

      {/* Hot Deals */}
      <section className='max-w-7xl mx-auto px-4 mt-12'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl md:text-3xl font-bold'>Hot Deals</h2>
          <Link to='/products' className='text-[#F85606] font-semibold'>View all</Link>        </div>
        {loading ? (
          <div className='h-40 flex items-center justify-center text-gray-600'>Loading...</div>
        ) : deals.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6'>
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className='text-gray-600 mt-6'>No discounted items right now.</div>
        )}
      </section>

      {/* New Arrivals */}
      <section className='max-w-7xl mx-auto px-4 mt-12 mb-12'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl md:text-3xl font-bold'>New Arrivals</h2>
          <Link to='/products' className='text-[#F85606] font-semibold'>View all</Link>
        </div>
        {loading ? (
          <div className='h-40 flex items-center justify-center text-gray-600'>Loading...</div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6'>
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Features/>
    </div>
  )
}

export default Home
