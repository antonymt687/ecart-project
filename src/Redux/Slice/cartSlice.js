import { createSlice } from "@reduxjs/toolkit";


const cartSlice= createSlice({
    name:"cart",
    initialState:{
        cart:[],
    },
    reducers:{
        addToCart:(state,action)=>{
            const existingProduct=state.cart.find(item=>item.id==action.payload.id)
            if(existingProduct){
                const remainingProduct= state.cart.filter(item=>item.id != existingProduct.id)
                existingProduct.quantity+=1
                existingProduct.totalPrice= existingProduct.price * existingProduct.quantity
                state.cart=[...remainingProduct,existingProduct]
            }else{
                state.cart.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        removeFromCart:(state,action)=>{
            state.cart= state.cart.filter(item => item.id !== action.payload)
        },
        emptycart:(state)=>{
            state.cart=[]
        }
    }
})

export const{addToCart,removeFromCart,emptycart}=cartSlice.actions
export default cartSlice.reducer