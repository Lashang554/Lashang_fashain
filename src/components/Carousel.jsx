import React from 'react'
import { useGetAllProductsQuery } from '../services/productApi'
import { useNavigate } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';

const Carousel = () => {
    const { data: products = [], isLoading: loading } = useGetAllProductsQuery()
    const navigate = useNavigate()

    const SamplePrevArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
                <AiOutlineArrowLeft className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#F85606" , color:"white" , position:"absolute", padding:"2px", left:"50px"}} />
            </div>
        )
    }
    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#F85606" , color:"white" , position:"absolute", padding:"2px", right:"50px"}} />
            </div>
        )
    }

    var settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed:2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover:false,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    // Show loading state or empty state
    if (loading) {
        return (
            <div className="bg-[#F85606] h-[600px] flex items-center justify-center">
              <div className="text-white text-xl font-semibold animate-pulse">
                Loading products...
              </div>
            </div>
          );
          
    }

    // Show message if no data
    if (!products || products.length === 0) {
        return (
            <div className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] h-[600px] flex items-center justify-center'>
                <div className='text-white text-xl'>No products available</div>
            </div>
        );
    }

    return (
        
            <div className="bg-[#f4f4f4]">
              <Slider {...settings}>
                {products?.slice(0, 7)?.map((item, index) => (
                  <div key={index} className="bg-white">
                    <div className="flex flex-col md:flex-row gap-10 justify-center h-[550px] md:my-0 items-center px-4">
                      
                      {/* TEXT SIDE */}
                      <div className="md:space-y-6 space-y-3">
                        <h3 className="text-[#F85606] font-semibold text-sm uppercase tracking-wide">
                          Best Deals Just for You
                        </h3>
          
                        <h1 className="md:text-4xl text-2xl font-bold md:w-[480px] text-black">
                          {item.title}
                        </h1>
          
                        <p className="md:w-[480px] text-gray-600 leading-6">
                          {item.description}
                        </p>
          
                        <button
                          onClick={() => navigate(`/products/${item.id}`)}
                          className="bg-[#F85606] hover:bg-[#d94d05] text-white px-5 py-2 rounded-md transition-all mt-2 font-medium tracking-wide"
                        >
                          Shop Now
                        </button>
                      </div>
          
                      {/* IMAGE SIDE */}
                      <div>
                        <img
                          src={item.image}
                          alt={item.title}
                          onClick={() => navigate(`/products/${item.id}`)}
                          className="rounded-full w-[430px] md:w-[500px] hover:scale-105 transition-all cursor-pointer shadow-[0_4px_20px_rgba(248,86,6,0.35)]"
                        />
                      </div>
          
                    </div>
                  </div>
                ))}
              </Slider>
          
              <Category />
            </div>
          )
          
}

export default Carousel
