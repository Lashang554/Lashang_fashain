// src/context/DataContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Transform dummyjson product to match app's expected format
  const transformProduct = (product) => {
    return {
      ...product,
      // Map discountPercentage to discount
      discount: product.discountPercentage ? Math.round(product.discountPercentage) : 0,
      // Map images array or thumbnail to image
      image: product.images?.[0] || product.thumbnail || product.image || '',
    };
  };

  // Fetch all products from API
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching products from API...");
      const baseURL =
        import.meta.env.MODE === "development"
          ? "/api"
          : "https://dummyjson.com";

      const res = await axios.get(`${baseURL}/products?limit=150`);
      console.log("API Response:", res.data);
      console.log("Response structure:", {
        hasProducts: !!res.data?.products,
        isArray: Array.isArray(res.data),
        dataType: typeof res.data,
        keys: Object.keys(res.data || {})
      });

      const productsData = res.data?.products || (Array.isArray(res.data) ? res.data : []);
      console.log("Products data extracted:", productsData.length, "items");

      // Transform products to match app's expected format
      const transformedProducts = Array.isArray(productsData)
        ? productsData.map(transformProduct)
        : [];

      console.log("Transformed products:", transformedProducts.length);
      if (transformedProducts.length > 0) {
        console.log("First product:", transformedProducts[0]);
      }

      // Force update state - ensure it's not empty if we have data
      if (transformedProducts.length > 0) {
        setData(transformedProducts);
        console.log("✅ Products set successfully:", transformedProducts.length);
      } else {
        console.warn("⚠️ Warning: No products found after transformation!");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      setError(error.message || "Failed to fetch products");
      // Set empty array on error to prevent app crashes
      setData([]);
    } finally {
      setLoading(false);
      // Note: data.length here might be 0 due to React state batching, but products were set successfully above
      console.log("Fetch complete. Loading:", false);
    }
  }, []);

  // Get unique values for a property (category or brand)
  const getUniqueCategory = (data, property) => {
    const values = data?.map((item) => item?.[property]).filter(val => val != null && val !== undefined && val !== '');
    return ["All", ...new Set(values)];
  };

  const categoryOnlyData = data && Array.isArray(data) && data.length > 0 ? getUniqueCategory(data, "category") : ["All"];
  const brandOnlyData = data && Array.isArray(data) && data.length > 0 ? getUniqueCategory(data, "brand") : ["All"];

  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to access DataContext (keeps your original getData naming)
export const getData = () => useContext(DataContext);
