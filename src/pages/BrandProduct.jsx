import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import ProductCard from '../components/ProductCard'
import FilterSection from '../components/FilterSection'
import { useGetAllProductsQuery } from '../services/productApi'
import { MdViewList, MdViewModule } from 'react-icons/md'

const BrandProduct = () => {
  const params = useParams()
  const brand = params.brand
  const navigate = useNavigate()
  const { data: products = [], isLoading } = useGetAllProductsQuery()
  const [viewMode, setViewMode] = useState("grid") // "grid" or "list"
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState(brand)
  const [sortBy, setSortBy] = useState("default")
  const [priceRange, setPriceRange] = useState([0, 5000])
  
  // Filter products by brand
  const searchData = useMemo(() => {
    if (!brand || !products || !Array.isArray(products)) return []
    return products.filter(product => 
      product.brand && product.brand.toLowerCase() === brand.toLowerCase()
    )
  }, [products, brand])
  
  // Calculate max price
  const maxPrice = useMemo(() => {
    if (searchData && Array.isArray(searchData) && searchData.length > 0) {
      return Math.max(...searchData.map(item => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        return price;
      }))
    }
    return 5000;
  }, [searchData])
  
  // Filter and sort products
  const filteredData = useMemo(() => {
    if (!searchData || !Array.isArray(searchData)) return []
    
    let filtered = searchData.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0
      const matchesPrice = itemPrice >= priceRange[0] && itemPrice <= priceRange[1]
      return matchesCategory && matchesPrice
    })
    
    // Sort
    if (sortBy !== "default") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0
        if (sortBy === "lowToHigh") {
          return priceA - priceB
        } else if (sortBy === "highToLow") {
          return priceB - priceA
        }
        return 0
      })
    }
    
    return filtered
  }, [searchData, selectedCategory, priceRange, sortBy])
  
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    if (newCategory === 'All') {
      navigate('/products')
    } else {
      navigate(`/products/category/${newCategory}`)
    }
  }
  
  const handleBrandChange = (e) => {
    const newBrand = e.target.value
    if (newBrand === 'All') {
      navigate('/products')
    } else {
      navigate(`/products/brand/${newBrand}`)
    }
  }
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedBrand(brand)
  }, [brand])
  
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
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4 bg-theme min-h-screen py-5'>
             <div className='flex justify-between items-center mb-5'>
               <button onClick={()=>navigate('/products')} className='bg-surface text-theme-primary px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center hover:bg-surface-hover'><ChevronLeft/> Back</button>
               {/* View Toggle Buttons */}
               <div className='flex items-center gap-2'>
                 <button
                   onClick={() => setViewMode("grid")}
                   className={`p-2 rounded-md transition-all ${
                     viewMode === "grid"
                       ? "bg-[#F85606] text-white"
                       : "bg-surface text-theme-primary hover:bg-surface-hover"
                   }`}
                   aria-label="Grid view"
                 >
                   <MdViewModule className="w-5 h-5" />
                 </button>
                 <button
                   onClick={() => setViewMode("list")}
                   className={`p-2 rounded-md transition-all ${
                     viewMode === "list"
                       ? "bg-[#F85606] text-white"
                       : "bg-surface text-theme-primary hover:bg-surface-hover"
                   }`}
                   aria-label="List view"
                 >
                   <MdViewList className="w-5 h-5" />
                 </button>
               </div>
             </div>
             
             <div className='flex gap-8'>
               {/* Filter Section */}
               <FilterSection
                 search=""
                 setSearch={() => {}}
                 brand={selectedBrand}
                 setBrand={setSelectedBrand}
                 priceRange={priceRange}
                 setPriceRange={setPriceRange}
                 category={selectedCategory}
                 setCategory={setSelectedCategory}
                 handleCategoryChange={handleCategoryChange}
                 handleBrandChange={handleBrandChange}
                 maxPrice={maxPrice}
                 sortBy={sortBy}
                 handleSortChange={handleSortChange}
               />
               
               {/* Products Display */}
               {filteredData.length > 0 ? (
                 <div className='flex flex-col w-full'>
                   {viewMode === "grid" ? (
                     <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7'>
                       {filteredData.map((product, index) => {
                         return <ProductCard key={product.id || index} product={product} />
                       })}
                     </div>
                   ) : (
                     <div className='w-full space-y-4'>
                       {filteredData.map((product, index) => {
                         return <ProductListView key={product.id || index} product={product} />
                       })}
                     </div>
                   )}
                 </div>
               ) : (
                 <div className='flex justify-center items-center w-full h-[400px]'>
                   <p className='text-theme-secondary'>No products match your filters</p>
                 </div>
               )}
             </div>
          </div>
        ):(
          <div className='flex items-center justify-center h-[400px]'>
            <div className='text-center'>
              <p className='text-xl text-theme-secondary'>No products found for this brand</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default BrandProduct

