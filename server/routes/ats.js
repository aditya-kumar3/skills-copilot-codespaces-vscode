const express = require('express');
const { calculateATSScore, extractKeywords } = require('../utils/atsScorer');
const router = express.Router();

// Calculate ATS score from raw text
router.post('/calculate', (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: 'Resume text is required' });
    }

    const result = calculateATSScore(resumeText, jobDescription || '');

    res.json({
      message: 'ATS score calculated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating score', error: error.message });
  }
});

// Extract keywords from text
router.post('/keywords', (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const keywords = extractKeywords(text);

    res.json({
      message: 'Keywords extracted successfully',
      data: {
        keywords,
        count: keywords.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error extracting keywords', error: error.message });
  }
});

module.exports = router;
