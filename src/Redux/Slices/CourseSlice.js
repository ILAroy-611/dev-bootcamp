import { createSlice } from "@reduxjs/toolkit"
import { getCourseforBootcamp } from "../Thunks/CourseThunk"


const initialState={
    coursesForBootcampArray:null,
    isCourseLoading:false,
    courseSuccess:false,
    courseError:false,
    courseCountperBootcamp:0,
}

export const courseSlice= createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseforBootcamp.pending, (state,action)=>{
            state.isCourseLoading=true;
        })
        builder.addCase(getCourseforBootcamp.fulfilled, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=true;
            state.courseError=false;
            state.coursesForBootcampArray=action.payload.data;
            state.courseCountperBootcamp=action.payload.count;
        })
        builder.addCase(getCourseforBootcamp.rejected, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=false;
            state.courseError=true;
            state.coursesForBootcampArray=[];
            state.courseCountperBootcamp=0;
        })
    }
})