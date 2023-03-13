import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserProfile from './Pages/UserProfile';
import EditProfile from './Pages/EditProfile';
import { getLoggedInUser } from './Redux/Thunks/AuthThunk';
import Spinner from './Components/Spinner';
import Bootcamp from './Pages/Bootcamp';
import DetailedBootcamp from './Pages/DetailedBootcamp';
import CreateBootcamp from './Pages/CreateBootcamp';
import UpdateBootcamp from './Pages/UpdateBootcamp';
import CreateCourses from './Pages/CreateCourses';
import useUser from './hooks/useUser';
import { UserProvider } from './hooks/UserProvider';
import EditCourse from './Pages/EditCourse';



function App() {

  const dispatch = useDispatch();
  const {user}= useUser();
  
  const { isLoggedIn, authloading } = useSelector(state => state.auth)


  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     dispatch(getLoggedInUser(localStorage.getItem('token')))
  //   }
  // }, [isLoggedIn])

  // useEffect(() => {
  //   console.log("userPresent , Inside App component");
  // })
  


  return (
    <UserProvider>
      {authloading ?
        <Spinner />
        :
        <div className="App">
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={ <Register /> }></Route>
            <Route path='/bootcamps' element={ <Bootcamp/> }></Route>
            <Route exact path='/bootcamps/createNew' element={ <CreateBootcamp/> }></Route>
            <Route exact path='/bootcamp/:id/edit' element={ < UpdateBootcamp /> }></Route>
            <Route exact path='/bootcamps/:slug' element={ <DetailedBootcamp /> }></Route>
            <Route exact path='/bootcamps/:id/courses' element={ < CreateCourses /> }></Route>
            <Route exact path='/courses/:courseId' element={ < EditCourse /> }></Route>
            <Route path='/me' element={<UserProfile />}></Route>
            <Route path='/edit-profile' element={<EditProfile />}></Route>
          </Routes>
        </div>
      }
    </UserProvider>

  );
}

export default App;
