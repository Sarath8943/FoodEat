const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const MenuItems = require('../models/menuItemModel');
const Review = require('../models/reviewModel');
const Restaurant = require('../models/restaurantModel');
const { calculateAverageRating } = require('../utils/ratingUtils');

exports.addReview = async (req, res) => {
  try {
    const { userId, username, restaurantId, rating, comment } = req.body;

    // Check if userId exists
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Check if all required fields are provided
    if (!restaurantId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find all the orders by userId and restaurantId
    const orders = await Order.find({ user: userId, restaurant: restaurantId });

    // Filter for orders that have status 'delivered'
    const deliveredOrders = orders.filter(order => order.status === "delivered");
    console.log("deliveredOrders", deliveredOrders);

    if (deliveredOrders.length === 0) {
      return res.send({
        message: "You have no delivered orders for this restaurant. Please wait until your order is delivered."
      });
    }

    // Check if the user has already reviewed this restaurant for a delivered order
    const existingReview = await Review.findOne({
      userId: userId,
      restaurantId: restaurantId,
      username: username,
    });

    if (existingReview) {
      return res.send({
        message: "You can only submit one review per delivered order for this restaurant."
      });
    }

    // Proceed with creating the new review
    const newReview = new Review({
      userId: userId,
      restaurantId: restaurantId,
      rating,
      comment,
      username: username,
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Optionally: Update the restaurant's average rating (assuming you have a function to calculate the average rating)
    const averageRatingRestaurant = await calculateAverageRating(Restaurant, restaurantId);
    
    // Update the restaurant's rating in the database
    await Restaurant.findByIdAndUpdate(restaurantId, { rating: averageRatingRestaurant });

    res.status(201).json({ message: "Review submitted successfully", savedReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: error.message, });
  }
};


// exports.addReview = async (req, res) => {
//   try {
   
    
//     const { userId,username, restaurantId, rating, comment } = req.body;
  

//     // Check if userId exists
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }
//     if (!username) {
//       return res.status(400).json({ message: "Username is required" });
//     }

//     // Find the order
//     const order = await Order.findOne(restaurantId.id);
//     console.log("ordegqgsasasasjr",order);

//     let isMatch = false;
//     // Check if the order contains a menu item from the restaurant
//     // order.cartId.items.some((item) => {
//     //   if (item.foodId.restaurant.toString() === restaurantId.toString()) {
//     //     isMatch = true;
//     //   }
//     //   return isMatch;
//     // });

//     // If order status is not 'delivered', reject the review
//     if (order.status !== "delivered") {
//       return res.status(400).json({
//         message:
//           "Your order is not delivered, please try once order is delivered",
//       });
//     }

//     // Check if the user has already reviewed this restaurant for the given order
//     const existingReview = await Review.findOne({
//       userId: userId,
//       restaurantId: restaurantId,
//       username:username
//     });

//     if (existingReview) {
//       return res.status(400).json({
//         message:
//           "You can only submit one review per delivered order for this restaurant.",
//       });
//     }

//     // If no item is found from this restaurant, reject
//     // if (!isMatch) {
//     //   return res.status(400).json({
//     //     message: "No items from this restaurant in your order",
//     //   });
//     // }

//     // Create the new review
//     const newReview = new Review({
//       userId: userId,
//       restaurantId: restaurantId, // Changed to restaurantId
//       rating,
//       comment,
//       username:username,
      
//     });

//     // Save the review
//     const savedReview = await newReview.save();

//     // Update the restaurant's average rating
//     const averageRatingRestaurant = await calculateAverageRating(Restaurant, restaurantId);
    
//     // Update restaurant's rating in the database
//     await Restaurant.findByIdAndUpdate(restaurantId, { rating: averageRatingRestaurant });

//     res.status(201).json({ message: "Review submitted successfully", savedReview });
//   } catch (error) {
//     res.status(500).json({ messagegger: error.message });
    
//   }
// };


// Create a new review
// exports.addReview = async (req, res) => {
//     try {
//       const { restaurantId,orderId, rating, comment } = req.body;
//       const userId = req.user.id;
      

//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//       }
  
//       const found= await MenuItems.findById(menuItems);
//       if (!foundMenuItem) {
//         return res.status(404).json({ message: "MenuItem not found" });
//       }

//       const order = await Order.findById(orderId).populate("cartId");
//     let isMatch;
//     order.cartId.items.some((item) => {
//       isMatch = item.foodId.toString() === menuId.toString();
//       return isMatch;
//     });
//     if (order.status !== "delivered") {
//       return res.status(400).json({
//         message:
//           "Your order is not delivered, please try once order is delivered",
//       });
//     }
//     const existingReview = await Review.findOne({
//       user: user,
//       menuId: menuId,
//       orderId: orderId,
//     });

//     if (existingReview) {
//       return res.status(400).json({
//         message:
//           "You can only submit one review per delivered order for this menu item.",
//       });
//     }
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Item not found in order",
//       });
//     }
  
//       const newReview = new Review({
//         user: userId,
//         menuItems,
//         rating,
//         comment,
//       });
  
//       const savedReview = await newReview.save();

//       foundMenuItem.customerReviews.push(savedReview._id);

//       const averageRatingMenu = await calculateAverageRating(MenuItems,menuItems);
//       foundMenuItem.rating = averageRatingMenu;

//       const restaurantId = foundMenuItem.restaurant;
//       const averageRatingRestaurant = await calculateAverageRating(Restaurant,restaurantId);
//       await Restaurant.findByIdAndUpdate(restaurantId,{rating: averageRatingRestaurant});
      
//       await foundMenuItem.save();
//       await savedReview.populate("menuItems","name price");

//       res.status(201).json({message:"Review submitted successfully",savedReview});
//     } catch (error) {
//       res.status(500).json({ message:error.message });
//     }
//   };
  
  // Get all reviews
exports.getAllReviews = async (req, res) => {
  const restaurantId = req.params.restaurantId
    try {
    
       const reviews = await Review.find({ restaurantId })

      
      
        .populate("userId","comment") 
        .populate( "username","rating");
  
      res.status(200).json(reviews);
      console.log("redhdh",reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// UPDATE a review comment
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error });
  }
};



  
  // Delete a review
  exports.deleteReview = async (req, res) => {
    try {
      const userId = req.user.id;
      const reviewId = req.params.reviewId;

  
      // Find the review by ID
      const review = await Review.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      // Check if the logged-in user is the owner of the review
      if (review.userId.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this review" });
      }
  
      // Optionally: remove the review ID from the restaurant's review list if such a field exists
      // Assuming `customerReviews` is an array in Restaurant schema
      await Restaurant.findByIdAndUpdate(
        review.restaurantId,
        { $pull: { customerReviews: review._id } }
      );
  
      // Delete the review
      await Review.findByIdAndDelete(reviewId);
  
      // Optionally: recalculate and update average rating
      const averageRating = await calculateAverageRating(Restaurant, review.restaurantId);
      await Restaurant.findByIdAndUpdate(review.restaurantId, { rating: averageRating });
  
      res.status(200).json({ message: "Review deleted successfully" });
  
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
