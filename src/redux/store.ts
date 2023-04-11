import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchs";
import createdCardsReducer from "./createdCards";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    createCards: createdCardsReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
