import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Artist {
  id: number;
  name: string;
  picture: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  type: string;
}

interface ArtistState {
  artist: Artist | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ArtistState = {
  artist: null,
  status: "idle",
};

export const getArtistData = createAsyncThunk(
  "artist/getArtistData",
  async (id: number) => {
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}`);
      console.log(response.data);
      
      return response.data; 
    } catch (error) {
      console.log(error);
      
    }
  }
);

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtistData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getArtistData.fulfilled, (state, action: PayloadAction<Artist>) => {
        state.artist = action.payload;
        state.status = "idle";
      })
      .addCase(getArtistData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default artistSlice.reducer;
