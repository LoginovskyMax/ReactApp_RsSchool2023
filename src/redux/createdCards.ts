import { createSlice } from '@reduxjs/toolkit';
import { IProduct, IResponse } from '../Pages/responseData';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const HOST = 'https://dummyjson.com/products';
interface IState {
  createdCards: IProduct[];
}

const initialState: IState = {
  createdCards: [],
};

export const createdCardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, { payload }) => {
      state.createdCards.push(payload);
    },
  },
});

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: HOST }),
  endpoints: (builder) => ({
    getCards: builder.query<IResponse, string>({
      query: (text) => {
        if (text !== '') {
          return `/search?q=${text.toLowerCase()}`;
        } else {
          return '';
        }
      },
    }),
    getCardByID: builder.query<IProduct, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { addCard } = createdCardsSlice.actions;

export default createdCardsSlice.reducer;

export const { useGetCardsQuery, useGetCardByIDQuery } = cardsApi;
