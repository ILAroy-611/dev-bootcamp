import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";

const token= localStorage.getItem('token');
// console.log(token);

export const getALlusers = createAsyncThunk(
  "user/getALlusers",
  async (thunkAPI) => {
    const res = await instance
      .get(`users`)
      .then(res => {
        return res.data.data })
      .catch(error => {
        // return error.response.data
        return thunkAPI.rejectWithValue(error);
    });
    return res;
  }
);

//to get a single user
export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (userId,thunkAPI) => {
    const res = await instance
      .get(`users/${userId}`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res => {
        return res.data.data })
      .catch(error => {
        return thunkAPI.rejectWithValue(error);
    });
    return res;
  }
);


