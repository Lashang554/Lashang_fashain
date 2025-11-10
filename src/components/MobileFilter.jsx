import React, { useMemo } from 'react'
import { FaFilter } from 'react-icons/fa6'
import { useGetAllProductsQuery } from '../services/productApi'
import { useNavigate } from 'react-router-dom'


const MobileFilter = ({ openFilter, setOpenFilter, search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategory, handleBrandChange, handleCategoryChange, maxPrice = 5000, sortBy, handleSortChange }) => {
    const { data: products = [] } = useGetAllProductsQuery()
    const navigate = useNavigate()

    // Get unique categories
    const categoryOnlyData = useMemo(() => {
      const categories = products
        ?.map((item) => item?.category)
        .filter((val) => val != null && val !== '')
      return ['All', ...new Set(categories)]
    }, [products])

    // Get unique brands
    const brandOnlyData = useMemo(() => {
      const brands = products
        ?.map((item) => item?.brand)
        .filter((val) => val != null && val !== '')
      return ['All', ...new Set(brands)]
    }, [products])

    const toggleFilter = ()=>{
        setOpenFilter(!openFilter)
    }
    return (
        <>
            <div className='bg-surface flex justify-between items-center md:hidden px-4 p-2 mt-5'>
                <h1 className='font-semibold text-xl text-theme-primary'>Filters</h1>
                <FaFilter onClick={toggleFilter} className='text-theme-primary' />
            </div>
            {
                openFilter ? <div className='bg-surface p-2 md:hidden'>
                    <input type="text"
                        placeholder='Search..'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='input-theme p-2 rounded-md border-2 w-full'
                    />
                    {/* category only data */}
                    <h1 className='mt-5 font-semibold text-xl text-theme-primary'>Category</h1>
                    <div className='flex flex-col gap-2 mt-3'>
                        {
                            categoryOnlyData?.map((item, index) => {
                                return <div key={index} className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        name={item} 
                                        checked={category === item} 
                                        value={item} 
                                        onChange={(e) => {
                                            const selectedCategory = e.target.value
                                            if (selectedCategory === 'All') {
                                                handleCategoryChange(e)
                                            } else {
                                                navigate(`/products/category/${selectedCategory}`)
                                            }
                                        }} 
                                    />
                                    <button className='cursor-pointer uppercase'>{item}</button>
                                </div>
                            })
                        }
                    </div>
                    {/* brand only data */}
                    <h1 className='mt-5 font-semibold text-xl mb-3 text-theme-primary'>Brand</h1>
                    <select name="" id=""
                        className='input-theme w-full p-2 border-2 rounded-md '
                        value={brand}
                        onChange={(e) => {
                            const selectedBrand = e.target.value
                            if (selectedBrand === 'All') {
                                handleBrandChange(e)
                            } else {
                                navigate(`/products/brand/${selectedBrand}`)
                            }
                        }}
                    >
                        {
                            brandOnlyData?.map((item, index) => {
                                return <option key={index} value={item}>{item.toUpperCase()}</option>
                            })
                        }
                    </select>
                    {/* Sort by Price  */}
                    <h1 className='mt-5 font-semibold text-xl mb-3 text-theme-primary'>Sort By Price</h1>
                    <select 
                      name="sortBy" 
                      id="mobileSortBy"
                      className='input-theme w-full p-2 border-2 rounded-md mb-3' 
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="default">Default</option>
                      <option value="lowToHigh">Low to High</option>
                      <option value="highToLow">High to Low</option>
                    </select>

                    
                    <button className='bg-[#F85606] hover:bg-[#d94d05] text-white rounded-md px-3 py-1 mt-5 cursor-pointer'
                        onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0, maxPrice]); setOpenFilter(false); handleSortChange({target: {value: 'default'}}) }}
                    >Reset Filters</button>
                </div> : null
            }
        </>
    )
}

export default MobileFilter
