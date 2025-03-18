import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id?:string,
    username?:string,
    email?:string,
}

interface InitialState {
    user: User;  
}

const initialState: InitialState = {
    user: {},  
};


export const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<User>)=>{
            state.user = action.payload;
        }
    }


})

export const {setUser} =userSlice.actions;
export default userSlice.reducer;