import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducer/cartReducer";
import faqReducer from "../reducer/faqReducer";
import shoopingReducer from "../reducer/shoopingReducer";
import userReducer from "../reducer/userReducer";

export const store = configureStore({
  reducer: {
    shopping: shoopingReducer,
    user: userReducer,
    cart: cartReducer,
    faq: faqReducer,
  },
});
