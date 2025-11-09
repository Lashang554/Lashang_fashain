import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)
  const { cartItem, setCartItem } = useCart()

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      // console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
        // Save to localStorage
        localStorage.setItem('savedLocation', JSON.stringify(exactLocation))
        // console.log(exactLocation);

      } catch (error) {
        console.log(error);

      }

    })
  }

  const saveManualLocation = (manualLocation) => {
    setLocation(manualLocation)
    setOpenDropdown(false)
    // Save to localStorage
    localStorage.setItem('savedLocation', JSON.stringify(manualLocation))
    // Also save delivery info separately
    if (manualLocation.fullName || manualLocation.phone) {
      localStorage.setItem('deliveryInfo', JSON.stringify({
        fullName: manualLocation.fullName || '',
        phone: manualLocation.phone || ''
      }))
    }
  }

  useEffect(() => {
    // Load saved location from localStorage first
    const savedLocation = localStorage.getItem('savedLocation')
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation))
    } else {
      getLocation()
    }
  }, [])

  //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} saveManualLocation={saveManualLocation} />
        </ProtectedRoute>}></Route>
        <Route path='/checkout' element={<ProtectedRoute>
          <Checkout location={location} saveManualLocation={saveManualLocation} />
        </ProtectedRoute>}></Route>
        <Route path='/order-success' element={<OrderSuccess />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
