import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams, useHistory } from "react-router-dom";

const CastamerReview = () => {
  const { id: restaurantId } = useParams(); // This will get the restaurantId from the URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(1); // Default rating
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState(""); // Assuming the username is available
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory(); // To redirect after successful review submission

  useEffect(() => {
    // Fetch reviews for this restaurant
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/${restaurantId}/get-all-reviews`);
        console.log('Reviews Response:', response);
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      setIsSubmitting(true);
      const userId = localStorage.getItem("userId"); // Assume user ID is stored in localStorage
      if (!userId || !username) {
        alert("User is not logged in or username is not available");
        return;
      }

      const response = await axiosInstance.post("/review/add-review", {
        restaurantId,
        rating,
        comment,
        userId,
        username, // Pass the username (you can get it from localStorage or state if logged in)
      });

      if (response.data) {
        alert("Review submitted successfully!");
        // Redirect to the restaurant's review page after submission
        history.push(`/restaurant/${restaurantId}/reviews`);
      }
    } catch (err) {
      setError(err.message);
      alert("Error submitting review!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-5">
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-card p-2 pt-3">
            <h2>User: {review.user?.email || "Unknown"}</h2>
            <p>Rating: {review.rating || "N/A"}</p>
            <p>Comment: {review.comment || "No review text provided"}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}

      {/* Review Form */}
      <div className="review-form mt-4">
        <h3>Submit your review</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CastamerReview;
