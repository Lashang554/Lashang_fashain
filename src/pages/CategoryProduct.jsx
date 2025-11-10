import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import { useGetProductByCategoryQuery } from '../services/productApi'

const CategoryProduct = () => {
  const params = useParams()
  const category = params.category
  const navigate = useNavigate()
  const { data: response, isLoading } = useGetProductByCategoryQuery({ category, page: 1, limit: 100 })
  
  const searchData = response?.products || []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])
  
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[400px]'>
        <video muted autoPlay loop>
          <source src={Loading} type='video/webm'/>
        </video>
      </div>
    )
  }

  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
             <button onClick={()=>navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             {
              searchData.map((product, index) =>{
                return <ProductListView key={product.id || index} product={product}/>
              })
             }
          </div>
        ):(
          <div className='flex items-center justify-center h-[400px]'>
            <div className='text-center'>
              <p className='text-xl text-gray-600'>No products found in this category</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct
