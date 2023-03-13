import { createPortal } from "react-dom";
import "../Styles/addreviewmodal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addReview } from "../Redux/Thunks/ReviewThunk";
import { resetAddReview } from "../Redux/Slices/ReviewSlice";


function AddReviewModal({bootcamp_id, onClose}) {

    const [reviewObj, setReviewObj] = useState({
        title: "",
        text: "",
        rating:"",
      });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{isReviewAdded}= useSelector(state=>state.review)

    const handleChange = (e) => {
        setReviewObj({ ...reviewObj, [e.target.name]: e.target.value });
      };

  const handleAddReview = () => {
    dispatch(addReview({bootcamp_id,title:reviewObj.title,text:reviewObj.text,rating:reviewObj.rating }));
    dispatch(resetAddReview())
  };

  useEffect(()=>{
    if(isReviewAdded){
      console.log('lets try to navigate after writing a review')
      navigate('/bootcamps')
    }
  },[isReviewAdded])
 

  return createPortal(
    <div className="add-review-modal-container">
      <h2 className="add-review-heading">Add Review</h2>
      <input
        type="text"
        name="title"
        className="review-title"
        placeholder="Provide title for review"
        onChange={handleChange}
        value={reviewObj.title}
        required
      />
      <textarea
        name="text"
        className="review-text"
        placeholder="Write review here"
        onChange={handleChange}
        value={reviewObj.text}
        required
      />
      <input
        type="text"
        name="rating"
        className="review-rating"
        placeholder="Provide rating for this bootcamp"
        value={reviewObj.rating}
        onChange={handleChange}
        required
      />
      <div className="add-review-modal-action-bar flex">
        <button className="submit-review-btn btn" onClick={handleAddReview}>
          Submit Review
        </button>
        <button className="cancel-btn btn" onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.getElementById("root-modal")
  );
}

export default AddReviewModal;
