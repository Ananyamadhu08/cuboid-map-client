import axios from "axios";
import { refreshAccessToken, logout } from "../slices/authSlice";

const BE_ENDPOINT = import.meta.env.VITE_BE_ENDPOINT;

const api = axios.create({
  baseURL: BE_ENDPOINT,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupInterceptors = (store: any) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResult = await store
            .dispatch(refreshAccessToken())
            .unwrap();

          if (refreshResult) {
            // Retry the original request with the new access token
            api.defaults.headers.common["Authorization"] =
              `Bearer ${refreshResult}`;
            originalRequest.headers["Authorization"] =
              `Bearer ${refreshResult}`;
            return api(originalRequest);
          } else {
            // If the refresh token has expired or is invalid, log the user out
            store.dispatch(logout());
            window.location.href = "/login";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // Narrowing the type of refreshError
          if (axios.isAxiosError(refreshError)) {
            if (refreshError.response?.status === 403) {
              console.error(
                "Refresh token expired or invalid:",
                refreshError.message,
              );
            } else {
              console.error(
                "Error during refresh token attempt:",
                refreshError.message,
              );
            }
          } else if (refreshError instanceof Error) {
            console.error(
              "Error during refresh token attempt:",
              refreshError.message,
            );
          } else {
            console.error("Unknown error during refresh token attempt");
          }
          store.dispatch(logout());
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else if (error.response.status === 403) {
        // If the token is invalid, log the user out and stop retrying
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};

export default api;
