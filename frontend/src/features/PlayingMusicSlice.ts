import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface MusicPlayerState {
  musicId:number;
  isPlaying:boolean;
  openMusicBar:boolean;
  
}

const initialState: MusicPlayerState = {
  musicId:0, 
  isPlaying:false,
  openMusicBar:false
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setMusicId: (state, action: PayloadAction<number>) => { 
      state.musicId = action.payload
    },
    setIsPlaying:(state,action:PayloadAction<boolean>)=>{
      state.isPlaying = action.payload
    },
    setOpenMusicBar:(state,action:PayloadAction<boolean>)=>{
      state.openMusicBar = action.payload;
    }
  },
});

export const { setMusicId,setIsPlaying,setOpenMusicBar } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
