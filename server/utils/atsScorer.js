const natural = require('natural');

// Tokenize text and extract keywords
const extractKeywords = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());

  // Filter out common words and special characters
  const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
  ]);

  return tokens.filter(
    (token) =>
      token.length > 2 &&
      !stopwords.has(token) &&
      /^[a-z0-9+#]+$/.test(token)
  );
};

// Detect resume sections
const detectSections = (text) => {
  const sections = {
    contact: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
  };

  const lines = text.split('\n');

  // Simple section detection based on keywords
  const sectionPatterns = {
    contact: /(contact|phone|email|address|linkedin)/i,
    summary: /(summary|professional summary|objective|profile)/i,
    experience: /(experience|work experience|employment|career)/i,
    education: /(education|degree|university|college|school)/i,
    skills: /(skills|technical skills|competencies|expertise)/i,
    certifications: /(certification|certifications|license|licenses)/i,
  };

  let currentSection = null;
  let sectionContent = [];

  lines.forEach((line) => {
    // Check if line matches a section header
    for (const [section, pattern] of Object.entries(sectionPatterns)) {
      if (pattern.test(line)) {
        // Save previous section
        if (currentSection && sectionContent.length > 0) {
          if (Array.isArray(sections[currentSection])) {
            sections[currentSection].push(sectionContent.join(' '));
          } else {
            sections[currentSection] = sectionContent.join(' ');
          }
        }
        currentSection = section;
        sectionContent = [];
        break;
      }
    }

    // Add line to current section
    if (currentSection && line.trim().length > 0) {
      sectionContent.push(line.trim());
    }
  });

  // Save last section
  if (currentSection && sectionContent.length > 0) {
    if (Array.isArray(sections[currentSection])) {
      sections[currentSection].push(sectionContent.join(' '));
    } else {
      sections[currentSection] = sectionContent.join(' ');
    }
  }

  return sections;
};

// Calculate ATS Score
const calculateATSScore = (resumeText, jobDescription = '') => {
  const feedback = [];
  const scores = {
    formatting: 0,
    keyword: 0,
    structure: 0,
    overall: 0,
  };

  // 1. Formatting Score (0-30)
  let formattingScore = 30;

  // Check for excessive formatting issues
  if (resumeText.includes('•') || resumeText.includes('○')) {
    formattingScore -= 5;
  }
  if (resumeText.match(/[^\x00-\x7F]/g)) {
    formattingScore -= 10;
    feedback.push('Resume contains special characters that may not parse properly in ATS');
  }
  if (resumeText.length < 200) {
    formattingScore -= 10;
    feedback.push('Resume appears to be too short');
  }
  if (resumeText.split('\n').length < 10) {
    formattingScore -= 5;
    feedback.push('Resume lacks proper structure with line breaks');
  }

  scores.formatting = Math.max(0, formattingScore);

  // 2. Structure Score (0-30)
  let structureScore = 30;
  const sections = detectSections(resumeText);

  const requiredSections = ['contact', 'experience', 'education'];
  requiredSections.forEach((section) => {
    if (!sections[section] || sections[section].length === 0) {
      structureScore -= 10;
      feedback.push(`Missing ${section} section`);
    }
  });

  // Bonus for skills section
  if (sections.skills && sections.skills.length > 0) {
    structureScore += 5;
  }

  scores.structure = Math.max(0, structureScore);

  // 3. Keyword Matching Score (0-40)
  let keywordScore = 0;
  if (jobDescription.length > 0) {
    const resumeKeywords = new Set(extractKeywords(resumeText));
    const jobKeywords = new Set(extractKeywords(jobDescription));

    const matchedKeywords = [...resumeKeywords].filter((k) => jobKeywords.has(k));
    const matchPercentage = (matchedKeywords.length / jobKeywords.size) * 100;

    keywordScore = Math.min(40, Math.round((matchPercentage / 100) * 40));

    if (matchedKeywords.length === 0) {
      feedback.push('No matching keywords found between resume and job description');
    } else {
      feedback.push(
        `Found ${matchedKeywords.length} matching keywords: ${matchedKeywords.slice(0, 5).join(', ')}`
      );
    }
  } else {
    keywordScore = 20; // Default if no job description provided
    feedback.push('No job description provided for keyword matching');
  }

  scores.keyword = keywordScore;

  // Calculate overall score
  scores.overall = Math.round(scores.formatting + scores.structure + scores.keyword);

  return {
    ...scores,
    feedback,
    detectedSections: sections,
  };
};

module.exports = {
  extractKeywords,
  detectSections,
  calculateATSScore,
};
