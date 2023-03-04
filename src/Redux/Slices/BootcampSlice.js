import { createSlice } from "@reduxjs/toolkit"
import { createBootcamp, deleteBootcamp, editBootcamp, getAllBootcamps, getSingleBootcamp } from "../Thunks/BootCampThunk"


const initialState={
    isBootcampLoading : false,
    bootcampSuccess : false,
    bootcampError: false,
    bootcampDataArray:null,
    bootcampDetails:null,
    isBootcampEdited:false,
}

export const bootcampSlice= createSlice({
    name:'bootcamps',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBootcamps.pending, (state,action)=>{
            state.isBootcampLoading=true;
        })
        builder.addCase(getAllBootcamps.fulfilled, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=true;
            state.bootcampError=false;
            state.bootcampDataArray = action.payload.data

        })
        builder.addCase(getAllBootcamps.rejected, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=false;
            state.bootcampError=true;
        })
        builder.addCase(getSingleBootcamp.pending, (state,action)=>{
            state.isBootcampLoading=true;
        })
        builder.addCase(getSingleBootcamp.fulfilled, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=true;
            state.bootcampError=false;
            state.bootcampDetails = action.payload.data

        })
        builder.addCase(getSingleBootcamp.rejected, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=false;
            state.bootcampError=true;
        })
        builder.addCase(createBootcamp.pending, (state,action)=>{
            state.isBootcampLoading=true;
        })
        builder.addCase(createBootcamp.fulfilled, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=true;
            state.bootcampError=false;
            state.bootcampDetails = action.payload.data

        })
        builder.addCase(createBootcamp.rejected, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=false;
            state.bootcampError=true;
        })
        builder.addCase(deleteBootcamp.pending, (state,action)=>{
            state.isBootcampLoading=false;
        })
        builder.addCase(deleteBootcamp.fulfilled, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=true;
            state.bootcampError=false;
        })
        builder.addCase(deleteBootcamp.rejected, (state,action)=>{
            state.isBootcampLoading=false;
            state.bootcampSuccess=false;
            state.bootcampError=true;
        })
        builder.addCase(editBootcamp.pending, (state,action)=>{
            state.isBootcampLoading=false;
        })
        builder.addCase(editBootcamp.fulfilled, (state,action)=>{
            state.isBootcampLoading=false;
            state.isBootcampEdited=true;
            state.bootcampError=false;
        })
        builder.addCase(editBootcamp.rejected, (state,action)=>{
            state.isBootcampLoading=false;
            state.isBootcampEdited=false;
            state.bootcampError=true;
        })
    }
})