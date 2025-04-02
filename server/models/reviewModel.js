const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  username: { type: String, required: true },
 
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Restaurant", // Assuming you have a Restaurant model to reference.
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  comment: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;






























// const mongoose = require('mongoose');
// const MenuItem = require('./menuItemModel');

// const reviewSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   menuItems: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "MenuItem",
//     // required: true,
//   },
//   rating: { type: Number, min: 1, max: 5, required: true },
//   comment: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Review = mongoose.model("Review", reviewSchema);
// module.exports = Review;


