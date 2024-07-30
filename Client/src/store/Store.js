import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './CartSlice'

const store = configureStore({
    reducer: {
        cartHolder: cartReducer,
    }
})

export default store;