import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slices/AuthSlice';
import { bootcampSlice } from './Slices/BootcampSlice';
import { courseSlice } from './Slices/CourseSlice';
import { reviewSlice } from './Slices/ReviewSlice';
import { userSlice } from './Slices/UserSlice';



const store = configureStore({
    reducer:{
        review: reviewSlice.reducer,
        user: userSlice.reducer,
        auth: authSlice.reducer,
        bootcamp: bootcampSlice.reducer,
        course: courseSlice.reducer,
    }
})

export default store;