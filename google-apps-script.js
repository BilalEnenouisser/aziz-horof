/**
 * Google Apps Script for Form Submissions
 * Paste this code in Google Apps Script (Extensions → Apps Script)
 * 
 * IMPORTANT: Replace YOUR_RECAPTCHA_SECRET_KEY with your actual Secret Key
 * 
 * Your Site Key (already in index.html): 6LdQeSQsAAAAAMHDcnWDpm1Pb3sKTdWVfreDjDkm
 * Get your Secret Key from: https://www.google.com/recaptcha/admin
 */

// Your reCAPTCHA Secret Key - Get from https://www.google.com/recaptcha/admin
// IMPORTANT: Paste your Secret Key here (different from Site Key)
const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY';

/**
 * Verify reCAPTCHA token
 */
function verifyRecaptcha(token) {
  if (!token || !RECAPTCHA_SECRET_KEY || RECAPTCHA_SECRET_KEY === 'YOUR_RECAPTCHA_SECRET_KEY') {
    return true; // Skip verification if not configured
  }
  
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const payload = {
    'secret': RECAPTCHA_SECRET_KEY,
    'response': token
  };
  
  const options = {
    'method': 'post',
    'payload': payload
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    // Return true if verification succeeds and score is above threshold (0.5)
    return result.success && result.score > 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Verify reCAPTCHA if token is provided
    if (data.recaptchaToken) {
      if (!verifyRecaptcha(data.recaptchaToken)) {
        return ContentService
          .createTextOutput(JSON.stringify({
            'status': 'error',
            'message': 'CAPTCHA verification failed. Please try again.'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const timestamp = new Date();
    
    // Process each question
    if (data.questions && data.questions.length > 0) {
      data.questions.forEach(function(question) {
        // Add a new row for each question
        sheet.appendRow([
          timestamp,
          question.category || '',
          question.question || '',
          question.letter || '',
          question.answer || ''
        ]);
      });
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function (optional - for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Form submission endpoint is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

