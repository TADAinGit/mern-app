import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/slice/user'
import balanceReducer from './redux/slice/balance'
import paymentReducer from './redux/slice/payment'
import adminReducer from './redux/slice/admin'

export const store = configureStore({
    reducer: {
        user: userReducer,
        balance: balanceReducer,
        payment: paymentReducer,
        admin: adminReducer
    },
})