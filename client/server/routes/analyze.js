const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

// Set up file storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST /analyze
router.post('/', upload.single('resume'), (req, res) => {
  const resumeFile = req.file;
  const jobDescription = req.body.jobDescription;

  console.log('Received resume:', resumeFile?.originalname);
  console.log('Job Description:', jobDescription.slice(0, 50) + '...');

  // TODO: Call Python ML service here

  // Simulate response for now
  res.json({
    score: 78,
    matched_keywords: ['Python', 'React', 'SQL'],
    missing_keywords: ['Docker', 'AWS']
  });
});

module.exports = router;
