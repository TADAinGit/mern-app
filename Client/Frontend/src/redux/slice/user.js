import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../service/user";

export const register = createAsyncThunk(
  // đây là một action
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const response = await userService.register(formData);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ userName, passWord }, thunkAPI) => {
    try {
      const response = await userService.login(userName, passWord);
      // thunkAPI.dispatch(setMessage(response.data.message));
      if (response.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const profile = createAsyncThunk(
  "user/profile",
  async (username, thunkAPI) => {
    try {
      const response = await userService.profile(username);
      return response.data;
    } catch (error) {}
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await userService.logOut();
  } catch (error) {
    console.log(error);
  }
});

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    { newPassword, retypeNewPassword, currentPassword, username },
    thunkAPI
  ) => {
    try {
      const response = await userService.changePassword(
        newPassword,
        retypeNewPassword,
        currentPassword,
        username
      );
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getHistory = createAsyncThunk(
  "user/getHistory",
  async ({ username }) => {
    try {
      return await userService.getUserTransaction(username);
    } catch (error) {
      console.log(error);
    }
  }
);

export const firstLogin = createAsyncThunk(
  "user/firstLogin",
  async ({ username, passWord, repassWord }) => {
    try {
      const response = await userService.firstLogin(username, passWord, repassWord);
      if (response.data.success && localStorage.getItem('user')) {
        const tmp = JSON.parse(localStorage.getItem('user'))
        tmp.data.firstLoginFlag = true;
        localStorage.setItem('user', JSON.stringify(tmp));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const otp = createAsyncThunk("user/otp", async ({ username, email }, thunkAPI) => {
  try {
    const response = await userService.otp(username, email);
  } catch (error) {
    console.log(error);
  }
});

export const validateOTP = createAsyncThunk("user/vaidateOTP", async ({ otp }) => {
  try {
    const response = await userService.validateOTP(otp);
  } catch (error) {

  }
});

export const resetPassword = createAsyncThunk("user/resetPassword", async ({ email, password }) => {
  try {
    // console.log(password);
    const response = await userService.resetpassword(email, password);
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLogin: false,
  userFull: null,
  histories: [],
  status: null,
  validOTP: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [resetPassword.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [resetPassword.rejected]: (state, action) => {
      state.status = "failed";
    },
    [validateOTP.fulfilled]: (state, action) => {
      state.status = "success";
      state.validOTP = true;
    },
    [validateOTP.rejected]: (state, action) => {
      state.status = "failed";
      state.validOTP = false;
    },
    [getHistory.fulfilled]: (state, action) => {
      state.histories = action.payload.data.data;
      state.status = "success";
    },
    [getHistory.rejected]: (state, action) => {
      state.histories = [];
      state.status = "failed";
    },
    [register.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.status = "success";
    },
    [register.rejected]: (state, action) => {
      state.isLogin = false;
      state.status = "failed";
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.isLogin = false;
      state.status = "failed";
    },
    [profile.fulfilled]: (state, action) => {
      state.userFull = action.payload.User ? action.payload.User : null;
      state.status = "success";
    },
    [profile.rejected]: (state, action) => {
      state.isLogin = false;
      state.status = "failed";
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
      state.isLogin = false;
      state.userFull = null;
      state.status = "success";
    },
    [changePassword.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [changePassword.rejected]: (state, action) => {
      state.status = "failed";
    },
    [firstLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.user.data.firstLoginFlag = action.payload.data.firstLoginFlag;
    },
    [firstLogin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = userSlice;
export default reducer;
