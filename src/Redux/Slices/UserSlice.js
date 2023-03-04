import { createSlice, current } from "@reduxjs/toolkit";
import { getALlusers, getSingleUser } from "../Thunks/UserThunk";


const initialState={
    loading:false,
    error:false,
    success:false,
    usersDataArray:[],
    userInfo:null,
    reviewUsers:[],
};

export const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:{
        [getALlusers.fulfilled]:(state,action)=>{
            state.usersDataArray=action.payload;
            state.success=true;
            state.loading=false;
        },
        [getALlusers.rejected]:(state,action)=>{
            state.success=false;
            state.error=true;
            state.usersDataArray=[];
            state.loading=false;
        },
        [getALlusers.pending]:(state,action)=>{
            state.loading=true;
        },
        
        [getSingleUser.fulfilled]:(state,action)=>{
            // console.log('hello',action.payload)
            state.userInfo=action.payload;
            // state.reviewUsers=[...state.reviewUsers, action.payload]
            state.success=true;
            state.loading=false;
            // return state;
        },
        [getSingleUser.rejected]:(state,action)=>{
            state.success=false;
            state.error=true;
            state.userInfo=[];
            state.loading=false;
        },
        [getSingleUser.pending]:(state,action)=>{
            state.loading=true;
        }
    }
})

