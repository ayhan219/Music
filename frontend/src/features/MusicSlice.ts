import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ArtistData {
  artist: {
    id: number;
    name: string;
    picture_big: string;
  };
}

interface RadioDatas{
  id:number,
  title:string,
  duration:number,
  rank:number,
  md5_image:string,
  artist:{
    id:number,
    name:string,
    picture:string,
  },
  album:{
    id:number,
    title:string,
    cover:string,
    cover_xl:string,
    md5_image:string
  }


}

interface AlbumData {
  album?:{
    cover_medium: string;
  }
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
  md5_image?:string
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
interface Radio{
  id:number,
  title:string,
  picture:string,
  picture_xl:string,
  md5_image:string,
  name?:string
}

interface AlbumMusicState {
  albumMusic: {
    title?: string;
    cover_xl?: string;
    duration: number;
    label: string;
    release_date?: string;
    tracks?: { data: AlbumMusic[] };
  } | null;
  currentMusicAlbum: AlbumMusic[];
  searchedMusicData: AlbumMusic[];
  popularAlbums: AlbumData[];
  releasedAlbums:AlbumData[];
  loading: boolean;
  error: string;
  artistData: ArtistData[];
  playlistMusics:AlbumData[];
  radio:Radio[]
  genres:Radio[]
  artists:ArtistData[]
  radios:RadioDatas[]
}

const initialState: AlbumMusicState = {
  albumMusic: null,
  currentMusicAlbum: [],
  searchedMusicData: [],
  loading: false,
  error: "",
  popularAlbums: [],
  artistData: [],
  playlistMusics:[],
  releasedAlbums:[],
  radio:[],
  genres:[],
  artists:[],
  radios:[]
};

export const getRadiosForSpecificId = createAsyncThunk(
  "albumMusic/getRadiosForSpecificId",
  async(id:number,{rejectWithValue})=>{
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio/${id}/tracks`,{
        headers: {
          "Accept-Language": "en"
        }
      })
      return response.data.data
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
)

export const getArtists = createAsyncThunk(
  "albumMusic/getArtists",
  async(id:number,{rejectWithValue})=>{
    try {
      const response =await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${id}/artists`,{
        headers: {
          "Accept-Language": "en"
        }
      })
      return response.data.data
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "An error occurred");
      
    }
  }
)

export const getGenres = createAsyncThunk(
  "albumMusic/getGenres",
  async()=>{
    try {
      const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre",{
        headers: {
          "Accept-Language": "en"
        }
      });
      return response.data.data
    } catch (error) {
      console.log(error);
    }
  }
)

export const getRadios = createAsyncThunk(
  "albumMusic/getRadios",
  async()=>{
    try {
      const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/radio",{
        headers: {
          "Accept-Language": "en"
        }
      });
      return response.data.data
    } catch (error) {
      console.log(error);
      
    }
  }
)
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
export const getMorePopularAlbums = createAsyncThunk(
  "albumMusic/getMorePopularAlbums",
  async (offset: number) => {
    console.log("offset",offset);
    
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums?limit=10&index=${offset}`
      ); 
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

)
export const getMoreReleasedAlbums = createAsyncThunk(
  "albumMusic/getMoreReleasedAlbums",
  async (offset: number) => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/editorial/0/releases?limit=10&index=${offset}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
)
export const getReleasedAlbums = createAsyncThunk(
  "albumMusic/getReleasedAlbums",
  async()=>{
    try {
      const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/editorial/0/releases")
      return response.data.data
    } catch (error) {
      console.log(error);
    }
  }

)

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
      .addCase(getPlaylistMusics.pending, (state) => {  
        state.loading = true;
        state.error = "";
      })
      .addCase(getPlaylistMusics.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistMusics = action.payload || [];
      })
      .addCase(getPlaylistMusics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getReleasedAlbums.pending,(state)=>{
        state.loading = true;
        state.error = ""
      })
      .addCase(getReleasedAlbums.fulfilled,(state,action)=>{
        state.loading=false;
        state.releasedAlbums = action.payload || []
      })
      .addCase(getReleasedAlbums.rejected,(state,action)=>{
        state.loading=false;
        state.error = action.payload as string
      })
      .addCase(getMorePopularAlbums.pending,(state)=>{
        state.loading = true;
        state.error = ""
      })
      .addCase(getMorePopularAlbums.fulfilled,(state,action)=>{
        state.loading = false;
        state.popularAlbums = [...state.popularAlbums,...action.payload];
      })
      .addCase(getMorePopularAlbums.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(getMoreReleasedAlbums.pending,(state)=>{
        state.loading = true;
        state.error = ""
      })
      .addCase(getMoreReleasedAlbums.fulfilled,(state,action)=>{
        state.loading = false;
        state.releasedAlbums = [...state.releasedAlbums,...action.payload];
      })
      .addCase(getMoreReleasedAlbums.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(getRadios.pending,(state)=>{
        state.loading = true;
        state.error =""
      })
      .addCase(getRadios.fulfilled,(state,action)=>{
        state.loading = false;
        state.radio = action.payload || []
      })
      .addCase(getRadios.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(getGenres.pending,(state)=>{
        state.loading = true;
        state.error = ""
      })
      .addCase(getGenres.fulfilled,(state,action)=>{
        state.loading = false;
        state.genres = action.payload || []
      })
      .addCase(getGenres.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(getArtists.pending,(state)=>{
        state.loading = true;
        state.error =""
      })
      .addCase(getArtists.fulfilled,(state,action)=>{
        state.loading = false;
        state.artists = action.payload || []
      })
      .addCase(getArtists.rejected,(state,action)=>{
        state.loading =false;
        state.error = action.payload as string
      })
      .addCase(getRadiosForSpecificId.pending,(state)=>{
        state.loading =true;
        state.error =""
      })
      .addCase(getRadiosForSpecificId.fulfilled,(state,action)=>{
        state.loading =false;
        state.radios = action.payload || []
      })
      .addCase(getRadiosForSpecificId.rejected,(state,action)=>{
        state.loading =false;
        state.error =action.payload as string
      })

  

  },
});

export const { setAlbumMusic, setCurrentAlbumMusic, setSearchedMusicData ,setNewMusicUrl} =
  albumMusicSlice.actions;
export default albumMusicSlice.reducer;
