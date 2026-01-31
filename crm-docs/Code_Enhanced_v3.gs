// ============================================
// ATLAS CRM - Enhanced Code.gs v3.0
// WITH GDPR COMPLIANCE + QUOTA PROTECTION + AUTO-LOGGING
// Updated: January 4, 2026
// ============================================

// UPDATED: Now points to Windsurf CRM spreadsheet
const SHEET_ID = '1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY';
const SHEET_NAME = 'LM_WE_Schools_Master';
const SETTINGS_SHEET_NAME = 'email_context';
const GMAIL_DAILY_QUOTA = 500;
const GMAIL_WARNING_THRESHOLD = 400;

// ============================================
// EXISTING FUNCTIONS (Keep as-is)
// ============================================

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('AI Outreach Assistant')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getSettings() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SETTINGS_SHEET_NAME);
    if (!sheet) {
      return {
        'Your Name': 'Linnea Moritz',
        'Your Title': 'Alumni Ambassador, Western Europe',
        'University Name': 'Minerva University',
        'University Website': 'https://www.minerva.edu/',
        'Your Email': 'linnea.moritz@uni.minerva.edu',
        'Calendly Link': 'https://calendly.com/linnea-moritz-uni',
        'Your Region': 'Western Europe (Sweden-based)',
        'About Minerva': 'Minerva University is a revolutionary global university with active learning, city rotation across 7 global cities, and a curriculum based on cognitive science.'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    const settings = {};
    
    if (data.length > 0 && data[0][0] && data[0][0].toString().trim().startsWith('{')) {
      try {
        const jsonString = data[0][0].toString();
        const jsonData = JSON.parse(jsonString);
        return {
          'Your Name': jsonData.ambassador?.name || 'Linnea Moritz',
          'Your Title': jsonData.ambassador?.title || 'Alumni Ambassador, Western Europe',
          'University Name': jsonData.university?.name || 'Minerva University',
          'University Website': jsonData.university?.website || 'https://www.minerva.edu/',
          'Your Email': jsonData.ambassador?.email || 'linnea.moritz@uni.minerva.edu',
          'Calendly Link': jsonData.ambassador?.calendly || 'https://calendly.com/linnea-moritz-uni',
          'Your Region': jsonData.ambassador?.region || 'Western Europe (Sweden-based)',
          'About Minerva': jsonData.university?.about || 'Minerva University is a revolutionary global university with active learning, city rotation across 7 global cities, and a curriculum based on cognitive science.',
          'JSON': jsonData
        };
      } catch (e) {
        console.log('Failed to parse JSON, falling back to key-value pairs');
      }
    }
    
    for (let i = 0; i < data.length; i++) {
      const key = data[i][0];
      const value = data[i][1];
      if (key && value) {
        settings[key] = value;
      }
    }
    
    if (!settings['University Website']) {
      settings['University Website'] = 'https://www.minerva.edu/';
    }
    
    return settings;
  } catch (error) {
    console.error('Error reading settings:', error);
    return {
      'Your Name': 'Linnea Moritz',
      'Your Title': 'Alumni Ambassador, Western Europe',
      'University Name': 'Minerva University',
      'University Website': 'https://www.minerva.edu/',
      'Your Email': 'linnea.moritz@uni.minerva.edu',
      'Calendly Link': 'https://calendly.com/linnea-moritz-uni'
    };
  }
}

function getCountryList() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const countryCol = headers.indexOf('Country');
    
    if (countryCol === -1) {
      throw new Error('Country column not found');
    }
    
    const countries = data.slice(1)
      .map(row => row[countryCol])
      .filter(country => country && country.toString().trim() !== '');
    
    const uniqueCountries = [...new Set(countries)].sort();
    return uniqueCountries;
  } catch (error) {
    console.error('Error in getCountryList:', error);
    throw error;
  }
}

function searchSchools(filters) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const countryCol = headers.indexOf('Country');
    const schoolCol = headers.indexOf('School Name');
    const cityCol = headers.indexOf('City');
    
    const results = [];
    const query = (filters.query || '').toLowerCase();
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const country = row[countryCol] || '';
      const school = row[schoolCol] || '';
      const city = row[cityCol] || '';
      
      if (filters.country && country !== filters.country) {
        continue;
      }
      
      if (query && !school.toLowerCase().includes(query) && !city.toLowerCase().includes(query)) {
        continue;
      }
      
      results.push({
        rowNumber: i + 1,
        school: school,
        location: city + (country ? ', ' + country : '')
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error in searchSchools:', error);
    throw error;
  }
}

function draftEmailForSchool(rowNumber, customInstruction) {
  try {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('API key not found. Please set GEMINI_API_KEY in Script Properties.');
    }
    
    const settings = getSettings();
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const row = data[rowNumber - 1];
    
    const schoolCol = headers.indexOf('School Name');
    const cityCol = headers.indexOf('City');
    const countryCol = headers.indexOf('Country');
    const primaryNameCol = headers.indexOf('Primary Contact Name');
    const primaryEmailCol = headers.indexOf('Primary Contact Email');
    const generalEmailCol = headers.indexOf('General Email');
    
    const schoolName = row[schoolCol] || '';
    const city = row[cityCol] || '';
    const country = row[countryCol] || '';
    const primaryName = row[primaryNameCol] || '';
    const primaryEmail = row[primaryEmailCol] || '';
    const generalEmail = row[generalEmailCol] || '';
    
    let toEmail = '';
    let greetingContext = '';
    
    if (primaryName && primaryEmail) {
      toEmail = primaryEmail;
      greetingContext = `Address the email to "${primaryName}" personally.`;
    } else if (generalEmail) {
      toEmail = generalEmail;
      greetingContext = `There is no specific contact person. Address it to the "University Counseling Team at ${schoolName}" or "Dear Counseling Team". Include a line early in the email: "I'm reaching out to connect with the counselor who supports students with their university applications."`;
    } else {
      return {
        error: true,
        message: 'No valid contact email found for this school.'
      };
    }
    
    const instruction = customInstruction && customInstruction.trim() !== ''
      ? customInstruction
      : 'Write a standard professional outreach email introducing yourself and your institution.';
    
    const systemInstruction = `You are ${settings['Your Name'] || 'Linnea Moritz'}, ${settings['Your Title'] || 'Alumni Ambassador for Western Europe'} at ${settings['University Name'] || 'Minerva University'}. You are reaching out to high school counselors to introduce Minerva and establish relationships.

About You:
- Based in ${settings['Your Region'] || 'Sweden'}
- Graduated from Minerva University in May 2021
- Your email: ${settings['Your Email'] || 'linnea.moritz@uni.minerva.edu'}
- Calendly: ${settings['Calendly Link'] || 'https://calendly.com/linnea-moritz-uni'}

About Minerva University:
${settings['About Minerva'] || settings['JSON']?.university?.about || 'Minerva is an accredited U.S. university providing an experiential learning program across multiple countries in 4 years using the Science of Learning in its fully active learning interdisciplinary curriculum.'}

Use this approved messaging style when describing Minerva (from official materials):
- City Rotation: "Oh, the places you'll go. Over four years, you'll live on four continents, each offering distinct opportunities to grow."
  * Year 1: San Francisco - "A vibrant hub of innovation and social change"
  * Year 2: Tokyo - "Where tradition meets cutting-edge technology"
  * Years 3 & 4: "Cities change annually–past rotation cities include Berlin, Buenos Aires, Hyderabad, Taipei, Seoul, and London, each with unique histories and systems that expand your perspective and sharpen your skills"
- Emphasize the question-driven approach: "Would you like to live in global hubs throughout college? What would it be like in a class where your professor only talks for 2-3 minutes at a time with no lectures and no tests?"
- Highlight "Pragmatic Liberal Arts" - applied knowledge through small seminars centered on intensive discussion and debate
- Mention "Real-world Experience" - life-long career support and internships at companies like Apple, Google, Amazon, United Nations
- Emphasize "Global Understanding" - living in cities across four continents, experiencing cultures firsthand
- Note "Accessibility" - completely free application, no standardized tests required, need-based financial aid for all students including international

Website: ${settings['University Website'] || 'https://www.minerva.edu/'}

IMPORTANT: Always naturally mention the Minerva website (${settings['University Website'] || 'https://www.minerva.edu/'}) in your emails so counselors can learn more. Make it feel organic, not forced.

Your tone should be warm, professional, personal, and genuinely enthusiastic about Minerva. Keep emails concise (3-4 short paragraphs maximum).

GDPR COMPLIANCE: Always include this footer at the end of the email body (before "Best regards,"):

---
You received this email because you are a school counselor at ${schoolName}.
To opt out of future emails, reply with "unsubscribe".
Privacy Policy: ${settings['University Website'] || 'https://www.minerva.edu/'}/privacy
`;
    
    const userQuery = `
School Information:
- School Name: ${schoolName}
- Location: ${city}, ${country}
- ${greetingContext}

Your Task:
${instruction}

Email Signature Requirements:
Always end the email with ONLY this simple closing:

Best regards,

DO NOT include name, title, email, or Calendly link in the email body. The user has an automatic Gmail signature that will be added when sending.

Format Requirements:
Return your response in this exact format:
[SUBJECT]
Your subject line here
---
[EMAIL]
Your email body here

IMPORTANT: Include the GDPR footer before "Best regards," as specified in the system instruction.

Make sure to:
- Use an appropriate greeting based on the contact information provided
- Keep the email concise (3-4 paragraphs maximum in the body)
- Be warm, personal, and enthusiastic about Minerva
- Include GDPR-compliant footer before signature
- End with ONLY "Best regards," and nothing else (no name, title, or contact info)
- If no specific task is given, write a warm introduction to the counselor about Minerva and offer to schedule a conversation
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{
        parts: [{
          text: userQuery
        }]
      }],
      systemInstruction: {
        parts: [{
          text: systemInstruction
        }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      console.error('API Error:', responseCode, responseText);
      throw new Error(`API returned status ${responseCode}: ${responseText}`);
    }
    
    const jsonResponse = JSON.parse(responseText);
    
    if (!jsonResponse.candidates || !jsonResponse.candidates[0] || !jsonResponse.candidates[0].content) {
      throw new Error('Unexpected API response format');
    }
    
    const generatedText = jsonResponse.candidates[0].content.parts[0].text;
    
    const parts = generatedText.split('---');
    if (parts.length < 2) {
      throw new Error('Generated email format is incorrect');
    }
    
    let subject = parts[0].replace('[SUBJECT]', '').trim();
    let body = parts[1].replace('[EMAIL]', '').trim();
    
    return {
      email: toEmail,
      subject: subject,
      draft: body,
      schoolName: schoolName,
      rowNumber: rowNumber
    };
    
  } catch (error) {
    console.error('Error in draftEmailForSchool:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function logContact(rowNumber) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const statusCol = headers.indexOf('Relationship Status') + 1;
    const typeCol = headers.indexOf('Last Contact Type') + 1;
    const dateCol = headers.indexOf('Date of last contact') + 1;
    
    if (statusCol > 0) {
      sheet.getRange(rowNumber, statusCol).setValue('Contacted');
    }
    if (typeCol > 0) {
      sheet.getRange(rowNumber, typeCol).setValue('Email');
    }
    if (dateCol > 0) {
      sheet.getRange(rowNumber, dateCol).setValue(new Date());
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error in logContact:', error);
    throw error;
  }
}

// ============================================
// NEW ATLAS FEATURES WITH SAFETY ENHANCEMENTS
// ============================================

// FEATURE 1: Multi-Sheet Drive Search with Duplicate Detection

function searchDriveForSchools(keywords) {
  try {
    const searchTerms = keywords || ['school', 'Germany', 'France', 'Berlin', 'Paris', 'IB', 'counselor'];
    const query = searchTerms.map(term => `title contains "${term}"`).join(' or ');
    
    const files = DriveApp.searchFiles(
      `(${query}) and mimeType = "application/vnd.google-apps.spreadsheet" and trashed = false`
    );
    
    const results = [];
    let count = 0;
    const maxResults = 50;
    
    while (files.hasNext() && count < maxResults) {
      const file = files.next();
      results.push({
        id: file.getId(),
        name: file.getName(),
        url: file.getUrl(),
        lastModified: file.getLastUpdated().toISOString(),
        owner: file.getOwner().getName()
      });
      count++;
    }
    
    results.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    
    return {
      success: true,
      files: results,
      count: results.length
    };
  } catch (error) {
    console.error('Error in searchDriveForSchools:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function previewSheetData(fileId) {
  try {
    const spreadsheet = SpreadsheetApp.openById(fileId);
    const sheet = spreadsheet.getSheets()[0];
    
    const lastRow = Math.min(sheet.getLastRow(), 11);
    const lastCol = sheet.getLastColumn();
    
    if (lastRow === 0 || lastCol === 0) {
      return {
        error: true,
        message: 'Sheet is empty'
      };
    }
    
    const data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    
    return {
      success: true,
      sheetName: sheet.getName(),
      headers: data[0],
      sampleRows: data.slice(1),
      totalRows: sheet.getLastRow() - 1,
      fileId: fileId
    };
  } catch (error) {
    console.error('Error in previewSheetData:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function consolidateSheets(fileIds) {
  try {
    const masterSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const masterHeaders = masterSheet.getRange(1, 1, 1, masterSheet.getLastColumn()).getValues()[0];
    
    let totalAdded = 0;
    let totalDuplicates = 0;
    const errors = [];
    const duplicateList = [];
    
    const existingData = masterSheet.getDataRange().getValues();
    const schoolCol = masterHeaders.indexOf('School Name');
    const cityCol = masterHeaders.indexOf('City');
    
    const existingSchools = new Set();
    for (let i = 1; i < existingData.length; i++) {
      const schoolName = (existingData[i][schoolCol] || '').toString().trim();
      const city = (existingData[i][cityCol] || '').toString().trim();
      const key = `${schoolName}|${city}`.toLowerCase();
      existingSchools.add(key);
    }
    
    for (const fileId of fileIds) {
      try {
        const spreadsheet = SpreadsheetApp.openById(fileId);
        const sheet = spreadsheet.getSheets()[0];
        const data = sheet.getDataRange().getValues();
        
        if (data.length < 2) continue;
        
        const headers = data[0];
        const rows = data.slice(1);
        
        const columnMap = mapColumns(headers, masterHeaders);
        
        for (const row of rows) {
          const schoolNameCol = columnMap['School Name'];
          const cityColIndex = columnMap['City'];
          
          const schoolName = (row[schoolNameCol] || '').toString().trim();
          const city = (row[cityColIndex] || '').toString().trim();
          
          if (!schoolName) continue;
          
          const key = `${schoolName}|${city}`.toLowerCase();
          
          if (existingSchools.has(key)) {
            totalDuplicates++;
            duplicateList.push(`${schoolName}, ${city}`);
            continue;
          }
          
          const newRow = masterHeaders.map(header => {
            const sourceCol = columnMap[header];
            return sourceCol !== undefined ? row[sourceCol] : '';
          });
          
          masterSheet.appendRow(newRow);
          existingSchools.add(key);
          totalAdded++;
        }
      } catch (error) {
        errors.push(`Error processing file ${fileId}: ${error.toString()}`);
      }
    }
    
    return {
      success: true,
      totalAdded: totalAdded,
      totalDuplicates: totalDuplicates,
      duplicateList: duplicateList.slice(0, 10),
      errors: errors
    };
  } catch (error) {
    console.error('Error in consolidateSheets:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function mapColumns(sourceHeaders, masterHeaders) {
  const map = {};
  
  for (let i = 0; i < masterHeaders.length; i++) {
    const masterHeader = masterHeaders[i].toLowerCase().trim();
    
    for (let j = 0; j < sourceHeaders.length; j++) {
      const sourceHeader = sourceHeaders[j].toLowerCase().trim();
      
      if (sourceHeader === masterHeader) {
        map[masterHeaders[i]] = j;
        break;
      }
      
      if (sourceHeader.includes(masterHeader) || masterHeader.includes(sourceHeader)) {
        map[masterHeaders[i]] = j;
        break;
      }
    }
  }
  
  return map;
}

// FEATURE 2: Gmail Draft Creation with QUOTA PROTECTION

function checkGmailQuota() {
  const cache = CacheService.getScriptCache();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const cacheKey = 'gmail_drafts_' + today;
  
  const draftsToday = parseInt(cache.get(cacheKey) || '0');
  
  return {
    used: draftsToday,
    remaining: GMAIL_DAILY_QUOTA - draftsToday,
    limit: GMAIL_DAILY_QUOTA,
    warningThreshold: GMAIL_WARNING_THRESHOLD,
    nearLimit: draftsToday >= GMAIL_WARNING_THRESHOLD
  };
}

function incrementGmailQuota() {
  const cache = CacheService.getScriptCache();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const cacheKey = 'gmail_drafts_' + today;
  
  const draftsToday = parseInt(cache.get(cacheKey) || '0');
  cache.put(cacheKey, String(draftsToday + 1), 86400);
  
  return draftsToday + 1;
}

function saveAsGmailDraft(emailData) {
  try {
    const quota = checkGmailQuota();
    
    if (quota.used >= GMAIL_DAILY_QUOTA) {
      return {
        success: false,
        error: 'Gmail quota exceeded',
        message: `You've reached the daily limit of ${GMAIL_DAILY_QUOTA} drafts. Try again tomorrow.`,
        quota: quota
      };
    }
    
    if (quota.nearLimit) {
      console.warn(`Approaching Gmail quota: ${quota.used}/${GMAIL_DAILY_QUOTA} drafts used today`);
    }
    
    const draft = GmailApp.createDraft(
      emailData.email,
      emailData.subject,
      emailData.draft
    );
    
    incrementGmailQuota();
    
    try {
      const label = GmailApp.getUserLabelByName('Minerva Outreach') || 
                    GmailApp.createLabel('Minerva Outreach');
      const message = draft.getMessage();
      const thread = message.getThread();
      thread.addLabel(label);
    } catch (labelError) {
      console.log('Could not add label:', labelError);
    }
    
    if (emailData.rowNumber) {
      logContact(emailData.rowNumber);
    }
    
    const updatedQuota = checkGmailQuota();
    
    return {
      success: true,
      draftId: draft.getId(),
      message: `Draft created for ${emailData.schoolName}`,
      gmailUrl: 'https://mail.google.com/mail/u/0/#drafts',
      quota: updatedQuota,
      warning: updatedQuota.nearLimit ? `Warning: ${updatedQuota.remaining} drafts remaining today` : null
    };
  } catch (error) {
    console.error('Error in saveAsGmailDraft:', error);
    return {
      success: false,
      error: true,
      message: error.toString()
    };
  }
}

function batchCreateDrafts(emails) {
  try {
    const quota = checkGmailQuota();
    const maxBatch = Math.min(emails.length, quota.remaining, 100);
    
    if (maxBatch === 0) {
      return {
        success: 0,
        failed: 0,
        skipped: emails.length,
        message: 'Gmail quota exceeded. No drafts created.',
        quota: quota
      };
    }
    
    const results = {
      success: 0,
      failed: 0,
      skipped: emails.length - maxBatch,
      errors: []
    };
    
    for (let i = 0; i < maxBatch; i++) {
      const email = emails[i];
      const result = saveAsGmailDraft(email);
      
      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push(`${email.schoolName}: ${result.message}`);
      }
      
      if (i < maxBatch - 1) {
        Utilities.sleep(100);
      }
    }
    
    results.quota = checkGmailQuota();
    
    return results;
  } catch (error) {
    console.error('Error in batchCreateDrafts:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

// FEATURE 3: Weekly Report Automation

function generateWeeklyReport() {
  try {
    const stats = getWeeklyStats();
    const reportEmail = formatReportEmail(stats);
    
    const settings = getSettings();
    const recipientEmail = settings['Your Email'] || 'linnea.moritz@uni.minerva.edu';
    
    const draft = GmailApp.createDraft(
      recipientEmail,
      reportEmail.subject,
      reportEmail.body
    );
    
    return {
      success: true,
      draftId: draft.getId(),
      message: 'Weekly report draft created',
      gmailUrl: 'https://mail.google.com/mail/u/0/#drafts'
    };
  } catch (error) {
    console.error('Error in generateWeeklyReport:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function getWeeklyStats() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const dateCol = headers.indexOf('Date of last contact');
    const countryCol = headers.indexOf('Country');
    const statusCol = headers.indexOf('Relationship Status');
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const stats = {
      dateRange: {
        start: sevenDaysAgo.toLocaleDateString(),
        end: new Date().toLocaleDateString()
      },
      contacted: { total: 0, byCountry: {} },
      responses: { total: 0, rate: 0 },
      meetings: 0,
      fairs: 0,
      topRegion: { country: '', responseRate: 0 }
    };
    
    let contactedThisWeek = 0;
    let respondedThisWeek = 0;
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const contactDate = row[dateCol];
      const country = row[countryCol] || 'Unknown';
      const status = row[statusCol] || '';
      
      if (contactDate && new Date(contactDate) >= sevenDaysAgo) {
        contactedThisWeek++;
        stats.contacted.byCountry[country] = (stats.contacted.byCountry[country] || 0) + 1;
        
        if (status === 'Responded' || status === 'Partnership') {
          respondedThisWeek++;
        }
      }
    }
    
    stats.contacted.total = contactedThisWeek;
    stats.responses.total = respondedThisWeek;
    stats.responses.rate = contactedThisWeek > 0 
      ? Math.round((respondedThisWeek / contactedThisWeek) * 100) 
      : 0;
    
    const countries = Object.entries(stats.contacted.byCountry);
    if (countries.length > 0) {
      countries.sort((a, b) => b[1] - a[1]);
      stats.topRegion.country = countries[0][0];
      stats.topRegion.responseRate = stats.responses.rate;
    }
    
    return stats;
  } catch (error) {
    console.error('Error in getWeeklyStats:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function formatReportEmail(stats) {
  const subject = `Weekly Outreach Report - ${stats.dateRange.start} to ${stats.dateRange.end}`;
  
  const countrySummary = Object.entries(stats.contacted.byCountry)
    .map(([country, count]) => `${country}: ${count}`)
    .join(', ');
  
  const body = `Hi Alena,

Executive Summary:
This week I contacted ${stats.contacted.total} schools${countrySummary ? ` (${countrySummary})` : ''}, with a ${stats.responses.rate}% response rate. ${stats.topRegion.country ? `${stats.topRegion.country} continues to show strong engagement.` : ''}

📊 Activity This Week:
- Schools Contacted: ${stats.contacted.total}
- Responses Received: ${stats.responses.total} (Response Rate: ${stats.responses.rate}%)
- Meetings Scheduled: ${stats.meetings}
- Fair Registrations: ${stats.fairs}

📈 Performance Analysis:
- Top Performing Region: ${stats.topRegion.country || 'N/A'} (${stats.topRegion.responseRate}% response rate)
- Conversion Rate: ${stats.responses.rate}%

🎯 Strategic Recommendations:
${stats.responses.rate > 15 ? '✅ Response rate is strong - continue current approach' : '⚠️ Response rate below target - consider A/B testing subject lines'}
${stats.topRegion.country ? `✅ Focus more effort on ${stats.topRegion.country} (highest engagement)` : ''}

📅 Next Week Priorities:
- Follow up with ${stats.responses.total} pending responses
- Target new schools in high-performing regions
- Prepare for upcoming education fairs

Best regards,
Linnea`;

  return {
    subject: subject,
    body: body
  };
}

// FEATURE 4: GDPR Compliance - Data Retention & Cleanup

function getOrCreateSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  
  return sheet;
}

function cleanupOldContacts() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const dateCol = headers.indexOf('Date of last contact');
    
    if (dateCol === -1) {
      return {
        error: true,
        message: 'Date of last contact column not found'
      };
    }
    
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    const archiveSheet = getOrCreateSheet('Archived_Contacts');
    
    if (archiveSheet.getLastRow() === 0) {
      archiveSheet.appendRow(headers);
    }
    
    let archivedCount = 0;
    
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      const lastContact = row[dateCol];
      
      if (!lastContact || new Date(lastContact) < twoYearsAgo) {
        archiveSheet.appendRow(row);
        sheet.deleteRow(i + 1);
        archivedCount++;
      }
    }
    
    return {
      success: true,
      archived: archivedCount,
      message: `Archived ${archivedCount} contacts with no activity in 2+ years`
    };
  } catch (error) {
    console.error('Error in cleanupOldContacts:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function deleteContact(rowNumber) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const archiveSheet = getOrCreateSheet('Deleted_Contacts');
    
    const row = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];
    archiveSheet.appendRow(row);
    
    sheet.deleteRow(rowNumber);
    
    return {
      success: true,
      message: 'Contact deleted and archived'
    };
  } catch (error) {
    console.error('Error in deleteContact:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

function exportContactData(rowNumber) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const contactData = {};
    for (let i = 0; i < headers.length; i++) {
      contactData[headers[i]] = row[i];
    }
    
    return {
      success: true,
      data: contactData,
      exportDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in exportContactData:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

// ============================================
// FEATURE 5: AUTO-LOG GMAIL SENT EMAILS (NEW)
// Added: January 4, 2026
// Purpose: Automatically log emails sent from Gmail to Windsurf CRM
// ============================================

/**
 * Watch Gmail sent folder and auto-log to Windsurf CRM
 * Run via time trigger every 5 minutes
 */
function onGmailSent() {
  try {
    const cache = CacheService.getScriptCache();
    const lastCheckedStr = cache.get('gmail_last_checked');
    
    // Default to 10 minutes ago if no cache
    const lastChecked = lastCheckedStr 
      ? new Date(lastCheckedStr) 
      : new Date(Date.now() - 10 * 60 * 1000);
    
    // Search for sent emails after last check
    const searchQuery = `in:sent after:${Math.floor(lastChecked.getTime() / 1000)}`;
    const threads = GmailApp.search(searchQuery, 0, 50);
    
    let loggedCount = 0;
    let skippedCount = 0;
    
    for (const thread of threads) {
      const messages = thread.getMessages();
      
      for (const message of messages) {
        const sentDate = message.getDate();
        
        // Only process messages sent after last check
        if (sentDate > lastChecked) {
          const recipient = message.getTo();
          const subject = message.getSubject();
          const body = message.getPlainBody();
          
          // Try to match recipient to a school in the database
          const schoolRow = findSchoolByEmail(recipient);
          
          if (schoolRow) {
            // Summarize the email with Gemini
            const summary = summarizeEmailContent(body);
            
            // Log to Windsurf CRM spreadsheet
            logSentEmail(schoolRow, recipient, subject, summary, sentDate);
            loggedCount++;
            
            console.log(`Logged email to: ${recipient} (Row ${schoolRow})`);
          } else {
            skippedCount++;
            console.log(`No matching school for: ${recipient}`);
          }
        }
      }
    }
    
    // Update last checked timestamp
    cache.put('gmail_last_checked', new Date().toISOString(), 21600); // 6 hour cache
    
    return {
      success: true,
      logged: loggedCount,
      skipped: skippedCount,
      message: `Processed ${loggedCount + skippedCount} emails, logged ${loggedCount} to CRM`
    };
    
  } catch (error) {
    console.error('Error in onGmailSent:', error);
    return {
      error: true,
      message: error.toString()
    };
  }
}

/**
 * Find school row by matching email address
 * Checks Primary Contact Email and General Email columns
 */
function findSchoolByEmail(emailAddress) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find email columns
    const primaryEmailCol = headers.indexOf('Primary Contact Email');
    const generalEmailCol = headers.indexOf('General Email');
    
    // Normalize the search email
    const searchEmail = emailAddress.toLowerCase().trim();
    
    // Also extract just the email if it's in "Name <email>" format
    const emailMatch = searchEmail.match(/<(.+)>/);
    const cleanEmail = emailMatch ? emailMatch[1] : searchEmail;
    
    // Search through all rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Check Primary Contact Email
      if (primaryEmailCol >= 0 && row[primaryEmailCol]) {
        const primaryEmail = row[primaryEmailCol].toString().toLowerCase().trim();
        if (primaryEmail === cleanEmail || cleanEmail.includes(primaryEmail)) {
          return i + 1; // Return 1-indexed row number
        }
      }
      
      // Check General Email
      if (generalEmailCol >= 0 && row[generalEmailCol]) {
        const generalEmail = row[generalEmailCol].toString().toLowerCase().trim();
        if (generalEmail === cleanEmail || cleanEmail.includes(generalEmail)) {
          return i + 1; // Return 1-indexed row number
        }
      }
    }
    
    return null; // No match found
    
  } catch (error) {
    console.error('Error in findSchoolByEmail:', error);
    return null;
  }
}

/**
 * Summarize email content using Gemini API
 * Returns a 2-sentence summary
 */
function summarizeEmailContent(emailBody) {
  try {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    
    if (!apiKey) {
      return 'Email sent (API key not configured for summarization)';
    }
    
    // Truncate body if too long
    const truncatedBody = emailBody.substring(0, 2000);
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{
        parts: [{
          text: `Summarize this outreach email in exactly 2 sentences. Focus on the main purpose and any specific requests or offers made:\n\n${truncatedBody}`
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 100
      }
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode !== 200) {
      console.error('Gemini API error:', responseCode);
      return 'Email sent (summarization failed)';
    }
    
    const json = JSON.parse(response.getContentText());
    const summary = json.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return summary || 'Email sent';
    
  } catch (error) {
    console.error('Error in summarizeEmailContent:', error);
    return 'Email sent (summarization error)';
  }
}

/**
 * Log sent email to Windsurf CRM spreadsheet
 * Updates: Relationship Status, Last Contact Type, Date of last contact, Notes
 */
function logSentEmail(rowNumber, recipient, subject, summary, sentDate) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Find columns to update
    const statusCol = headers.indexOf('Relationship Status') + 1;
    const typeCol = headers.indexOf('Last Contact Type') + 1;
    const dateCol = headers.indexOf('Date of last contact') + 1;
    const notesCol = headers.indexOf('Notes') + 1;
    const subjectCol = headers.indexOf('Last Email Subject') + 1;
    
    // Update Relationship Status
    if (statusCol > 0) {
      sheet.getRange(rowNumber, statusCol).setValue('Contacted');
    }
    
    // Update Last Contact Type
    if (typeCol > 0) {
      sheet.getRange(rowNumber, typeCol).setValue('Email');
    }
    
    // Update Date of last contact
    if (dateCol > 0) {
      sheet.getRange(rowNumber, dateCol).setValue(sentDate);
    }
    
    // Update Last Email Subject (if column exists)
    if (subjectCol > 0) {
      sheet.getRange(rowNumber, subjectCol).setValue(subject);
    }
    
    // Append to Notes with timestamp and summary
    if (notesCol > 0) {
      const existingNotes = sheet.getRange(rowNumber, notesCol).getValue() || '';
      const dateStr = Utilities.formatDate(sentDate, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
      const newNote = `[${dateStr}] ${summary}`;
      
      // Prepend new note to existing notes
      const updatedNotes = existingNotes 
        ? `${newNote}\n---\n${existingNotes}`
        : newNote;
      
      sheet.getRange(rowNumber, notesCol).setValue(updatedNotes);
    }
    
    console.log(`Successfully logged email to row ${rowNumber}`);
    return { success: true, rowNumber: rowNumber };
    
  } catch (error) {
    console.error('Error in logSentEmail:', error);
    return { error: true, message: error.toString() };
  }
}

/**
 * Manual test function - run this to test the auto-logging
 */
function testAutoLogging() {
  console.log('Testing auto-logging system...');
  
  // Test 1: Check sheet access
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    console.log('✅ Sheet access OK: ' + sheet.getName());
    console.log('   Total rows: ' + sheet.getLastRow());
  } catch (e) {
    console.log('❌ Sheet access FAILED: ' + e.toString());
    return;
  }
  
  // Test 2: Check Gemini API
  try {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (apiKey) {
      console.log('✅ Gemini API key configured');
    } else {
      console.log('⚠️ Gemini API key not set (summarization will be limited)');
    }
  } catch (e) {
    console.log('❌ API key check FAILED: ' + e.toString());
  }
  
  // Test 3: Run onGmailSent
  console.log('\nRunning onGmailSent()...');
  const result = onGmailSent();
  console.log('Result: ' + JSON.stringify(result, null, 2));
  
  console.log('\n✅ Test complete!');
}

/**
 * Reset the last checked timestamp (useful for testing)
 */
function resetLastChecked() {
  const cache = CacheService.getScriptCache();
  cache.remove('gmail_last_checked');
  console.log('Last checked timestamp reset. Next run will check last 10 minutes.');
}

// ============================================
// FEATURE 6: DASHBOARD DATA (For Web App UI)
// ============================================

/**
 * Get dashboard data for the Strategic Dashboard UI
 */
function getDashboardData() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find column indices
    const statusCol = headers.indexOf('Relationship Status');
    const emailCol = headers.indexOf('Primary Contact Email');
    const generalEmailCol = headers.indexOf('General Email');
    
    // Calculate funnel metrics
    let totalSchools = data.length - 1;
    let schoolsWithContact = 0;
    let stageContacted = 0;
    let stageResponded = 0;
    let stagePartnership = 0;
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const status = (row[statusCol] || '').toString().toLowerCase();
      const hasEmail = row[emailCol] || row[generalEmailCol];
      
      if (hasEmail) schoolsWithContact++;
      if (status === 'contacted' || status === 'responded' || status === 'partnership') stageContacted++;
      if (status === 'responded' || status === 'partnership') stageResponded++;
      if (status === 'partnership') stagePartnership++;
    }
    
    // Calculate rates
    const contactableRate = totalSchools > 0 ? schoolsWithContact / totalSchools : 0;
    const outreachRate = schoolsWithContact > 0 ? stageContacted / schoolsWithContact : 0;
    const responseRate = stageContacted > 0 ? stageResponded / stageContacted : 0;
    const partnershipRate = stageResponded > 0 ? stagePartnership / stageResponded : 0;
    
    return {
      funnel: {
        totalSchools: totalSchools,
        schoolsWithContact: schoolsWithContact,
        stageContacted: stageContacted,
        stageResponded: stageResponded,
        stagePartnership: stagePartnership
      },
      rates: {
        contactableRate: contactableRate,
        outreachRate: outreachRate,
        responseRate: responseRate,
        partnershipRate: partnershipRate
      },
      q3_goal: {
        list_actual: totalSchools,
        list_target: 150,
        contact_actual: stageContacted,
        meeting_actual: stagePartnership,
        meeting_target: 7
      },
      events: {
        next: null // No events sheet configured yet
      },
      new_kpis: {
        totalContacts: schoolsWithContact,
        warmContacts: stageResponded,
        eventPipeline: 0,
        confirmedEvents: 0
      }
    };
    
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    return { error: error.toString() };
  }
}

/**
 * Get checklist status for an event (placeholder)
 */
function getChecklistStatus(eventName) {
  return {
    "Email schools in the area": false,
    "Look at flights and hotels": false,
    "Fill out all forms and confirmed the visit": false
  };
}

/**
 * Update checklist status for an event (placeholder)
 */
function updateChecklistStatus(eventName, itemName, isChecked) {
  return { success: true };
}
