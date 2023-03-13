import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./AxiosInstance";


//to get all courses for a bootcamp
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


//to add a course to a bootcamp
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

//to delete a course from bootcamp-
export const deletecourse= createAsyncThunk('course/delete',
async(courseId, thunkAPI)=>{
  try{
    const response = await instance.delete(`courses/${courseId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    return response.data;
  }
  catch(error){
    console.error(error);
    return thunkAPI.rejectWithValue(error)
  }
  
})

// to get a course
export const getCourseDetail =  createAsyncThunk('course/get',
async(courseId, thunkAPI)=>{
  try{
    let response = await instance.get(`courses/${courseId}`)
    return response.data
  }
  catch(error){
    console.error(error)
    return thunkAPI.rejectWithValue(error)
  }
})

//to edit/update a course in a bootcamp-
export const updateCourse = createAsyncThunk('course/update',
async(editedCourse, thunkAPI)=>{
  try{
    let response = await instance.put(`courses/${editedCourse.courseId}`,
    {
        title: editedCourse.title,
        description: editedCourse.description,
        weeks: editedCourse.weeks,
        tuition: editedCourse.tuition,
        minimumSkill: editedCourse.minimumSkill,
        scholarhipsAvailable: editedCourse.scholarhipsAvailable,
    },
    {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      
    })
    return response.data
  }
  catch(error){
    console.error(error);
    return thunkAPI.rejectWithValue(error)
  }
})