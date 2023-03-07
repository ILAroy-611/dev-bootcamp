import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";

export const getCourseforBootcamp = createAsyncThunk(
  "course/getCourseforBootcamp",
  async (id, thunkAPI) => {
    let response = await instance
      .get(`/bootcamps/${id}/courses`)
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error));

    return response;
  }
);

export const createCourse = createAsyncThunk(
  "course/create",
  async ({ course, bootcamp_id }, thunkAPI) => {
    const token = localStorage.getItem("token");
    console.log(course,bootcamp_id)
    let response = await instance
      .post(
        `bootcamps/${bootcamp_id}/courses`,
        {
          title: course.title,
          description: course.description,
          weeks: course.weeks,
          tuition: course.tuition,
          minimumSkill: course.minimumSkill,
          scholarhipsAvailable: course.scholarhipsAvailable,
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
