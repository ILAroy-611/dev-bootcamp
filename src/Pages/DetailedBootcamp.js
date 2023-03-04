import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AddReviewModal from "../Components/AddReviewModal";
import CampReviewsCard from "../Components/CampReviewsCard";
import CareerTabs from "../Components/CareerTabs";
import RatingStar from "../Components/RatingStar";
import Spinner from "../Components/Spinner";
import { deleteBootcamp } from "../Redux/Thunks/BootCampThunk";
import "../Styles/detailedbootcamp.css";

function DetailedBootcamp() {
  const dispatch = useDispatch();

  const [openAddReviewModal, setAddReviewModal] = useState(false);

  const { isBootcampLoading, bootcampDetails } = useSelector(
    (state) => state.bootcamp
  );

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const { userInfo } = useSelector((state) => state.user);

  const { courseCountperBootcamp, coursesForBootcampArray, courseSuccess } =
    useSelector((state) => state.course);

  const { loading, reviewsforBootcamp, reviewsCountperBootcamp } = useSelector(
    (state) => state.review
  );

  const newDate = new Date(bootcampDetails?.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
  });

  const handleDeleteBootcamp = () => {
    dispatch(deleteBootcamp(bootcampDetails._id));
  };

  return (
    <>
      {isBootcampLoading ? (
        <></>
      ) : (
        <>
          <div className="detailed-bootcamp-container">
            <div className="detailed-bootcamp-content flex">
              <div className="detailed-bootcamp">
                <h2 className="detailed-bootcamp-name">
                  {bootcampDetails?.name}
                </h2>
                <div className="detailed-bootcamp-description">
                  {bootcampDetails?.description}
                </div>
                <div className="detailed-bootcamp-ratings">
                  {bootcampDetails.averageRating && (
                    <RatingStar
                      averageRating={bootcampDetails?.averageRating}
                    />
                  )}
                </div>
                {/* <div className="detailed-bootcamp-reviews">Reviews : {}</div> */}
                <div className="detailed-bootcamp-created-info">
                  <ul>
                    <li>Created by : {userInfo?.name}</li>
                    <li>Created at : {newDate}</li>
                    <li>Website : {bootcampDetails?.website}</li>
                  </ul>
                </div>
                <div className="detailed-bootcamp-cost">
                  Average Cost : &#8377;{bootcampDetails?.averageCost}
                </div>
                <div className="detailed-bootcamp-careers">
                  {bootcampDetails?.careers.map((ele) => (
                    <CareerTabs key={ele} tab_title={ele} />
                  ))}
                </div>
              </div>
              <div className="bootcamp-courses-container courses">
                <h3 className="bt-courses-heading">Courses Offered</h3>
                <p className="bt-courses-text">
                  This Bootcamp offers you {courseCountperBootcamp} Courses :
                </p>
                <ol>
                  {courseSuccess ? (
                    coursesForBootcampArray.map((e) => {
                      return <li key={e._id}>{e.title}</li>;
                    })
                  ) : (
                    <></>
                  )}
                </ol>
                {isLoggedIn && user?._id === userInfo?._id && user?.role=='publisher' ? (
                  <div className="detailed-bootcamp-course-action-btns">
                    <NavLink
                      to={`/bootcamps/${bootcampDetails._id}/courses`}
                      className="add-course-btn btn link"
                    >
                      Add Course
                    </NavLink>
                    <NavLink
                      to={`/bootcamps/${bootcampDetails._id}`}
                      className="update-bootcamp-btn btn link"
                    >
                      Update Course
                    </NavLink>
                    <NavLink
                      className="delete-bootcamp-btn btn link"
                      onClick={handleDeleteBootcamp}
                    >
                      Delete Course
                    </NavLink>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {isLoggedIn && user?._id === userInfo?._id && user?.role=='publisher' ? (
              <div className="detailed-bootcamp-action-btns">
                <NavLink
                  to={`/bootcamp/${bootcampDetails._id}/edit`}
                  className="update-bootcamp-btn btn link"
                >
                  Update Bootcamp
                </NavLink>
                <NavLink
                  className="delete-bootcamp-btn btn link"
                  onClick={handleDeleteBootcamp}
                >
                  Delete
                </NavLink>
              </div>
            ) : (
              <></>
            )}
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="detailed-bootcamp-reviews">
              <div className="bootcamp-review-titlebar flex">
                <h3 className="bootcamp-reviews-heading">
                  {reviewsCountperBootcamp} Reviews
                </h3>
                {isLoggedIn && (
                  <button
                    className="add-review btn"
                    onClick={() => setAddReviewModal(!openAddReviewModal)}
                  >
                    Add Review
                  </button>
                )}
                {openAddReviewModal ? (
                  <AddReviewModal
                    onClose={() => setAddReviewModal(false)}
                    bootcamp_id={bootcampDetails._id}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="bootcamp-reviews-container">
                {reviewsforBootcamp.map((ele, index) => {
                  return <CampReviewsCard reviewDetail={ele} key={ele.user} />;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default DetailedBootcamp;
