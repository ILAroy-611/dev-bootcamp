import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser, login, register, updatePassword, updateProfile } from "../Thunks/AuthThunk";

const initialState={
    authloading:false,
    user:null,
    isLoggedIn:false,
    isUserUpdated:false,
    error:false,
    hasPasswordUpdated:false,
}
//login functionality
export const authSlice =  createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state,action)=>initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled, (state,action)=>{
            state.authloading=false;
            // state.token=action.payload.token;
            state.isLoggedIn=action.payload.success;
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(login.rejected, (state,action)=>{
            state.authloading=false;
            // state.token='';
            state.isLoggedIn=false;
            state.error=true
        })
        builder.addCase(login.pending, (state,action)=>{
            state.authloading=true;
        })

        builder.addCase(getLoggedInUser.pending, (state,action)=>{
            state.authloading=true;
        })
        builder.addCase(getLoggedInUser.fulfilled, (state,action)=>{
            state.isLoggedIn=action.payload.success;
            state.user=action.payload.data;
            state.authloading=false;
        })
        builder.addCase(getLoggedInUser.rejected, (state,action)=>{
            state.error=!action.payload.success;
            state.authloading=false ;
        })
        builder.addCase(register.pending,(state,action)=>{
            state.authloading=true ;
        })
        builder.addCase(register.fulfilled, (state,action)=>{
            state.authloading=false;
            state.isLoggedIn=action.payload.success;
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(register.rejected, (state,action)=>{
            state.authloading=false;
            state.isLoggedIn=false;
            state.error=true
        })
        builder.addCase(updateProfile.pending,(state,action)=>{
            state.authloading=true ;
        })
        builder.addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoggedIn=action.payload.success;
            state.user=action.payload.data;
            state.authloading=false;
            state.isUserUpdated=true;
        })
        builder.addCase(updateProfile.rejected,(state,action)=>{
            state.error=!action.payload.success;
            state.authloading=false ;
            state.isUserUpdated=false;
        })
        builder.addCase(updatePassword.fulfilled, (state,action)=>{
            state.hasPasswordUpdated=action.payload.success;
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(updatePassword.rejected, (state,action)=>{
            state.hasPasswordUpdated=action.payload.success
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer