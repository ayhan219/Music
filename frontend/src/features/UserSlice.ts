import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Playlist {
  id: number;
  user_id: number;
  playlist_name: string;
  playlist_description: string;
  playlist_id:number,
  created_at: string;
}

interface User {
  id?: number;
  username?: string;
  email?: string;
  created_at?: string;
  playlists?: Playlist[];
}

interface InitialState {
  user: User;
  currentPlaylist: Partial<Playlist>;
  loading: boolean;
  error:string | null;
}

const initialState: InitialState = {
  user: {},
  currentPlaylist:{},
  loading:false,
  error:null
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/auth/getuser", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching user");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        return true;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setPlaylistMusic:(state,action: PayloadAction<Playlist>)=>{
      state.user.playlists?.push(action.payload);
    },
    setCurrentPlaylist:(state,action:PayloadAction<Playlist>)=>{
      state.currentPlaylist = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = {};
        window.location.reload();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setPlaylistMusic,setCurrentPlaylist } = userSlice.actions;
export default userSlice.reducer;
