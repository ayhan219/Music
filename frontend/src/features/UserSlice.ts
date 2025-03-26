import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Playlist {
  id: number;
  user_id: number;
  playlist_name: string;
  playlist_description: string;
  created_at: string;
}

interface User {
  id?: string;
  username?: string;
  email?: string;
  created_at?: string;
  playlists?: Playlist[];
}

interface InitialState {
  user: User;
}

const initialState: InitialState = {
  user: {},
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5000/auth/getuser", {
        withCredentials: true,
      });

      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    try {
      const response = await axios.delete("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setUser({}));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
