import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        total: '',
        cart:[]
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
                     
        },
        remove(state, action){
            return state.cart.filter((item) =>
                item.id !== action.payload
            )
            
        },
        TotalAmount(state) {
            let sum = 0;
            for (let i = 0; i < state.cart.length; i++) {
                sum += parseFloat(state.cart[i].price);   //parse to float because the price comes as a string from API
            }
            state.total = sum.toFixed(2);//round up to two decimal places
        }

        
        
    },
})
export const { addToCart, remove ,TotalAmount } = cartSlice.actions

export  default cartSlice.reducer;