import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { updateProfile } from "../Redux/Thunks/AuthThunk";

function EditProfile() {
  // const{user}= useSelector(state=>state.auth);
  const { user, updateUserProfile } = useUser();
  console.log("user in editprofile page", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  async function handleProfileUpdate(e) {
    e.preventDefault();
    // dispatch(updateProfile(updateUser));
    let isUserUpdated = await updateUserProfile(updateUser);
    if (isUserUpdated) {
      navigate("/me");
    }
  }

  return (
        <form>
          <fieldset>
            <label>
              <input
                type="text"
                className="username"
                name="name"
                placeholder={user?.name}
                value={updateUser.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                type="email"
                className="email"
                name="email"
                placeholder={user?.email}
                value={updateUser.email}
                onChange={handleChange}
              />
            </label>
            {/* <label>
              <input
                type="text"
                className="role"
                name="role"
                value={user?.role}
                disabled
              />
            </label> */}
          </fieldset>
          <button
            className="update-details-btn btn"
            onClick={handleProfileUpdate}
          >
            Update Profile
          </button>
        </form>
  );
}

export default EditProfile;
