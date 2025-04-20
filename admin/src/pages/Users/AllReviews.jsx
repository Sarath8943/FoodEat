// import React, { useEffect, useState } from 'react';

// const AllReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch reviews from the backend
//   useEffect(() => {
//     fetch('https://your-api-url.com/api/reviews')
//       .then(res => res.json())
//       .then(data => {
//         setReviews(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Failed to fetch reviews:', err);
//         setLoading(false);
//       });
//   }, []);

//   // Delete review by ID
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this review?');
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`https://your-api-url.com/api/reviews/${id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok) {
//         setReviews(reviews.filter((review) => review._id !== id));
//       } else {
//         alert('Failed to delete the review.');
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       alert('An error occurred while deleting the review.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">All Reviews (Admin)</h1>

//       {loading ? (
//         <p>Loading reviews...</p>
//       ) : reviews.length === 0 ? (
//         <p className="text-gray-500">No reviews found.</p>
//       ) : (
//         <div className="space-y-4">
//           {reviews.map((review) => (
//             <div
//               key={review._id}
//               className="bg-white shadow rounded-lg p-4 flex justify-between items-start"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold">{review.userName}</h3>
//                 <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
//                 <p className="text-gray-700 mt-2">{review.comment}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(review._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllReviews;
