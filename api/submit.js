/**
 * Vercel Serverless Function
 * Alternative option: Use this instead of Google Apps Script
 * 
 * Setup:
 * 1. Install dependencies: npm install @googleapis/sheets
 * 2. Set environment variables in Vercel:
 *    - GOOGLE_SHEETS_ID
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *    - GOOGLE_PRIVATE_KEY
 *    - RECAPTCHA_SECRET_KEY (for CAPTCHA verification)
 * 3. Share your Google Sheet with the service account email
 * 
 * Your Site Key (already in index.html): 6LdQeSQsAAAAAMHDcnWDpm1Pb3sKTdWVfreDjDkm
 * Get your Secret Key from: https://www.google.com/recaptcha/admin
 */

const { google } = require('@googleapis/sheets');

/**
 * Verify reCAPTCHA token
 */
async function verifyRecaptcha(token) {
  const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!token || !SECRET_KEY) {
    return true; // Skip verification if not configured
  }
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${SECRET_KEY}&response=${token}`
    });
    
    const result = await response.json();
    
    // For v2, success is enough. For v3, check score > 0.5
    return result.success && (result.score === undefined || result.score > 0.5);
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get environment variables
    const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
    const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Authenticate with Google Sheets
    const auth = new google.auth.JWT(
      SERVICE_ACCOUNT_EMAIL,
      null,
      PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Parse request data
    const { questions, recaptchaToken } = req.body;

    // Verify reCAPTCHA if token is provided
    if (recaptchaToken) {
      const captchaValid = await verifyRecaptcha(recaptchaToken);
      if (!captchaValid) {
        return res.status(400).json({ 
          error: 'CAPTCHA verification failed. Please try again.' 
        });
      }
    }

    if (!questions || questions.length === 0) {
      return res.status(400).json({ error: 'No questions provided' });
    }

    // Prepare data rows
    const timestamp = new Date().toISOString();
    const rows = questions.map(question => [
      timestamp,
      question.category || '',
      question.question || '',
      question.letter || '',
      question.answer || ''
    ]);

    // Append data to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: rows
      }
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Data saved successfully',
      questionsCount: questions.length
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to save data',
      message: error.message 
    });
  }
}

