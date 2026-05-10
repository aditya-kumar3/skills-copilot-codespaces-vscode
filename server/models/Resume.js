const mongoose = require('mongoose');

const atsScoreSchema = new mongoose.Schema({
  overall: {
    type: Number,
    default: 0,
  },
  formatting: {
    type: Number,
    default: 0,
  },
  keyword: {
    type: Number,
    default: 0,
  },
  structure: {
    type: Number,
    default: 0,
  },
  feedback: [String],
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    filename: String,
    content: String,
    parsedText: String,
    jobDescription: String,
    atsScore: atsScoreSchema,
    keywords: [String],
    detectedSections: {
      contact: String,
      summary: String,
      experience: [String],
      education: [String],
      skills: [String],
      certifications: [String],
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
