import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "../features/authApiSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const shouldSkipAuth = extraOptions?.skipAuth || false;

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 900) {
    window.location.reload();
  }

  if (!shouldSkipAuth && result.error && result.error.status === 401) {
    const refreshResult = await api.dispatch(
      authApiSlice.endpoints.refreshToken.initiate()
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await api.dispatch(authApiSlice.endpoints.logout.initiate());
      window.location.href = "/login"; // Redirect to login page without using hooks
    }
  }

  return result;
};

export { baseQueryWithReauth as baseQuery };
