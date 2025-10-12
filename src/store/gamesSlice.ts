import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// type 
export type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  genres: { name: string }[];
};

export type GamesResponse = {
  count: number;
  results: Game[];
};

type GamesState = {
  items: Game[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  page: number;
  limit: number;
};

const initialState: GamesState = {
  items: [],
  status: "idle",
  error: undefined,
  page: 1,
  limit: 100,
};

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchGames = createAsyncThunk<
  GamesResponse,
  { page?: number; limit?: number }
>("games/fetchGames", async ({ page = 1, limit = 100 }) => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${limit}`;
  const res = await axios.get<GamesResponse>(url, { timeout: 15000 });
  return res.data;
});

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.results;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch games.";
      });
  },
});

export const { setPage } = gamesSlice.actions;
export default gamesSlice.reducer;
