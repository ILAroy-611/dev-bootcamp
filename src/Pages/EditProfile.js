import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../Redux/Thunks/AuthThunk";


function EditProfile() {

    const{user}= useSelector(state=>state.auth);

    const dispatch=useDispatch();
    const navigate = useNavigate();

    const [updateUser, setUpdateUser] = useState({
        name:user.name,
        email:user.email,
        role:user.role
    })

    const handleChange=(e)=>{
        setUpdateUser({...updateUser, [e.target.name]:e.target.value})
    }

    const handleProfileUpdate=(e)=>{
        e.preventDefault();
        dispatch(updateProfile(updateUser));
        navigate('/me')
    }

  return (
    <form>
        <fieldset>
            <label>
                <input 
                type='text'
                className="username" 
                name='name'
                value={updateUser.name}
                onChange={handleChange}
                />
            </label>
            <label>
                <input 
                type='email'
                className="email" 
                name='email'
                value={updateUser.email}
                onChange={handleChange}
                />
            </label>
            <label>
                <input 
                type='text'
                className="role" 
                name='role'
                value={updateUser.role}
                onChange={handleChange}
                />
            </label>
        </fieldset>
        <button className="update-details-btn btn" onClick={handleProfileUpdate}>Update Profile</button>
    </form>
  )
}

export default EditProfile