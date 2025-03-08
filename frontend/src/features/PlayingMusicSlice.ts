import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// musicPlayerState için tip tanımlaması
interface MusicPlayerState {
  musicUrl: string;
  isPlaying:boolean;
  openMusicBar:boolean;
}

const initialState: MusicPlayerState = {
  musicUrl: "", 
  isPlaying:false,
  openMusicBar:false
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setMusicUrl: (state, action: PayloadAction<string>) => {
      state.musicUrl = action.payload; 
    },
    clearMusicUrl: (state) => {
      state.musicUrl = ""; 
    },
    setIsPlaying:(state,action:PayloadAction<boolean>)=>{
      state.isPlaying = action.payload
    },
    setOpenMusicBar:(state,action:PayloadAction<boolean>)=>{
      state.openMusicBar = action.payload;
    }
  },
});

export const { setMusicUrl, clearMusicUrl,setIsPlaying,setOpenMusicBar } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
