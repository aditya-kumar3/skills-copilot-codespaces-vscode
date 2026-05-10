const express = require('express');
const multer = require('multer');
const { extractText } = require('../utils/parser');
const { calculateATSScore, detectSections } = require('../utils/atsScorer');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Mock storage for demo
const resumes = {};
let resumeId = 0;

// Setup multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'));
    }
  },
});

// Upload and parse resume
router.post('/upload', upload.single('file'), authMiddleware, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const { jobDescription } = req.body;

    // Extract text from file
    const extractedText = await extractText(req.file.buffer, req.file.mimetype);

    // Calculate ATS score
    const atsResult = calculateATSScore(extractedText, jobDescription || '');

    // Store resume
    resumeId++;
    const id = resumeId.toString();
    resumes[id] = {
      id,
      userId: req.userId,
      filename: req.file.originalname,
      content: extractedText,
      jobDescription: jobDescription || '',
      atsScore: {
        overall: atsResult.overall,
        formatting: atsResult.formatting,
        keyword: atsResult.keyword,
        structure: atsResult.structure,
        feedback: atsResult.feedback,
      },
      detectedSections: atsResult.detectedSections,
      uploadedAt: new Date().toISOString(),
    };

    res.json({
      message: 'Resume analyzed successfully',
      data: resumes[id],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing resume', error: error.message });
  }
});

// Get resume analysis
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const resume = resumes[req.params.id];

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resume', error: error.message });
  }
});

// Get all user resumes
router.get('/', authMiddleware, (req, res) => {
  try {
    const userResumes = Object.values(resumes).filter(
      (resume) => resume.userId === req.userId
    );

    res.json({
      data: userResumes,
      count: userResumes.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resumes', error: error.message });
  }
});

// Delete resume
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const resume = resumes[req.params.id];

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    delete resumes[req.params.id];

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error: error.message });
  }
});

module.exports = router;
