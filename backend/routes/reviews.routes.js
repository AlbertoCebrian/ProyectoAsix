const express = require("express");
const router = express.Router();
const Review = require("../models/review.model");

// GET: Obtener todas las reseñas de un producto específico
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Crear una nueva reseña
router.post("/", async (req, res) => {
  const review = new Review({
    productId: req.body.productId,
    userName: req.body.userName,
    rating: req.body.rating,
    comment: req.body.comment
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;