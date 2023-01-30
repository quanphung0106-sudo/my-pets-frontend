import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    totalPriceOfAllProducts: 0,
    totalData: 0,
    isFetching: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.totalPriceOfAllProducts += action.payload.price * action.payload.quantity;
      state.totalData += 1;
    },
    fetchData: (state) => {
      state.isFetching = true;
    },
    deleteItem: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.totalPriceOfAllProducts = action.payload.totalPriceOfAllProducts;
      state.totalData = action.payload.totalData;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPriceOfAllProducts = 0;
      state.totalData = 0;
    },
  },
});

export const { addProduct, fetchData, deleteItem, reset } = cartSlice.actions;
export default cartSlice.reducer;
