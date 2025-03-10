import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    } | null,
    currentMusicAlbum:AlbumMusic[]
  }

  const initialState: AlbumMusicState = {
    albumMusic: null,
    currentMusicAlbum:[],
  };

  const albumMusicSlice = createSlice({
    name:"albumMusic",
    initialState,
    reducers:{
        setAlbumMusic: (state, action: PayloadAction<AlbumMusicState['albumMusic']>) => {
            state.albumMusic = action.payload;
          },
          setCurrentAlbumMusic:(state,action: PayloadAction<AlbumMusic[]>)=>{
            state.currentMusicAlbum= action.payload;
          }
    }
  })

  export const { setAlbumMusic,setCurrentAlbumMusic } = albumMusicSlice.actions;
export default albumMusicSlice.reducer;