import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    // Fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/${id}/get-all-reviews`);
        console.log('responseeeee',response)
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-5">
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-card p-2 pt-3  ">
            <h2>User: {review.user?.email || "Unknown"}</h2>
            <p>rating: {review.rating || "N/A"}</p>
            <p>comment: {review.comment|| "No review text provided"}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewPage;


// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosInstance";
// import { useParams } from "react-router-dom";

// const ReviewPage = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   // State for new review
//   const [rating, setRating] = useState("");
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     // Fetch reviews from the backend
//     const fetchReviews = async () => {
//       try {
//         const response = await axiosInstance.get(`/review/${id}/get-all-reviews`);
//         setReviews(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [id]); // Add id as a dependency to refetch when id changes

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSuccessMessage("");

//     try {
//       const response = await axiosInstance.post("/review/add-review", {
//         productId: id, // Assuming you are adding a review for a product
//         rating,
//         comment,
//       });

//       // Update reviews list after successful submission
//       setReviews([...reviews, response.data]);
//       setRating("");
//       setComment("");
//       setSuccessMessage("Review added successfully!");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong!");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p>Loading reviews...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="px-5">
//       <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//       {/* Review Writing Box */}
//       <form onSubmit={handleSubmit} className="mb-5 p-4 border border-gray-300 rounded-lg">
//         <h2 className="text-xl font-semibold mb-2">Write a Review</h2>

//         {/* Rating Input */}
//         <label className="block mb-2">
//           Rating (1-5):
//           <input
//             type="number"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             min="1"
//             max="5"
//             required
//             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//           />
//         </label>

//         {/* Comment Input */}
//         <label className="block mb-2">
//           Comment:
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//           ></textarea>
//         </label>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
//         >
//           {submitting ? "Submitting..." : "Submit Review"}
//         </button>

//         {/* Success Message */}
//         {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//       </form>

//       {/* Displaying Reviews */}
//       {reviews.length > 0 ? (
//         reviews.map((review) => (
//           <div key={review._id} className="p-3 border border-gray-200 rounded-lg mb-3">
//             <h2 className="font-semibold">User: {review.user?.email || "Unknown"}</h2>
//             <p className="text-yellow-500">⭐ Rating: {review.rating || "N/A"}</p>
//             <p>{review.comment || "No review text provided"}</p>
//           </div>
//         ))
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default ReviewPage;

