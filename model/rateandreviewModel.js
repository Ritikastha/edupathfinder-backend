const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports=Review;