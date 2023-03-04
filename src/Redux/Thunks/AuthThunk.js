import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";

const token = localStorage.getItem("token");
// console.log(token)

//Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    let response = await instance
      .post(
        `auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));

    //   console.log(response)
    return response;
  }
);

//get logged in user-details using token
export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async (token, thunkAPI) => {
    let response = await instance
      .get(`auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);

//Regsiter a user
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, role }, thunkAPI) => {
    let response = await instance
      .post(
        `auth/register`,
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);

//Update name and email of logged-in user
export const updateProfile = createAsyncThunk(
  "auth/updateProflie",
  async ({ name, email }, thunkAPI) => {
    // console.log(token)
    let response = await instance
      .put(
        `auth/updatedetails`,
        {
          name,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);

//to change password of logged-in user
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ newPassword, currentPassword }, thunkAPI) => {
    let response = await instance
      .put(
        `auth/updatepassword`,
        {
          newPassword,
          currentPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);
