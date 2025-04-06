const express = require('express');
const { addReview, getAllReviews, updateReview, deleteReview, getAverageRating } = require('../controllers/reviewContorller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/add-review',roleMiddleware(['user']),addReview);
router.get('/get-all-reviews/:restaurantId',roleMiddleware(['user']),getAllReviews);
router.delete('/:reviewId/delete',roleMiddleware(['user']),deleteReview)

module.exports = router;