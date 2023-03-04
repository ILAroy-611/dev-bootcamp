import { useState } from "react";
import "../Styles/reviewcard.css";

function ReviewCard({ title, text, reviewer, reviewer_role }) {
  const [showFullReview, setShowFullReview] = useState(false);

  return (
    <div className="review-card">
      <div className="review-card-container">
        <h3 className="review-title">{title}</h3>
        {showFullReview || text.length < 121 ? (
          <p className="review" onClick={() => setShowFullReview(!showFullReview)}>{text}</p>
        ) : (
          <p className="review"
            onClick={() => setShowFullReview(!showFullReview)}
          >
            {text.substring(0, 120)}
              ...
          </p>
        )}
        <p className="reviewer">{reviewer}</p>
        <p className="reviewer-role">{reviewer_role}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
