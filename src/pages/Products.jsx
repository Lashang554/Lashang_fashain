import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from "../assets/Loading4.webm"
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Lottie from 'lottie-react'
import notfound from "../assets/notfound.json"
import MobileFilter from '../components/MobileFilter'

const Products = () => {
  const contextData = useData()

  const { data, fetchAllProducts, loading, error } = contextData || {}

  const [search, setSearch] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const hasInitializedPriceRef = useRef(false)
  const [sortBy, setSortBy] = useState("default")
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)

  // Calculate max price from data or use default
  const maxPrice = data && Array.isArray(data) && data.length > 0
    ? Math.max(...data.map(item => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      return price;
    }))
    : 5000;

  // Initialize price range only once on first data load
  useEffect(() => {
    if (!hasInitializedPriceRef.current && data && Array.isArray(data) && data.length > 0) {
      hasInitializedPriceRef.current = true
      console.log("Price range initialized:", priceRange)
    }
  }, [data, priceRange])

  // Initialize search from URL query param `q`
  useEffect(() => {
    const q = searchParams.get('q') || ""
    setSearch(q)
  }, [searchParams])

  useEffect(() => {
    console.log("Products page mounted, fetching products...");
    if (fetchAllProducts) {
      fetchAllProducts()
    } else {
      console.error("fetchAllProducts is not available!");
    }
    window.scrollTo(0, 0)
  }, [fetchAllProducts])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
    // Clear search term and URL param when user picks a category
    setSearch("")
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
    // Clear search term and URL param when user picks a brand
    setSearch("")
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0)
  }

  const filteredData = data && Array.isArray(data) ? data.filter((item) => {
    if (!item || !item.title) {
      console.warn("Invalid item in filter:", item);
      return false;
    }
    const s = (search || "").toLowerCase();
    const title = (item.title || "").toLowerCase();
    const categoryValue = (item.category || "").toLowerCase();
    const brandValue = (item.brand || "").toLowerCase();
    const matchesSearch = s === "" || title.includes(s) || categoryValue.includes(s) || brandValue.includes(s);
    const matchesCategory = category === "All" || item.category === category;
    const matchesBrand = brand === "All" || item.brand === brand;

    const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    const matchesPrice = itemPrice >= priceRange[0] && itemPrice <= priceRange[1];

    const passesFilter = matchesSearch && matchesCategory && matchesBrand && matchesPrice;

    if (data.length > 0 && item === data[0]) {
      console.log("First product filter check:", {
        title: item.title,
        category: item.category,
        brand: item.brand,
        price: item.price,
        priceType: typeof item.price,
        itemPrice,
        priceRange,
        matchesSearch,
        matchesCategory,
        matchesBrand,
        matchesPrice,
        passesFilter
      });
    }

    return passesFilter;
  }) : [];

  const sortedData = [...filteredData].sort((a, b) => {
    const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
    const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;

    if (sortBy === "lowToHigh") {
      return priceA - priceB;
    } else if (sortBy === "highToLow") {
      return priceB - priceA;
    }
    return 0;
  });

  const dynamicPage = sortedData.length > 0 ? Math.ceil(sortedData.length / 8) : 1

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  }

  useEffect(() => {
    console.log("Products component state:", {
      dataLength: data?.length || 0,
      loading,
      error,
      hasData: !!data,
      isArray: Array.isArray(data),
      filteredLength: filteredData.length
    });
    if (data && data.length > 0) {
      console.log("Products data loaded:", data.length, "products");
      console.log("Sample product:", data[0]);
    } else if (!loading && data && data.length === 0) {
      console.warn("No products in data array!");
    }
  }, [data, loading, error, filteredData.length]);

  if (!contextData) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-xl text-red-600 mb-4'>Error: DataContext not available</p>
          <p>Please refresh the page.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
          maxPrice={maxPrice}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />

        {loading ? (
          <div className='flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        ) : error ? (
          <div className='flex items-center justify-center h-[400px]'>
            <div className='text-center'>
              <p className='text-xl text-[#F85606] mb-4'>Error: {error}</p>
              <button onClick={fetchAllProducts} className='bg-[#F85606] hover:bg-[#d94d05] text-white px-4 py-2 rounded-md'>
                Retry
              </button>
            </div>
          </div>
        ) : data && Array.isArray(data) && data.length > 0 ? (
          <>
            <div className='flex gap-8'>
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
                maxPrice={maxPrice}
                sortBy={sortBy}
                handleSortChange={handleSortChange}
              />

              {sortedData && sortedData.length > 0 ? (
                <div className='flex flex-col justify-center items-center'>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10'>
                    {sortedData.slice(page * 8 - 8, page * 8).map((product, index) => {
                      if (!product || !product.id) {
                        console.warn("Invalid product at index:", index, product);
                        return null;
                      }
                      return <ProductCard key={product.id || index} product={product} />
                    })}
                  </div>
                  <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                </div>
              ) : (
                <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                  <div className='text-center'>
                    <Lottie animationData={notfound} classID='w-[500px]' />
                    <p className='mt-4 text-gray-600'>No products match your filters</p>
                    <p className='text-sm text-gray-500 mt-2'>Data length: {data?.length || 0}, Filtered: {filteredData?.length || 0}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center h-[400px]'>
            <div className='text-center'>
              <p className='text-xl text-gray-600 mb-4'>No products found</p>
              <button onClick={fetchAllProducts} className='bg-[#F85606] hover:bg-[#d94d05] text-white px-4 py-2 rounded-md'>
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
