import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/get-all-reviews/${id}`);
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Reviews</h1>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {review.user?.email || "Unknown User"}
                </h2>
                <span className="text-yellow-500 text-sm font-bold">
                  {"★".repeat(review.rating || 0)}{"☆".repeat(5 - (review.rating || 0))}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-medium">Comment:</span>{" "}
                {review.comment || "No review text provided"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewPage;
