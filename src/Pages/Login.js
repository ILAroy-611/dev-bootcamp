import { useEffect, useState } from 'react'
import '../Styles/login.css'
import { useDispatch } from "react-redux";
// import { login } from '../Redux/Thunks/AuthThunk';
import {useNavigate} from "react-router-dom"
// import useLogin from '../hooks/useLogin';
import useUser from '../hooks/useUser';


function Login() {
  const {loginUser} = useUser();
    const dispatch = useDispatch();
    const navigate= useNavigate();
    // const {isLoggedIn} = useSelector(state=>state.auth);

    const [user, setUser] = useState({
        email:'',
        password:'',
    })

    const handleChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    
     async function handleSubmit(e){
        e.preventDefault();
        const isLoggedIn=await loginUser(user);
        console.log('isLoggedIn',isLoggedIn)
        // dispatch(login(user));

        if(isLoggedIn){
          navigate('/me')}
          window.location.reload()
    }

    // useEffect(()=>{
    //   if(isLoggedIn){
    //     navigate('/')
    //   }
    // },[isLoggedIn])

  return (
    <main>
      <div className="login-container">
      <h2 className='login-form-title'>Login</h2>
        <fieldset className="login-form">
          <label>
            <input
              type="email"
              className="email"
              name="email"
              placeholder="Enter your Email-id"
              value={user.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="password"
              className="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <button className="btn login-btn" onClick={handleSubmit}>Login</button>
      </div>
    </main>
  );
}

export default Login;
