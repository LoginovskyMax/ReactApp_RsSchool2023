import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchs';
import createdCardsReducer from './createdCards';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cardsApi } from './createdCards';

export const store = configureStore({
  reducer: {
    [cardsApi.reducerPath]: cardsApi.reducer,
    search: searchReducer,
    createCards: createdCardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
