import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./reducers/user";
import { productSlice } from "./reducers/products";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productSlice.reducer,
  },
});
