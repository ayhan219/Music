import { configureStore } from "@reduxjs/toolkit";
import albumMusicReducer from "../features/MusicSlice"
import musicPlayerReducer from "../features/PlayingMusicSlice"

export const store = configureStore({
    reducer:{
        albumMusic:albumMusicReducer,
        musicPlayer: musicPlayerReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
