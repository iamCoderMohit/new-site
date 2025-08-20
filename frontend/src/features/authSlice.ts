import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: [],
        isLoggedIn: false
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false,
            state.userInfo = []
        }
    }
})

export const {setUserInfo, setIsLoggedIn, logout} = authSlice.actions
export default authSlice.reducer