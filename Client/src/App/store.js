import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "../features/authApiSlice";
import { storeApiSlice } from "../features/storeApiSlice";
export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [storeApiSlice.reducerPath]: storeApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      storeApiSlice.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
