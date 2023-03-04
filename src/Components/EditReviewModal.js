import { useState } from "react";
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux";
import { editReview } from "../Redux/Thunks/ReviewThunk";


function EditReviewModal({onClose, reviewDetail}) {

    const [editReviewObj, setReviewObj] = useState({
        title: reviewDetail.title,
        text: reviewDetail.text,
        rating:reviewDetail.rating,
      });

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const{isReviewEdited}= useSelector(state=>state.review)

    const handleChange = (e) => {
        setReviewObj({ ...editReviewObj, [e.target.name]: e.target.value });
      };

  const handleEditReview = () => {
    dispatch(editReview({review_id: reviewDetail._id,title:editReviewObj.title,text:editReviewObj.text,rating:editReviewObj.rating }))
  };

  return createPortal(
    <div className="add-review-modal-container">
      <h2 className="add-review-heading">Edit Review</h2>
      <input
        type="text"
        name="title"
        className="review-title"
        // placeholder="Provide new title for review"
        onChange={handleChange}
        value={editReviewObj.title}
        required
      />
      <textarea
        name="text"
        className="review-text"
        // placeholder="Write review here"
        onChange={handleChange}
        value={editReviewObj.text}
        required
      />
      <input
        type="text"
        name="rating"
        className="review-rating"
        // placeholder="Provide rating for this bootcamp"
        value={editReviewObj.rating}
        onChange={handleChange}
        required
      />
      <div className="add-review-modal-action-bar flex">
        <button className="submit-review-btn btn" onClick={handleEditReview}>
          Update Review
        </button>
        <button className="cancel-btn btn" onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.getElementById('root-modal')
  )
}

export default EditReviewModal