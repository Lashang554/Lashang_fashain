import React from 'react'
import { getData } from '../context/DataContext'

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
  maxPrice = 5000,
  sortBy,
  handleSortChange
}) => {
  const { categoryOnlyData, brandOnlyData } = getData()

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 hidden md:block w-64">
    

      {/* Category Filter */}
      <h1 className="mt-6 font-semibold text-lg text-gray-800">Category</h1>
      <div className="flex flex-col gap-3 mt-2">
        {categoryOnlyData
          ?.filter((item) => item != null)
          .map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-[#F85606] transition-all">
              <input
                type="checkbox"
                name={item}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
                className="accent-[#F85606] w-4 h-4"
              />
              <span className="uppercase text-gray-700">{item}</span>
            </label>
          ))}
      </div>

      {/* Brand Filter */}
      <h1 className="mt-6 font-semibold text-lg text-gray-800">Brand</h1>
      <select
        value={brand}
        onChange={handleBrandChange}
        className="bg-gray-100 w-full p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#F85606]"
      >
        {brandOnlyData
          ?.filter((item) => item != null)
          .map((item, index) => (
            <option key={index} value={item}>
              {item.toString().toUpperCase()}
            </option>
          ))}
      </select>

      {/* Sort by Price */}
      <h1 className="mt-6 font-semibold text-lg text-gray-800">Sort By Price</h1>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="bg-gray-100 w-full p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#F85606]"
      >
        <option value="default">Default</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>

      {/* Reset Button */}
      <button
        className="bg-[#F85606] hover:bg-[#d94d05] text-white w-full py-2 mt-6 rounded-lg font-medium transition-all"
        onClick={() => {
          setSearch('')
          setCategory('All')
          setBrand('All')
          setPriceRange([0, maxPrice])
          handleSortChange({ target: { value: 'default' } })
        }}
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterSection
