import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";

export const getCourseforBootcamp= createAsyncThunk('course/getCourseforBootcamp',
async(id,thunkAPI)=>{
    let response = await instance.get(`/bootcamps/${id}/courses`)
    .then(res=>res.data)
    .catch(error=>thunkAPI.rejectWithValue(error))

    return response;
})