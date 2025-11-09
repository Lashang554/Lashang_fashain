import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const params = useParams()
  const category = params.category
  const navigate = useNavigate()

  const getFilterData = useCallback(async ()=>{
    try {
      // Transform dummyjson product to match app's expected format
      const transformProduct = (product) => {
        return {
          ...product,
          discount: product.discountPercentage ? Math.round(product.discountPercentage) : 0,
          image: product.images?.[0] || product.thumbnail || product.image || '',
        };
      };

      const baseURL =
      import.meta.env.MODE === "development"
        ? "/api"
        : "https://dummyjson.com";
    
    const res = await axios.get(`${baseURL}/products/category/${category}`);
          const productsData = res.data?.products || res.data || [];
      // Transform products to match app's expected format
      const transformedProducts = Array.isArray(productsData) 
        ? productsData.map(transformProduct)
        : [];
      setSearchData(transformedProducts)

    } catch (error) {
      console.log(error);
      setSearchData([]);
    }
  }, [category])

  useEffect(()=>{
    getFilterData()
    window.scrollTo(0,0)
  },[getFilterData])
  
  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
             <button onClick={()=>navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             {
              searchData.map((product, index) =>{
                return <ProductListView key={index} product={product}/>
              })
             }
          </div>
        ):(
          <div className='flex items-center justify-center h-[400px]'>
             <video muted autoPlay loop>
              <source src={Loading} type='video/webm'/>
             </video>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct
