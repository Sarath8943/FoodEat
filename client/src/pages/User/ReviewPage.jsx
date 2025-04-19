import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: restaurantId } = useParams();

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          `/review/get-all-reviews/${restaurantId}`
        );
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/review/delete/${reviewId}`);

      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (err) {
      alert("Failed to delete review. Please try again.");
      console.error("Delete error:", err);
    }
  };
  const handleSave = async (reviewId) => {
    try {
      await axiosInstance.put(`/review/update/${reviewId}`, {
        comment: editedComment,
      });

      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId
            ? { ...review, comment: editedComment }
            : review
        )
      );
      setEditingReviewId(null);
    } catch (error) {
      alert("Failed to update review.");
      console.error("Update error:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Customer Reviews
      </h1>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {review.username || "Anonymous"}
                </h2>
                <span className="text-yellow-500 text-lg font-bold">
                  {"★".repeat(review.rating || 0)}
                  {"☆".repeat(5 - (review.rating || 0))}
                </span>
              </div>

              {editingReviewId === review._id ? (
                <>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md mt-3 focus:ring focus:ring-blue-300"
                    rows={3}
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleSave(review._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">Comment:</span>{" "}
                    {review.comment || "No comment provided."}
                  </p>
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => {
                        setEditingReviewId(review._id);
                        setEditedComment(review.comment || "");
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No reviews yet for this restaurant.
        </p>
      )}
    </div>
  );
};

export default ReviewPage;
