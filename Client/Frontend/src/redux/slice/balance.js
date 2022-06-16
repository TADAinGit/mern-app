import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import balanceService from "../service/balance";
import { profile } from "./user";

export const transfer = createAsyncThunk(
  // đây là một action
  "balance/transfer",
  async ({ receiver, amount, content, username, payer, otp }, thunkAPI) => {
    try {
      const response = await balanceService.transfer(
        receiver,
        amount,
        content,
        username,
        payer,
        otp
      );

      // thunkAPI.dispatch(setMessage(response.data.message));
      thunkAPI.dispatch(profile(username));
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveTransferData = createAsyncThunk(
  "balance/saveTransferData",
  async ({ receiver, amount, content, payer }) => {
    return { receiver, amount, content, payer };
  }
);

export const deposit = createAsyncThunk(
  "balance/deposit",
  async ({ cardNumber, expiredDate, cvv, amount, username }, thunkAPI) => {
    try {
      const response = await balanceService.deposit(
        cardNumber,
        expiredDate,
        cvv,
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

export const saveDepositData = createAsyncThunk(
  "balance/saveDepositData",
  async ({ cardNumber, expiredDate, cvv, amount }) => {
    return { cardNumber, expiredDate, cvv, amount };
  }
);

export const withdraw = createAsyncThunk(
  // đây là một action
  "balance/withdraw",
  async ({ cardNumber, expiredDate, cvv, amount, username }, thunkAPI) => {
    try {
      const response = await balanceService.withdraw(
        cardNumber,
        expiredDate,
        cvv,
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
  phoneNumber: "",
  amount: "",
  content: "",
  transactionTransfer: {},
  transferData: {},
  transactionDeposit: {},
  depositData: {},
  withdrawData: {
    cardNumber: null,
    expiredDate: null,
    cvv: null,
    amount: null,
    fee: null,
  },
  withdrawResult: {},
  status: null,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.withdrawData.cardNumber = action.payload.cardNumber;
      state.withdrawData.expiredDate = action.payload.expiredDate;
      state.withdrawData.cvv = action.payload.cvv;
      state.withdrawData.amount = action.payload.amount;
      state.withdrawData.fee = action.payload.amount * 0.05;
    },
  },
  extraReducers: {
    [withdraw.fulfilled]: (state, action) => {
      state.withdrawResult = action.payload;
      state.status = "success";
    },
    [withdraw.rejected]: (state, action) => {
      // state.isLoggedIn = false;
      state.status = "failed";
    },
    [transfer.fulfilled]: (state, action) => {
      state.transactionTransfer = action.payload;
      state.status = "success";
    },
    [transfer.rejected]: (state, action) => {
      state.transactionTransfer = {};
      state.status = "failed";
    },
    [saveTransferData.fulfilled]: (state, action) => {
      state.transferData = action.payload;
      state.status = "success";
    },
    [saveTransferData.rejected]: (state, action) => {
      state.transferData = {};
      state.status = "failed";
    },
    [deposit.fulfilled]: (state, action) => {
      state.transactionDeposit = action.payload;
      state.status = "success";
    },
    [deposit.rejected]: (state, action) => {
      state.transactionDeposit = {};
      state.status = "failed";
    },
    [saveDepositData.fulfilled]: (state, action) => {
      state.depositData = action.payload;
      state.status = "success";
    },
    [saveDepositData.rejected]: (state, action) => {
      state.depositData = {};
      state.status = "failed";
    },
  },
});

const { reducer } = balanceSlice;
export default reducer;
