import { createSlice } from "@reduxjs/toolkit";
import { addReview, getALlReviews, getMyReviews, getReviewsforBootcamp, getReviewUsers } from "../Thunks/ReviewThunk";


const initialState={
    loading:false,
    error:false,
    success:false,
    reviewsDataArray:[],
    reviewsforBootcamp:null,
    reviewsCountperBootcamp:0,
    reviewDetailwithUsername:[],
    reviewUsers:[],
    newReview:null,
    isReviewAdded:false,
    isReviewEdited:false,
    myReviews:[],
};

export const reviewSlice= createSlice({
    name:'review',
    initialState,
    reducers:{},
    extraReducers:{
        [getALlReviews.fulfilled]:(state,action)=>{
            state.reviewsDataArray=action.payload;
            state.success=true;
            state.loading=false;
        },
        [getALlReviews.rejected]:(state,action)=>{
            state.success=false;
            state.error=true;
            state.reviewsDataArray=[];
            state.loading=false;
        },
        [getALlReviews.pending]:(state,action)=>{
            state.loading=true;
        },
        [getReviewsforBootcamp.fulfilled]:(state,action)=>{
            state.reviewsforBootcamp=action.payload.data;
            state.reviewsCountperBootcamp=action.payload.count;
            state.success=true;
            state.loading=false;
        },
        [getReviewsforBootcamp.rejected]:(state,action)=>{
            state.success=false;
            state.error=true;
            state.reviewsforBootcamp=[];
            state.reviewsCountperBootcamp=0;
            state.loading=false;
        },
        [getReviewsforBootcamp.pending]:(state,action)=>{
            state.loading=true;
        },
        [getReviewUsers.fulfilled]:(state,action)=>{
            state.reviewUsers=[...state.reviewUsers, action.payload]
        },
        [getReviewUsers.pending]:(state,action)=>{
            state.reviewUsers=[]
        },
        [getReviewUsers.rejected]:(state,action)=>{
            state.reviewUsers=[]
        },
        [addReview.fulfilled]:(state,action)=>{
            state.newReview=action.payload.data;
            state.isReviewAdded=action.payload.success;
            state.loading=false;
        },
        [addReview.rejected]:(state,action)=>{
            state.newReview=null;
            state.isReviewAdded=true;
            state.loading=false;
        },
        [addReview.pending]:(state,action)=>{
            state.loading=true;
        },
        [getMyReviews.pending]:(state,action)=>{
            state.loading=true;
        },
        [getMyReviews.fulfilled]:(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=false;
            state.myReviews=action.payload.data;
        },
        [getMyReviews.rejected]:(state,action)=>{
            state.loading=false;
            state.myReviews=[];
            state.error=true;
            state.success=false;
        },
    }
})

