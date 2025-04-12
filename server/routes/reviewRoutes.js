const express = require('express');
const { addReview, getAllReviews, upteReview, deleteReview, getAverageRating, updateReview } = require('../controllers/reviewContorller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/add-review',roleMiddleware(['user']),addReview);
router.get('/get-all-reviews/:restaurantId',roleMiddleware(['user']),getAllReviews);
router.delete('/delete/:reviewId',roleMiddleware(['user']),deleteReview)
router.put('/update/:reviewId',roleMiddleware(['user']), updateReview)

module.exports = router;