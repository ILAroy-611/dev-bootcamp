import React, { useEffect } from "react";
import CareerTabs from "./CareerTabs";
import RatingStar from "./RatingStar";
import "../Styles/bootcampcard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getSingleBootcamp } from "../Redux/Thunks/BootCampThunk";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../Redux/Thunks/UserThunk";
import { getCourseforBootcamp } from "../Redux/Thunks/CourseThunk";
import { getReviewsforBootcamp } from "../Redux/Thunks/ReviewThunk";

function BootcampCard({ bootcamp }) {
  const dispatch = useDispatch();
  

  const handleShowBootcamp = () => {
    dispatch(getSingleBootcamp(bootcamp.id));
    dispatch(getSingleUser(bootcamp.user));
    dispatch(getCourseforBootcamp(bootcamp.id));
    dispatch(getReviewsforBootcamp(bootcamp.id));
  };

  

  return (
    <div className="bootcamp-card">
      <div className="bootcamp-img-div">
        <img src={bootcamp?.photo} alt="camp-img" />
      </div>
      <div className="bootcamp-details-container">
        <h2 className="bootcamp-name">{bootcamp?.name}</h2>
        <div className="bootcamp-ratings">
          {bootcamp.averageRating && (
            <RatingStar averageRating={bootcamp?.averageRating} />
          )}
        </div>
        {/* <div className="bootcamp-reviews">Reviews : {}</div> */}
        <div className="bootcamp-description">
          {bootcamp?.description.substring(0, 80)}...
        </div>
        <div className="bootcamp-careers">
          {bootcamp?.careers.map((ele) => (
            <CareerTabs tab_title={ele} />
          ))}
        </div>
        <NavLink
          to={`/bootcamps/${bootcamp?.slug}`}
          className="details-btn btn link"
          onClick={handleShowBootcamp}
        >
          Details
          <i className="fa-solid fa-circle-info"></i>
        </NavLink>
        
      </div>
    </div>
  );
}

export default BootcampCard;
