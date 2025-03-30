import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeneralType {
  input: string;
  contextMenu: { visible: boolean; x: number; y: number; id: number | null }; 
}

const initialState: GeneralType = {
  input: "",
  contextMenu: { visible: false, x: 0, y: 0, id: null }, 
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setContextMenu: (
      state,
      action: PayloadAction<{ visible: boolean; x: number; y: number; id: number | null }>
    ) => {
      state.contextMenu = {
        visible: action.payload.visible,
        x: action.payload.x,
        y: action.payload.y,
        id: action.payload.id, 
      };
    },
  },
});

export const { setInput, setContextMenu } = generalSlice.actions;
export default generalSlice.reducer;
