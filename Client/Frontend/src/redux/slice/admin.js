import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from '../service/admin'

export const getUsers = createAsyncThunk('admin/getUsers', async () => {
    try {
        return await adminService.getListUser();
    } catch (error) {
        console.log(error);
    }
});

export const getTransactions = createAsyncThunk('admin/getTransactions', async () => {
    try {
        return await adminService.getListTransaction();
    } catch (error) {
        console.log(error);
    }
});

export const setUserStatus = createAsyncThunk('admin/setUserStatus', async ({ username, status }) => {
    try {
        return await adminService.setStatus(username, status);
    }
    catch (error) {
        console.log(error);
    }
});

export const setTransactionState = createAsyncThunk('admin/setTransactionState', async ({ type, transactionId }) => {
    try {
        if (type === "approve") {
            return await adminService.approveTransaction(transactionId);
        }
        return await adminService.denyTransaction(transactionId);
    }
    catch (error) {
        console.log(error);
    }
});

const initialState = {
    users: [],
    transactions: [],
    status: null,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.status = "success";
            state.users = action.payload.data
        },
        [getUsers.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed";
        },
        [setUserStatus.fulfilled]: (state, action) => {
            state.status = "loading";
        },
        [setUserStatus.rejected]: (state, action) => {
            state.status = "failed";
        },
        [setUserStatus.pending]: (state, action) => {
            state.status = "loading";
        },
        [getTransactions.fulfilled]: (state, action) => {
            state.status = "success";
            state.transactions = action.payload.data
        },
        [getTransactions.pending]: (state, action) => {
            state.status = "loading";
        },
        [getTransactions.rejected]: (state, action) => {
            state.status = "failed";
        },
        [setTransactionState.fulfilled]: (state, action) => {
            state.status = "success";
            console.log(action.payload.data);
        },
        [setTransactionState.pending]: (state, action) => {
            state.status = "loading";
        },
        [setTransactionState.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
});

export default adminSlice.reducer;