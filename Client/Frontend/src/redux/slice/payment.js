import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../service/payment";
import { profile } from "./user";

export const buyCard = createAsyncThunk(
  // đây là một action
  "payment/buyCard",
  async ({ hostName, cost, amount, username }, thunkAPI) => {
    try {
      const response = await paymentService.buyCard(
        hostName,
        cost,
        amount,
        username
      );
      // thunkAPI.dispatch(setMessage(response.data.message));
      thunkAPI.dispatch(profile(username));

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  paymentData: {
    hostName: null,
    cost: 0,
    amount: 0,
  },
  paymentResult: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePaymentData: (state, action) => {
      state.paymentData.hostName = action.payload.hostName;
      state.paymentData.cost = action.payload.cost;
      state.paymentData.amount = action.payload.amount;
    },
  },
  extraReducers: {
    [buyCard.fulfilled]: (state, action) => {
      state.paymentResult = action.payload;
    },
    [buyCard.rejected]: (state, action) => {
      // state.isLoggedIn = false;
      console.log("fail");
    },
  },
});

const { reducer } = paymentSlice;
export default reducer;
