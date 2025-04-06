import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const CastamerReview = () => {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [canReview, setCanReview] = useState(false); // NEW: to check if user can review
  console.log("canReview", canReview);
  console.log("isSubmitting", isSubmitting);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  // Fetch reviews
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

  // ✅ NEW: Fetch user orders and validate access to review
  useEffect(() => {

    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const res = await axiosInstance.get("/order/get-all-order", {
          params: { userId },
        });

        const orders = res.data.orders || [];
        console.log("orders", orders);

        // Check if any order matches the restaurant
        const matchedOrder = orders.find(
          (order) => order.restaurant._id === restaurantId
        );
        console.log("matchedOrder", matchedOrder);
        setCanReview(!!matchedOrder);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId, restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Please provide a rating and comment.");
      return;
    }

    // if (!canReview) {
    //   alert("You must place an order at this restaurant before reviewing.");
    //   return;
    // }

    // if (!userId || !username) {
    //   alert("User is not logged in or username is not available");
    //   return;
    // }

    try {
      setIsSubmitting(true);


      const response = await axiosInstance.post("/review/add-review", {
        restaurantId,
        rating:Number(rating),
        comment,
        userId,
        username,
      }
    
    );

      if (response.data) {
        alert("Review submitted successfully");
        navigate("/sa");
      }
    } catch (err) {
      setError(err.message);
      alert("Error submitting review!");
    } finally {
      setIsSubmitting(false);
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
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Customer Reviews
      </h1>

      {/* Display Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  {review.user?.email || "Unknown User"}
                </h2>
                <span className="text-yellow-500 font-bold">
                  {"★".repeat(review.rating || 0)}
                  {"☆".repeat(5 - (review.rating || 0))}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {review.comment || "No comment provided"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reviews available.</p>
      )}

      {/* Review Form */}
      <div className="bg-white p-6 mt-10 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Submit Your Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating (1-5):
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={!canReview || isSubmitting}
            className={`${
              canReview
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white px-6 py-2 rounded-lg transition`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
          {!canReview && (
            <p className="text-sm text-red-500 mt-2">
              * You can only review after placing an order from this restaurant.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CastamerReview;

// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosInstance";
// import { useParams, useNavigate } from "react-router-dom";

// const CastamerReview = () => {
//   const { id: restaurantId } = useParams();
//   const navigate = useNavigate();

//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rating, setRating] = useState(1);
//   const [comment, setComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const userId = localStorage.getItem("userId");
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `/review/get-all-reviews/${restaurantId}`
//         );
//         setReviews(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [restaurantId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!rating || !comment) {
//       alert("Please provide a rating and comment.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       if (!userId || !username) {
//         alert("User is not logged in or username is not available");
//         return;
//       }
//       console.log(restaurantId);
// console.log(rating);
// console.log(comment);
// console.log(userId);
// console.log(username);
// console.log(orderId);

// // uerid vehu odersfatch nammudeoders kittuna response vechu current
// //  response mathccheya athu vidum oder status confirom cheya devired anekill   prosid cheyaa

//       const response = await axiosInstance.post("/review/add-review", {
//         restaurantId,
//         rating,
//         comment,
//         userId,
//         username,

//       });

//       if (response.data) {

//         alert("Review submitted successfully");
//         navigate("/sa");
//       }
//     } catch (err) {
//       setError(err.message);
//       alert("Error submitting review!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500 mt-10">Loading reviews...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Customer Reviews</h1>

//       {/* Display Reviews */}
//       {reviews.length > 0 ? (
//         <div className="space-y-5">
//           {reviews.map((review) => (
//             <div
//               key={review._id}
//               className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-lg font-semibold text-gray-700">
//                   {review.user?.email || "Unknown User"}
//                 </h2>
//                 <span className="text-yellow-500 font-bold">
//                   {"★".repeat(review.rating || 0)}{"☆".repeat(5 - (review.rating || 0))}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">{review.comment || "No comment provided"}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No reviews available.</p>
//       )}

//       {/* Review Form */}
//       <div className="bg-white p-6 mt-10 rounded-xl shadow-lg border border-gray-100">
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">Submit Your Review</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
//               Rating (1-5):
//             </label>
//             <input
//               type="number"
//               id="rating"
//               name="rating"
//               min="1"
//               max="5"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//               Comment:
//             </label>
//             <textarea
//               id="comment"
//               name="comment"
//               rows="4"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             {isSubmitting ? "Submitting..." : "Submit Review"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CastamerReview;
