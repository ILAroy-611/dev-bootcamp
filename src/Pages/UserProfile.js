import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CampReviewsCard from "../Components/CampReviewsCard";
import PasswordModal from "../Components/PasswordModal";
import Spinner from "../Components/Spinner";
import useUser from "../hooks/useUser";
import { getMyReviews } from "../Redux/Thunks/ReviewThunk";
// import { updatePassword } from "../Redux/Thunks/AuthThunk";
import "../Styles/userprofile.css";

function UserProfile() {
  const{user}= useUser();
  
  // const { user, authLoading } = useSelector((state) => state.auth);
  const { myReviews, loading } = useSelector((state) => state.review);

  const dispatch = useDispatch();

  const [openPasswordModal, setOpenPasswordModal] = useState(false);


  useEffect(() => {
    if (user && user.role !== "publisher") {
      dispatch(getMyReviews(user._id));
    }
  }, [user]);


  return (
        <section className="user-profile-page">
          <div className="user-profile-container">
            <div className="user-profile-image">
              <img src="profile_image.png" alt="profile-img" height="80px" />
            </div>
            <div className="user-details name">
              <h3>Name</h3>
              <p>{user?.name}</p>
            </div>
            <div className="user-details email">
              <h3>Email</h3>
              <p>{user?.email}</p>
            </div>
            <div className="user-details role">
              <h3>Role</h3>
              <p>{user?.role}</p>
            </div>
            <div className="profile-options">
              <NavLink to="/edit-profile" className="link btn edit-btn" >
                Edit Profile
              </NavLink >
              <NavLink
                className="link btn change-pword-btn"
                onClick={() => setOpenPasswordModal(!openPasswordModal)}
              >
                Update Password
              </NavLink>
              {openPasswordModal ? (
                <PasswordModal onClose={() => setOpenPasswordModal(false)} />
              ) : (
                <></>
              )}
            </div>
            {loading ? (
              <></>
            ) : user != null && user.role === "user" ? (
              <div className="my-reviews">
                {myReviews[0] ? (
                  <>
                    <h3 className="my-reviews-heading">Reviews I've Posted</h3>
                    {myReviews.map((ele) => (
                      <CampReviewsCard reviewDetail={ele} key={ele.user} />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : user != null && user.role === "publisher" ? (
              <div className="my-bootcamps">
                <h2 className="my-bootcamps-heading">BootCamps Owned by Me</h2>
              </div>
            ) : (
              <></>
            )}
          </div> 
        </section>
  )
}

export default UserProfile;
