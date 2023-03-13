import { createSlice } from "@reduxjs/toolkit"
import { createCourse, deletecourse, getCourseDetail, getCourseforBootcamp, updateCourse } from "../Thunks/CourseThunk"


const initialState={
    coursesForBootcampArray:null,
    isCourseLoading:false,
    courseSuccess:false,
    courseError:false,
    newcourse:null,
    courseCountperBootcamp:0,
    courseDetails:null,
    isCourseUpdated:false
}

export const courseSlice= createSlice({
    name:'courses',
    initialState,
    reducers:{
        resetUpdate:(state,action)=>{
            state.isCourseUpdated=false;
        }
    },
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

        builder.addCase(createCourse.pending, (state,action)=>{
            state.isCourseLoading=true;
        })
        builder.addCase(createCourse.fulfilled, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=true;
            state.courseError=false;
            state.newcourse=action.payload.data;
        })
        builder.addCase(createCourse.rejected, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=false;
            state.courseError=true;
            state.newcourse=null;
        })
        builder.addCase(deletecourse.pending, (state,action)=>{
            state.isCourseLoading=true;
        })
        builder.addCase(deletecourse.fulfilled, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=true;
            state.courseError=false;
        })
        builder.addCase(deletecourse.rejected, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=false;
            state.courseError=true;
        })
        builder.addCase(getCourseDetail.pending, (state,action)=>{
            state.isCourseLoading=true;
        })
        builder.addCase(getCourseDetail.fulfilled, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=true;
            state.courseError=false;
            state.courseDetails= action.payload.data
        })
        builder.addCase(getCourseDetail.rejected, (state,action)=>{
            state.isCourseLoading=false;
            state.courseSuccess=false;
            state.courseError=true;
            state.courseDetails=null;
        })
        builder.addCase(updateCourse.pending, (state,action)=>{
            state.isCourseLoading=true;
        })
        builder.addCase(updateCourse.fulfilled, (state,action)=>{
            state.isCourseLoading=false;
            state.courseError=false;
            state.isCourseUpdated=true;
        })
        builder.addCase(updateCourse.rejected, (state,action)=>{
            state.isCourseLoading=false;
            state.isCourseUpdated=false;
            state.courseError=true;
        })
    }
})

export const {resetUpdate}= courseSlice.actions