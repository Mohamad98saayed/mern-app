import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//create product slice
export const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    isLoading: false,
    error: false,
    errorMessage: "",
  },

  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },

    getProducts: (state, { payload }) => {
      state.data = payload;
    },

    getOneProduct: (state, { payload }) => {
      state.data = payload;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

//USER: get all products
export const getProductsAsync = () => (dispatchEvent) => {
  dispatchEvent(setLoading());

  axios
    .get("/api/v1/products")
    .then(({ data }) => dispatchEvent(getProducts(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: get one product
export const getOneProductsAsync = (id) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  axios
    .get(`/api/v1/products/${id}`)
    .then(({ data }) => dispatchEvent(getOneProduct(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

export const { setLoading, getProducts, getOneProduct, setError } =
  productSlice.actions;

export default productSlice.reducer;
