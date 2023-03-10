import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, editReview, getReviewUsers } from "../Redux/Thunks/ReviewThunk";
// import { getSingleUser } from "../Redux/Thunks/UserThunk";
import RatingStar from "./RatingStar";
import "../Styles/CampReviewsCard.css";
import EditReviewModal from "./EditReviewModal";
import useUser from "../hooks/useUser";

function CampReviewsCard({ reviewDetail }) {
  const {user} = useUser();
  const dispatch = useDispatch();

  const[openEditReviewModal, setOpenEditReviewModal]= useState(false)

  const date = new Date(reviewDetail?.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
  });

  const { reviewUsers } = useSelector((state) => state.review);
  // const { user } = useSelector((state) => state.auth);


  const handleDeleteReview=()=>{
    dispatch(deleteReview(reviewDetail._id));
  }  

  useEffect(() => {
    dispatch(getReviewUsers(reviewDetail.user));
    // console.log('inside review card useeffect')
  }, [reviewDetail]);

  let review_user = [];

  review_user = reviewUsers.filter((ele) => ele._id == reviewDetail.user);

  return (
    <div className="campreviews-card">
      <div className="campreviews-card-container">
        <div className="detailed-bootcamp-ratings">
          <RatingStar averageRating={reviewDetail?.rating} />
          <div className="bootcamp-reviews-time">{date}</div>
        </div>
        <div className="bootcamp-reviews-div">
          <h3 className="bootcamp-reviews-title">{reviewDetail?.title}</h3>
          <p className="bootcamp-reviews-text">{reviewDetail?.text}</p>
        </div>
        <h5 className="bootcamp-reviews-user flex">
          {/* {reviewDetail?.user} */}
          <p className="review-user">{review_user[0] && review_user[0].name}</p>
          {
            review_user[0] && review_user[0].name==user.name?
            <div className="bootcamp-reviews-action-bar flex">
              <button className="edit-review-btn btn " onClick={()=>setOpenEditReviewModal(!openEditReviewModal)} >Edit Review</button>
              {openEditReviewModal ? <EditReviewModal reviewDetail={reviewDetail} onClose={()=>setOpenEditReviewModal(false)}/> : <></> }
              <button className="delete-review-btn btn" onClick={handleDeleteReview}>Delete Review</button>
            </div>
            :
            <></>
          }
        </h5>
      </div>
    </div>

  );
}

export default CampReviewsCard;
