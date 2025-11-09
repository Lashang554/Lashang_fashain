import React from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const { data } = useData()

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property]);
    newVal = [...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(data, "category")?.slice(6, 12);

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
