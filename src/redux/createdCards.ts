import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../Pages/responseData";

interface IState{
  createdCards:IProduct[]
}

const initialState:IState = {
   createdCards: []
};

export const createdCardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard:(state, {payload}) => {
       state.createdCards.push(payload)
    }
  },
});

export const { addCard } = createdCardsSlice.actions;

export default createdCardsSlice.reducer;
