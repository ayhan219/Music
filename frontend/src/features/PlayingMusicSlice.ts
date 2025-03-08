import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicData {
  musicUrlToListen:string,
  artist:string,
  musicName:string,
  duration:number
}

interface MusicPlayerState {
  musicUrl: MusicData | null;
  isPlaying:boolean;
  openMusicBar:boolean;
}

const initialState: MusicPlayerState = {
  musicUrl: null, 
  isPlaying:false,
  openMusicBar:false
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setMusicUrl: (state, action: PayloadAction<MusicData>) => { 
      console.log(action.payload);
      
      state.musicUrl = action.payload
    },
    setIsPlaying:(state,action:PayloadAction<boolean>)=>{
      state.isPlaying = action.payload
    },
    setOpenMusicBar:(state,action:PayloadAction<boolean>)=>{
      state.openMusicBar = action.payload;
    }
  },
});

export const { setMusicUrl,setIsPlaying,setOpenMusicBar } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
