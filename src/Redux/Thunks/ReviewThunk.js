import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";

const token = localStorage.getItem("token");
console.log("token", token);

export const getALlReviews = createAsyncThunk(
  "review/getAllReviews",
  async (thunkAPI) => {
    const res = await instance
      .get(`reviews?limit=6`)
      .then((res) => {
        // console.log('then', res)
        return res.data.data;
      })
      .catch((error) => {
        // console.log('catch',error)
        // return error.response.data.error
        return thunkAPI.rejectWithValue(error);
      });
    return res;
  }
);

//to get reviews for a particular bootcamp
export const getReviewsforBootcamp = createAsyncThunk(
  "review/getReviewsforBootcamp",
  async (id, thunkAPI) => {
    const res = await instance
      .get(`/bootcamps/${id}/reviews`)
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));

    return res;
  }
);

//to get reviewUsers
export const getReviewUsers = createAsyncThunk(
  "review/getSingleUser",
  async (userId, thunkAPI) => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    const res = await instance
      .get(`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
    return res;
  }
);

//to add review for a bootcamp
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ bootcamp_id, title, rating, text }, thunkAPI) => {
    const token = localStorage.getItem("token");
    console.log('token', token)
    // console.log(bootcamp_id, title, rating, text);
    let response = await instance
      .post(
        `bootcamps/${bootcamp_id}/reviews`,
        {
          text,
          title,
          rating,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    // console.log("response", response);
    return response;
  }
);

//to edit the review
export const editReview = createAsyncThunk(
  "review/editReview",
  async ({ review_id, text, title, rating }, thunkAPI) => {
    let response = await instance
      .put(
        `reviews/${review_id}`,
        {
          title,
          text,
          rating,
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

//to delete the review

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (review_id, thunkAPI) => {
    let response = await instance
      .delete(`reviews/${review_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));
    return response;
  }
);

//to get reviews of the logged-in user
export const getMyReviews= createAsyncThunk('review/getMyReviews',
async(loggedin_user_id, thunkAPI)=>{
  let response = await instance.get(`/reviews?user=${loggedin_user_id}`,{
    headers:{
      "Authorization": `Bearer ${token}`
    }
  }).then(res=>res.data).catch(error=>thunkAPI.rejectWithValue(error)) ;
  return response ;
})
