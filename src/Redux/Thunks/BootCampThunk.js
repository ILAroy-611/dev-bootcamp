import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";

//to get all bootcamps
export const getAllBootcamps = createAsyncThunk(
  "bootcamp/getAllbootcamps",
  async (thunkAPI) => {
    let response = await instance
      .get(`bootcamps`)
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);

//to get single bootcamp
export const getSingleBootcamp = createAsyncThunk(
  "bootcamps/getSingleBootcamp",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    let response = await instance
      .get(`bootcamps/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));

    return response;
  }
);

// to create a bootcamp
export const createBootcamp = createAsyncThunk(
  "bootcamp/createBootcamp",
  async (bootcampObj, thunkAPI) => {
    const token = localStorage.getItem("token");
    let response = await instance
      .post(
        `bootcamps`,
        {
          name: bootcampObj.name,
          description: bootcampObj.description,
          website: bootcampObj.website,
          phone: bootcampObj.phone,
          email: bootcampObj.email,
          address: bootcampObj.address,
          careers: bootcampObj.careers,
          housing: bootcampObj.housing,
          averageCost: bootcampObj.averageCost,
          jobAssistance: bootcampObj.jobAssistance,
          jobGuarantee: bootcampObj.jobGuarantee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);

//to delete a bootcamp

export const deleteBootcamp = createAsyncThunk(
  "bootcamp/delete",
  async (bootcamp_id, thunkAPI) => {
    const token = localStorage.getItem("token");
    let response = await instance
      .delete(`bootcamps/${bootcamp_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));

    return response;
  }
);

//to update a bootcamp
export const editBootcamp = createAsyncThunk(
  "bootcamp/edit",
  async (bootcampObj, thunkAPI) => {
    const token = localStorage.getItem("token");
    let response = await instance
      .put(
        `bootcamps/${bootcampObj._id}`,
        {
          name: bootcampObj.name,
          description: bootcampObj.description,
          website: bootcampObj.website,
          phone: bootcampObj.phone,
          email: bootcampObj.email,
          address: bootcampObj.address,
          careers: bootcampObj.careers,
          housing: bootcampObj.housing,
          averageCost: bootcampObj.averageCost,
          jobAssistance: bootcampObj.jobAssistance,
          jobGuarantee: bootcampObj.jobGuarantee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);
