import { useState } from "react";
import "../Styles/register.css";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Thunks/AuthThunk";
import { useNavigate } from "react-router-dom";


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {isLoggedIn} = useSelector(state=>state.auth);

  const [user, setUser] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:"",
    role:""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let checkbox= document.getElementsByName('checks')
  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.password===user.confirmPassword){
        if(checkbox[0].checked && checkbox[1].checked){
        dispatch(register({name:user.name,email:user.email,password:user.password,role:user.role.toLowerCase()}));
        navigate("/me");
        }
        else{
            alert('Please tick the checkboxes')
        }
    }
    else{
        alert('Confirm Password')
    }
  };

  return (
    <main>
      <div className="register-container">
        <h2 className="register-form-title">Register</h2>
        <fieldset className="register-form">
          <label>
            <input
              type="text"
              className="full-name"
              name="name"
              placeholder="Enter your Full-Name"
              value={user.name}
              onChange={handleChange}
            />
          </label>
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
          <div className="role-div">
            <input
              type="text"
              className="role"
              name="role"
              placeholder="User / Publisher ?"
              value={user.role}
              onChange={handleChange}
            />
            <div className="role-info">
            <p>Select User if you want to enroll in a bootcamp.</p>
            <p>Select Publisher if you want to advertise your bootcamp. </p>
          </div>
          </div>
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
          <label>
            <input
              type="password"
              className="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <div className="terms-policy-checks">
          <input type="checkbox" name="checks" value="privacy" className="privacy-policy-check" /> 
          I have read and accept the Privacy Policy.
          <br />
          <input type="checkbox" name="checks" value="terms" className="terms-check" /> 
          I have read and accept your Terms of service.
          <br />
        </div>
        <button className="btn register-btn" onClick={handleSubmit}>
            Register
          </button>
      </div>
    </main>
  );
}

export default Register;
