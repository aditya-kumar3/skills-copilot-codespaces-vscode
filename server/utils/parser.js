const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Extract text from PDF
const extractTextFromPdf = async (buffer) => {
  try {
    const pdfData = await pdfParse(buffer);
    return pdfData.text;
  } catch (error) {
    throw new Error('Failed to parse PDF: ' + error.message);
  }
};

// Extract text from DOCX
const extractTextFromDocx = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new Error('Failed to parse DOCX: ' + error.message);
  }
};

// Extract text based on file type
const extractText = async (buffer, mimetype) => {
  if (mimetype === 'application/pdf') {
    return await extractTextFromPdf(buffer);
  } else if (
    mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword'
  ) {
    return await extractTextFromDocx(buffer);
  } else {
    throw new Error('Unsupported file type');
  }
};

module.exports = {
  extractText,
  extractTextFromPdf,
  extractTextFromDocx,
};
