import React, { useMemo } from 'react'
import { useGetAllProductsQuery } from '../services/productApi'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const { data: products = [] } = useGetAllProductsQuery()

  const categoryOnlyData = useMemo(() => {
    const categories = products
      ?.map((item) => item?.category)
      .filter((val) => val != null && val !== '')
    return [...new Set(categories)]?.slice(6, 12)
  }, [products])

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-7 px-4">
        <div className="bg-[#fafafa] rounded-2xl shadow-sm p-6 
                        flex flex-wrap gap-4 items-center justify-center md:justify-between">

          {categoryOnlyData?.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(`/category/${item}`)}
              className="uppercase bg-[#F85606] hover:bg-[#d94d05] text-white px-4 py-2 rounded-full cursor-pointer transition-all font-medium tracking-wide"
            >
              {item}
            </button>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Category
