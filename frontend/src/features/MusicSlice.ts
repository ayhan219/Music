import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ArtistData {
  artist: {
    id: number;
    name: string;
    picture_big: string;
  };
}
interface AlbumData {
  cover: string;
  cover_xl: string;
  artist: {
    name: string;
  };
  id: number;
  link: string;
  position: number;
  type: string;
  title: string;
}


interface AlbumMusic {
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

interface AlbumMusicState {
  albumMusic: {
    title?: string;
    cover_xl?: string;
    duration: number;
    label: string;
    release_date: string;
    tracks?: { data: AlbumMusic[] };
  } | null;
  currentMusicAlbum: AlbumMusic[];
  searchedMusicData: AlbumMusic[];
  popularAlbums: AlbumData[];
  loading: boolean;
  error: string;
  artistData: ArtistData[];
  playlistMusics:AlbumData[]
}

const initialState: AlbumMusicState = {
  albumMusic: null,
  currentMusicAlbum: [],
  searchedMusicData: [],
  loading: false,
  error: "",
  popularAlbums: [],
  artistData: [],
  playlistMusics:[]
};



export const getPlaylistMusics = createAsyncThunk(
  "albumMusic/getPlaylistMusics",
  async ({ user_id, playlist_id }: { user_id: number; playlist_id: number }, { rejectWithValue }) => {
    
    try {
      const response = await axios.get(`http://localhost:5000/music/playlistmusics`, {
        params: { user_id, playlist_id }, 
      });
      return response.data; 
    } catch (error: any) {
      console.error("Error fetching playlist musics:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const getPopularAlbums = createAsyncThunk(
  "albumMusic/getPopularAlbums",
  async () => {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums"
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPopularArtist = createAsyncThunk(
  "albumMusic/getPopularArtists",
  async () => {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/artists"
      );
      return response.data.tracks.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const albumMusicSlice = createSlice({
  name: "albumMusic",
  initialState,
  reducers: {
    setAlbumMusic: (
      state,
      action: PayloadAction<AlbumMusicState["albumMusic"]>
    ) => {
      state.albumMusic = action.payload;
    },
    setCurrentAlbumMusic: (state, action: PayloadAction<AlbumMusic[]>) => {
      state.currentMusicAlbum = action.payload;
    },
    setSearchedMusicData: (state, action: PayloadAction<AlbumMusic[]>) => {
      state.searchedMusicData = action.payload;
    },
    setNewMusicUrl:(state,action:PayloadAction<{id:number,preview:string}>)=>{      
      const findSpecificMusic = state.currentMusicAlbum.find((item:AlbumMusic)=>item.id===action.payload.id)
      if(findSpecificMusic){
        findSpecificMusic.preview = action.payload.preview
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularAlbums.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getPopularAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.popularAlbums = action.payload || [];
      })
      .addCase(getPopularAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch albums";
      })
      .addCase(getPopularArtist.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getPopularArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.artistData = action.payload || [];
      })
      .addCase(getPopularArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch artist";
      })
      .addCase(getPlaylistMusics.fulfilled, (state, action) => {
        state.playlistMusics = action.payload || [];
      })
      .addCase(getPlaylistMusics.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setAlbumMusic, setCurrentAlbumMusic, setSearchedMusicData ,setNewMusicUrl} =
  albumMusicSlice.actions;
export default albumMusicSlice.reducer;
