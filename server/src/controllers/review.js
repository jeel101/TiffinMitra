const reviewModal = require('../models/review');
const providerModal = require('../models/provider')

exports.addReview = async (req, res) => {
    try {
        const { provider, rating, message } = req.body;
        const user = req.user ? req.user._id : null; // Ensure user is authenticated

        // Ensure the user is logged in before adding a review
        if (!user) return res.status(404).json({ message: "Login to add review" });

        // Ensure the provider exists
        const providerData = await providerModal.findById(provider);
        if (!providerData) {
            return res.status(404).json({ message: "Provider not found" });
        }

        // Update the provider rating by averaging existing reviews and the new rating
        let providerRating = Number(providerData.rating); // Get the current rating
        const providerReviews = await reviewModal.find({ provider }); // Get all reviews for the provider
        const totalReviews = providerReviews.length;

        // Calculate the new average rating
        if (totalReviews > 0) {
            const totalRating = providerReviews.reduce((acc, review) => acc + review.rating, 0);
            providerRating = (totalRating + Number(rating)) / (totalReviews + 1);
        } else {
            providerRating = Number(rating); // If no reviews, use the new rating as the initial rating
        }

        // Update provider's rating in the database
        await providerModal.findByIdAndUpdate(provider, { $set: { rating: providerRating } });

        // Create the new review
        const reviewData = { user, provider, rating, message };
        const review = await reviewModal.create(reviewData);

        return res.status(201).json({ review });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllReview = async (req, res) => {
    try {

        const reviews = await reviewModal.find().populate("user");

        if (reviews.length == 0)
            return res.status(404).json({ message: "No Review Found" });
        const filteredReview = reviews.filter((review) => review.rating >= 4)
        return res.status(200).json({ reviews: filteredReview });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.getReviewOfProvider = async (req, res) => {
    try {
        const { _id } = req.params

        const review = await reviewModal.find({ provider: _id }).populate("user").sort({ createdAt: -1 });

        if (review.length == 0)
            return res.status(404).json({ message: "No Review Found" });

        return res.status(200).json({ review });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
