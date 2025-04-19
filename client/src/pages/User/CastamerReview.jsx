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
  const [orderId, setOrderId] = useState(null); // NEW: to store order ID if needed

  const [canReview, setCanReview] = useState(false); // NEW: to check if user can review
 

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
        

        // Check if any order matches the restaurant
        const matchedOrder = orders.find(
          (order) => order.restaurant._id === restaurantId
        );
        
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

     if (!canReview) {
      alert("You must place an order at this restaurant before reviewing.");
       return;
     }

     if (!userId || !username) {
       alert("User is not logged in or username is not available");
      return;
     }

    try {
      setIsSubmitting (true);


      const response = await axiosInstance.post("/review/add-review", {
        restaurantId,
        rating,
        comment,
        userId,
        username,
      }

    
    );
    if(!response ){
      alert("ing review! Please try again later.");}

    console.log("responsefffff", response.data);
    if (response.data.message === "You have no delivered orders for this restaurant. Please wait until your order is delivered.") {
      alert( "You have no delivered orders for this restaurant. Please wait until your order is delivered.");
      return;
    }

    if ( response.data.message === "You can only submit one review per delivered order for this restaurant.") {
      alert("You can only submit one review per delivered order for this restaurant.");
      return;
      
    }


      if (response.data.message === "Review submitted successfully") {
        alert("Review submitted successfully");
        navigate(`/reviews/${restaurantId}`);
        
      }
    } catch (err) {
      setError(err.message);
      alert("Error submitting review!",error);
      console.error("Error submitting review:", err);
      console.log("Error message:", err.message);
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
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_-10px_rgba(0,0,0,0.3)] border border-blue-100 animate-fade-in">
    <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-14 tracking-tight drop-shadow-sm">
      🌟Customer Reviews
    </h1>
  
    {reviews.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-10">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="relative p-6 rounded-2xl border bg-white/90 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:scale-[1.015] transition-all duration-300 group overflow-hidden"
          >
            {/* Floating Accent */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition duration-300"></div>
  
            {/* User Info */}
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-lg flex items-center justify-center shadow-inner ring-2 ring-white mr-4">
                {review.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-900">
                  {review.username || "Anonymous"}
                </h2>
                <p className="text-xs text-gray-500">Reviewed on April 2025</p>
              </div>
            </div>
  
            {/* Rating Stars */}
            <div className="mb-4">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-semibold shadow-inner tracking-wide">
                {Array.from({ length: 5 }, (_, i) =>
                  i < review.rating ? "★" : "☆"
                ).join("")}
              </div>
            </div>
  
            {/* Review Text */}
            <p className="text-gray-700 text-base leading-relaxed font-light tracking-wide">
              “{review.comment || "No comment provided."}”
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 italic text-lg">
        😔 No reviews yet. Be the first to share your experience!
      </p>
    )}
  

      {/* Review Form */}
     <div className="relative max-w-3xl mx-auto mt-20 px-6 py-10 bg-white/30 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] rounded-3xl backdrop-blur-xl overflow-hidden animate-fade-in">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100 opacity-30 rounded-3xl pointer-events-none"></div>

  <h2 className="relative text-4xl font-extrabold text-center text-blue-700 mb-10 tracking-tight">
    ✍️Share Your Experience
  </h2>

  <form onSubmit={handleSubmit} className="relative space-y-10 z-10">

    {/* Star Rating */}
    <div>
      <label className="block text-gray-700 font-medium mb-2 text-base">
        Your Rating:
      </label>
      <div className="flex space-x-2 text-3xl justify-start">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setRating(num)}
            className={`transition-all duration-200 ease-in-out transform ${
              num <= rating
                ? "text-yellow-400 scale-110 drop-shadow-md"
                : "text-gray-300 hover:text-yellow-400"
            } hover:scale-125`}
            aria-label={`Rate ${num}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>

    {/* Comment */}
    <div className="relative">
      <textarea
        id="comment"
        name="comment"
        rows="5"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write something awesome..."
        required
        className="peer w-full px-6 pt-6 pb-3 bg-white/80 text-gray-800 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 placeholder-transparent transition-all"
      />
      <label
        htmlFor="comment"
        className="absolute left-6 top-3 text-gray-500 text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-600 transition-all"
      >
        Your Comment
      </label>
    </div>

    {/* Submit Button */}
    <div className="text-center">
    <button
            type="submit"
            disabled={!canReview || isSubmitting}
            className={`${
              canReview
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white px-6 py-2 rounded-lg transition`}
          >
            {isSubmitting ? "Submit" : "Submit Review"}
          </button>
      {!canReview && (
        <p className="text-sm text-red-500 mt-3 italic">
          * You must place an order at this restaurant to leave a review.
        </p>
      )}
    </div>
  </form>
</div>


    </div>
  );
};

export default CastamerReview;
