import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  limit: 40,
};

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;



export const fetchGames = createAsyncThunk<
  GamesResponse,
  { page?: number; limit?: number }
>("games/fetchGames", async ({ page = 1, limit = 40 }) => {
  const url = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&page=${page}&page_size=${limit}`;

  for (let i = 0; i < 3; i++) {
    try {
      const res = await axios.get<GamesResponse>(url);
      // check fetch
      console.log(`✅ fetch success (try #${i + 1})`); 
      return res.data;
    } catch (err: any) {
      console.warn(`⚠️ fetch failed (try #${i + 1}) →`, err.message);
      if (i === 2) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  throw new Error("Failed after 3 retries.");
});


export const searchGames = createAsyncThunk<
  GamesResponse,
  string
>("games/searchGames", async (query) => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
    query
  )}`;
  const res = await axios.get<GamesResponse>(url);
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
    })

    .addCase(searchGames.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    })
    .addCase(searchGames.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.results;
    })
    .addCase(searchGames.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to search games.";
    });
}
,
});

export const { setPage } = gamesSlice.actions;
export default gamesSlice.reducer;
