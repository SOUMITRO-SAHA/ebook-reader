import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import appReducer from "./slice/appSlice";

const RootReducer = combineReducers({
  app: appReducer,
});

const store = configureStore({
  reducer: RootReducer,
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

export type RootState = ReturnType<typeof RootReducer>;
