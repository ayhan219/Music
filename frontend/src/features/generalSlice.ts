import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface GeneralType{
    input:string
}

const initialState : GeneralType = {
    input:""  
}


export const generalSlice = createSlice({
    name:"generalSlice",
    initialState,
    reducers:{
        setInput:(state,action:PayloadAction<string>)=>{
            state.input = action.payload;
        }
    }
    

})

export const {setInput} = generalSlice.actions;
export default generalSlice.reducer;