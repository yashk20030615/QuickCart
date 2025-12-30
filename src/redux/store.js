import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import ProductReducer from "./ProductSlice";

const store = configureStore({
  reducer: {
    CartReducer: CartReducer,
    ProductReducer: ProductReducer,
  },
});

export default store;
