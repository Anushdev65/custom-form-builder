import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apiSlice/auth";
import { formFieldsApi } from "../apiSlice/formFields";
import authReducer from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [formFieldsApi.reducerPath]: formFieldsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      formFieldsApi.middleware,
    ]),
});

export default store;
