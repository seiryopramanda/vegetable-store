import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface ProductsResponse extends BaseResponse {
  data: {
    total: number;
    data: Product[];
  };
}

interface ProductResponse extends BaseResponse {
  data: Product;
}

interface ProductApiParams {
  page?: string | undefined;
  category?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  rating?: string | undefined;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, ProductApiParams>({
      query: ({ page, category, minPrice, maxPrice, rating }) => ({
        url: "/",
        params: {
          page: page || undefined,
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          rating: rating || undefined,
        },
      }),
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
