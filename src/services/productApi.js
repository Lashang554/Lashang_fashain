import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

// Transform products array
const transformProducts = (products) => {
  if (!Array.isArray(products)) return [];
  return products.map(transformProduct);
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    // All products with pagination
    getProduct: builder.query({
      query: ({ page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit
        return `products/?limit=${limit}&skip=${skip}`
      },
      transformResponse: (response) => {
        if (response?.products) {
          return {
            ...response,
            products: transformProducts(response.products)
          };
        }
        return response;
      },
    }),
    
    // All products (for filtering, used in Products page)
    getAllProducts: builder.query({
      query: () => `products?limit=150`,
      transformResponse: (response) => {
        if (response?.products) {
          return transformProducts(response.products);
        }
        if (Array.isArray(response)) {
          return transformProducts(response);
        }
        return [];
      },
    }),

    // Category filter with pagination
    getProductByCategory: builder.query({
      query: ({ category, page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit
        return `products/category/${category}?limit=${limit}&skip=${skip}`
      },
      transformResponse: (response) => {
        if (response?.products) {
          return {
            ...response,
            products: transformProducts(response.products)
          };
        }
        return response;
      },
    }),

    // Get single product by ID
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      transformResponse: (response) => {
        return transformProduct(response);
      },
    }),

    // Add product
    postProduct: builder.mutation({
      query: (formData) => ({
        url: `products/add`,
        method: 'POST',
        body: formData
      }),
    }),
  }),
})

export const { 
  useGetProductQuery, 
  useGetAllProductsQuery,
  useGetProductByIdQuery, 
  useGetProductByCategoryQuery, 
  usePostProductMutation 
} = productApi

