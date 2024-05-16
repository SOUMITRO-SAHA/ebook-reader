import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSliceState {
  currentPage: number;
}

const initialState: AppSliceState = {
  currentPage: 1,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getCurrentPage: (state) => {
      return state;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { getCurrentPage, setCurrentPage } = appSlice.actions;
export default appSlice.reducer;
