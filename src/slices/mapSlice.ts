import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../app/store";
import { toast } from "react-hot-toast";
import api from "../utils/api";

// Define the MapCapture interface
interface MapCapture {
  id: string;
  userId: string;
  title: string;
  longitude: number;
  latitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  imageUrl: string;
  createdAt: string;
}

// Define the state interface for the slice
interface MapState {
  captures: MapCapture[];
  latestCapture: MapCapture | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalCaptures: number;
  hasMore: boolean;
}

// Initial state with pagination data
const initialState: MapState = {
  captures: [],
  latestCapture: null,
  status: "idle",
  error: null,
  currentPage: 1,
  totalCaptures: 0,
  hasMore: true,
};

// Interfaces for API responses and errors
interface SaveMapCaptureArgs {
  title: string;
  longitude: number;
  latitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  imageUrl: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  responseObject?: T;
  statusCode: number;
}

interface MapError {
  message: string;
}

interface FetchUserMapCapturesArgs {
  page: number;
  limit: number;
}

// Thunk to fetch all map captures of the user with pagination
export const fetchUserMapCaptures = createAsyncThunk<
  MapCapture[],
  FetchUserMapCapturesArgs,
  { rejectValue: MapError; state: RootState }
>(
  "map/fetchUserMapCaptures",
  async ({ page, limit }, { rejectWithValue, getState }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      return rejectWithValue({ message: "No access token available" });
    }

    try {
      const response = await api.get<ApiResponse<MapCapture[]>>(
        `http://localhost:8080/map-captures?page=${page}&limit=${limit}`, // TODO: use env
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.success) {
        return response.data.responseObject!;
      } else {
        return rejectWithValue({ message: response.data.message });
      }
    } catch (error) {
      const err = error as AxiosError<MapError>;
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch map captures" },
      );
    }
  },
);

// Thunk to save a map capture
export const saveMapCapture = createAsyncThunk<
  MapCapture,
  SaveMapCaptureArgs,
  { rejectValue: MapError; state: RootState }
>("map/saveMapCapture", async (mapData, { rejectWithValue, getState }) => {
  const state = getState();
  const accessToken = state.auth.accessToken;

  if (!accessToken) {
    return rejectWithValue({ message: "No access token available" });
  }

  try {
    const response = await axios.post<ApiResponse<MapCapture>>(
      "http://localhost:8080/map-captures",
      mapData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data.success) {
      toast.success("Map capture saved successfully!");
      return response.data.responseObject!;
    } else {
      return rejectWithValue({ message: response.data.message });
    }
  } catch (error) {
    const err = error as AxiosError<MapError>;
    return rejectWithValue(
      err.response?.data || { message: "Failed to save map capture" },
    );
  }
});

// Thunk to fetch the latest map capture
export const fetchLatestMapCapture = createAsyncThunk<
  MapCapture,
  void,
  { rejectValue: MapError; state: RootState }
>("map/fetchLatestMapCapture", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const accessToken = state.auth.accessToken;

  if (!accessToken) {
    return rejectWithValue({ message: "No access token available" });
  }

  try {
    const response = await axios.get<ApiResponse<MapCapture>>(
      "http://localhost:8080/map-captures/user/latest",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data.success) {
      return response.data.responseObject!;
    } else {
      return rejectWithValue({ message: response.data.message });
    }
  } catch (error) {
    const err = error as AxiosError<MapError>;
    return rejectWithValue(
      err.response?.data || { message: "Failed to fetch latest map capture" },
    );
  }
});

// Thunk to fetch top captured regions
export const fetchTopCapturedRegions = createAsyncThunk<
  MapCapture[],
  void,
  { rejectValue: MapError; state: RootState }
>("map/fetchTopCapturedRegions", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const accessToken = state.auth.accessToken;

  if (!accessToken) {
    return rejectWithValue({ message: "No access token available" });
  }

  try {
    const response = await api.get<ApiResponse<MapCapture[]>>(
      "http://localhost:8080/map-captures/top-regions",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data.success) {
      return response.data.responseObject!;
    }
    return rejectWithValue({ message: response.data.message });
  } catch (error) {
    const err = error as AxiosError<MapError>;
    return rejectWithValue(
      err.response?.data || { message: "Failed to fetch top captured regions" },
    );
  }
});

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    resetMapState: (state) => {
      state.captures = [];
      state.status = "idle";
      state.currentPage = 1;
      state.totalCaptures = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Map Capture
      .addCase(saveMapCapture.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        saveMapCapture.fulfilled,
        (state, action: PayloadAction<MapCapture>) => {
          state.status = "succeeded";
          state.captures.push(action.payload);
          state.latestCapture = action.payload; // Optionally set this as the latest capture
          toast.success("Map data saved successfully");
        },
      )
      .addCase(
        saveMapCapture.rejected,
        (state, action: PayloadAction<MapError | undefined>) => {
          state.status = "failed";
          state.error = action.payload?.message || "Failed to save map capture";
        },
      )

      // Fetch Latest Map Capture
      .addCase(fetchLatestMapCapture.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchLatestMapCapture.fulfilled,
        (state, action: PayloadAction<MapCapture>) => {
          state.status = "succeeded";
          state.latestCapture = action.payload;
          toast.success("Last saved map data loaded!");
        },
      )
      .addCase(
        fetchLatestMapCapture.rejected,
        (state, action: PayloadAction<MapError | undefined>) => {
          state.status = "failed";
          state.error =
            action.payload?.message || "Failed to fetch latest map capture";
          toast.error(state.error);
        },
      )

      // Fetch Top Captured Regions
      .addCase(fetchTopCapturedRegions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTopCapturedRegions.fulfilled,
        (state, action: PayloadAction<MapCapture[]>) => {
          state.status = "succeeded";
          state.captures = action.payload;
        },
      )
      .addCase(
        fetchTopCapturedRegions.rejected,
        (state, action: PayloadAction<MapError | undefined>) => {
          state.status = "failed";
          state.error =
            action.payload?.message || "Failed to fetch top captured regions";
          toast.error(state.error);
        },
      )

      // Fetch All User Map Captures
      .addCase(fetchUserMapCaptures.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserMapCaptures.fulfilled,
        (state, action: PayloadAction<MapCapture[]>) => {
          state.status = "succeeded";
          state.captures = [...state.captures, ...action.payload]; // Append new captures to the existing ones
          state.currentPage += 1; // Increment the current page
          state.totalCaptures += action.payload.length;

          // Assuming a fixed page size for simplicity, adjust this as needed
          if (action.payload.length < 10) {
            state.hasMore = false; // No more captures to load
          }
        },
      )
      .addCase(
        fetchUserMapCaptures.rejected,
        (state, action: PayloadAction<MapError | undefined>) => {
          state.status = "failed";
          state.error =
            action.payload?.message || "Failed to fetch map captures";
          toast.error(state.error);
        },
      );
  },
});

export const { resetMapState } = mapSlice.actions;
export default mapSlice.reducer;
