import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../app/store";
import toast from "react-hot-toast";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
}

interface AuthError {
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  responseObject?: T;
  statusCode: number;
}

const initialAccessToken = localStorage.getItem("accessToken");
const initialRefreshToken = localStorage.getItem("refreshToken");
const initialUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!)
  : null;

const initialState: AuthState = {
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  user: initialUser,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: AuthError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<AuthResponse>>(
      "http://localhost:8080/auth/login",
      credentials,
    );

    if (response.data.success) {
      return response.data.responseObject!;
    } else {
      return rejectWithValue({ message: response.data.message });
    }
  } catch (error) {
    const err = error as AxiosError<AuthError>;
    return rejectWithValue(err.response?.data || { message: "Login failed" });
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  { username: string; email: string; password: string },
  { rejectValue: AuthError }
>("auth/register", async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<AuthResponse>>(
      "http://localhost:8080/auth/register",
      userInfo,
    );

    if (response.data.success) {
      return response.data.responseObject!;
    } else {
      return rejectWithValue({ message: response.data.message });
    }
  } catch (error) {
    const err = error as AxiosError<AuthError>;
    return rejectWithValue(
      err.response?.data || { message: "Registration failed" },
    );
  }
});

export const refreshAccessToken = createAsyncThunk<
  string,
  void,
  { rejectValue: AuthError }
>("auth/refreshToken", async (_, { getState, rejectWithValue }) => {
  const state = (getState() as RootState).auth;
  const refreshToken = state.refreshToken;

  if (!refreshToken) {
    return rejectWithValue({ message: "No refresh token available" });
  }

  try {
    const response = await axios.post<ApiResponse<{ accessToken: string }>>(
      "http://localhost:8080/auth/refresh-token",
      { refreshToken },
    );

    if (response.data.success) {
      return response.data.responseObject!.accessToken;
    } else {
      return rejectWithValue({ message: response.data.message });
    }
  } catch (error) {
    const err = error as AxiosError<AuthError>;
    return rejectWithValue(
      err.response?.data || { message: "Failed to refresh token" },
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logout Successful!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          toast.success("Login Successful!");
          state.status = "succeeded";
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.user = {
            username: action.payload.username,
            email: action.payload.email,
          };
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username: action.payload.username,
              email: action.payload.email,
            }),
          );
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.status = "failed";
          state.error = action.payload?.message || "Login failed";
          toast.error(action.payload?.message || "Login failed");
        },
      )
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          toast.success("Registration Successful!");

          state.status = "succeeded";
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.user = {
            username: action.payload.username,
            email: action.payload.email,
          };
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username: action.payload.username,
              email: action.payload.email,
            }),
          );
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.status = "failed";
          state.error = action.payload?.message || "Registration failed";
          toast.error(action.payload?.message || "Registration failed");
        },
      )
      .addCase(
        refreshAccessToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.accessToken = action.payload;
        },
      )
      .addCase(
        refreshAccessToken.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.error = action.payload?.message || "Failed to refresh token";
          toast.error(action.payload?.message || "Failed to refresh token");
        },
      );
  },
});

// Selector to check if user is authenticated
export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth.accessToken,
  (accessToken) => !!accessToken,
);

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
