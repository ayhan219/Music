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
interface ArtistMusic {
  artist: {
    name: string;
  };
  album: {
    cover_medium: string;
  };
  duration: number;
  id: number;
  md5_image: string;
  preview: string;
  rank: number;
  title: string;
}

interface ArtistState {
  artist: Artist | null;
  status: "idle" | "loading" | "failed";
  artistPopularMusic:ArtistMusic[] | null;
}

const initialState: ArtistState = {
  artist: null,
  status: "idle",
  artistPopularMusic:[]
};

export const getArtistMusicData = createAsyncThunk(
  "artist/getArtistMusicData",
  async(id:number)=>{
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/top?limit=10`);
      console.log("getting artist music data",response.data.data);
      return response.data.data; 
    } catch (error) {
      console.log(error);
      
    }
  }
)

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
      })
      .addCase(getArtistMusicData.pending,(state)=>{
        state.status = "loading";
      })
      .addCase(getArtistMusicData.fulfilled, (state, action: PayloadAction<ArtistMusic[]>) => {
        state.artistPopularMusic = action.payload;
        state.status = "idle";
      })
      .addCase(getArtistMusicData.rejected, (state) => {
        state.status = "failed";
      })
  },
});

export default artistSlice.reducer;
