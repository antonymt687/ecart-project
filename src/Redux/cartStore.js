import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./Slice/productSlice";
import  wishListSlice  from "./Slice/wishlistSlice";
import  cartSlice  from "./Slice/cartSlice";

  const cartStore= configureStore({
    reducer:{
      productReducer:productSlice,
      wishListReducer:wishListSlice,
      cartReducer:cartSlice
    }
  })

  export default cartStore