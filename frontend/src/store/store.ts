//@ts-ignore
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../features/authSlice'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    userInfo: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)