import { createSlice } from "@reduxjs/toolkit";

interface AppInitialState {
  app: {
    activeTab: number;
  };
}

const initialState: AppInitialState = {
  app: {
    activeTab: 1,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.app.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = appSlice.actions;
export default appSlice.reducer;
