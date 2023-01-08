import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    fetchData: (state) => {
      state.isFetching = true;
    },
    deleteItem: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, fetchData, deleteItem, reset } = cartSlice.actions;
export default cartSlice.reducer;
