# 📋 ATLAS TECHNICAL SPECIFICATIONS

## System Architecture

### Current Stack
- **Platform:** Google Apps Script (JavaScript ES6)
- **Database:** Google Sheets (Sheet ID: `132tRQM44YdkZpy4OsmWhbSQfNrEKeO3gqXMB8f-yLZA`)
- **AI Engine:** Google Gemini 2.5 Flash API
- **Frontend:** HTML5 + Tailwind CSS
- **Email:** Gmail API (GmailApp)
- **Storage:** Google Drive API (DriveApp)

### Data Model

**Master Sheet: `LM_WE_Schools_Master`**
```
Columns:
- School Name (string)
- City (string)
- Country (string)
- Primary Contact Name (string)
- Primary Contact Email (string)
- General Email (string)
- Relationship Status (enum: Not Contacted, Contacted, Responded, Partnership)
- Last Contact Type (enum: Email, Phone, Meeting)
- Date of last contact (date)
- Priority Tier (enum: A, B, C)
- School System (enum: IB, A-Levels, etc.)
- Visit Status (string)
```

**Settings Sheet: `email_context`**
```
Format: Key-Value pairs or JSON
Keys:
- Your Name
- Your Title
- University Name
- University Website
- Your Email
- Calendly Link
- Your Region
- About Minerva
```

## API Integrations

### 1. Gemini API
**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

**Authentication:** API Key in Script Properties (`GEMINI_API_KEY`)

**Request Format:**
```json
{
  "contents": [{
    "parts": [{"text": "user query"}]
  }],
  "systemInstruction": {
    "parts": [{"text": "system prompt"}]
  },
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 1024
  }
}
```

**Cost:** ~$0.001 per email generation

### 2. Gmail API
**Methods Used:**
- `GmailApp.createDraft(recipient, subject, body)`
- `GmailApp.getUserLabelByName(name)`
- `GmailApp.createLabel(name)`

**Quota:** 500 drafts per day

**Authorization Scope:** `https://www.googleapis.com/auth/gmail.compose`

### 3. Drive API
**Methods Used:**
- `DriveApp.searchFiles(query)`
- `DriveApp.getFileById(id)`

**Search Query Format:**
```
(title contains "school" or title contains "Germany") 
and mimeType = "application/vnd.google-apps.spreadsheet" 
and trashed = false
```

## Function Specifications

### Core Functions (Existing)

#### `doGet()`
- **Purpose:** Serve HTML frontend
- **Returns:** HtmlOutput
- **Execution Time:** <1s

#### `getSettings()`
- **Purpose:** Load email context and settings
- **Returns:** Object with settings
- **Fallback:** Default settings if sheet missing
- **Execution Time:** <1s

#### `searchSchools(filters)`
- **Input:** `{country: string, query: string}`
- **Returns:** Array of matching schools
- **Execution Time:** 1-3s (depends on data size)

#### `draftEmailForSchool(rowNumber, customInstruction)`
- **Input:** Row number, optional custom instruction
- **Returns:** `{email, subject, draft, schoolName}` or `{error, message}`
- **Execution Time:** 2-5s (Gemini API call)
- **Cost:** $0.001 per call

### New Functions (To Add)

#### `searchDriveForSchools(keywords)`
**Purpose:** Find spreadsheets in Drive containing school data

**Input:**
```javascript
keywords: Array<string> // Optional, defaults to ['school', 'Germany', 'France']
```

**Output:**
```javascript
[{
  id: string,
  name: string,
  url: string,
  lastModified: Date,
  owner: string
}]
```

**Execution Time:** 5-15s (depends on Drive size)

**Limitations:**
- Max 50 results to prevent timeout
- 6-minute Apps Script execution limit

#### `previewSheetData(fileId)`
**Purpose:** Show first 10 rows of spreadsheet for user review

**Input:**
```javascript
fileId: string // Google Sheets ID
```

**Output:**
```javascript
{
  sheetName: string,
  headers: Array<string>,
  sampleRows: Array<Array<any>>,
  totalRows: number,
  fileId: string
}
```

**Execution Time:** 1-2s

#### `consolidateSheets(fileIds)`
**Purpose:** Merge data from multiple sheets into master

**Input:**
```javascript
fileIds: Array<string> // Array of Google Sheets IDs
```

**Output:**
```javascript
{
  success: boolean,
  totalAdded: number,
  totalDuplicates: number,
  errors: Array<string>
}
```

**Logic:**
1. Load master sheet headers
2. For each file:
   - Load data
   - Map columns (fuzzy matching)
   - Check for duplicates (school name + city)
   - Append new rows
3. Return summary

**Execution Time:** 10-30s (depends on data volume)

**Duplicate Detection:**
- Key: `${schoolName}|${city}`.toLowerCase()
- Case-insensitive matching

#### `saveAsGmailDraft(recipientEmail, subject, body, schoolName)`
**Purpose:** Create Gmail draft from generated email

**Input:**
```javascript
{
  recipientEmail: string,
  subject: string,
  body: string,
  schoolName: string // For labeling
}
```

**Output:**
```javascript
{
  success: boolean,
  draftId: string,
  message: string,
  url: string // Link to Gmail drafts
}
```

**Execution Time:** 1-2s

**Features:**
- Auto-creates "Minerva Outreach" label
- Adds label to draft thread

#### `batchCreateDrafts(emails)`
**Purpose:** Create multiple drafts in one operation

**Input:**
```javascript
emails: Array<{
  email: string,
  subject: string,
  body: string,
  schoolName: string
}>
```

**Output:**
```javascript
{
  success: number,
  failed: number,
  errors: Array<string>
}
```

**Execution Time:** 0.1s per draft + overhead

**Limitations:**
- Max 100 drafts per batch (quota protection)
- 100ms delay between drafts (rate limiting)

#### `generateWeeklyReport()`
**Purpose:** Auto-generate Friday report (trigger-based)

**Input:** None (reads from spreadsheet)

**Output:** Gmail draft created

**Execution Time:** 5-10s

**Trigger Setup:**
```
Function: generateWeeklyReport
Event: Time-driven
Type: Week timer
Day: Friday
Time: 4pm - 5pm
```

#### `getWeeklyStats()`
**Purpose:** Calculate statistics for last 7 days

**Output:**
```javascript
{
  dateRange: {start: Date, end: Date},
  contacted: {total: number, byCountry: Object},
  responses: {total: number, rate: number},
  meetings: number,
  fairs: number,
  topRegion: {country: string, responseRate: number}
}
```

**Logic:**
1. Filter rows by date (last 7 days)
2. Count by status and country
3. Calculate conversion rates
4. Identify top performer

#### `formatReportEmail(stats)`
**Purpose:** Format stats into readable email

**Input:** Stats object from `getWeeklyStats()`

**Output:**
```javascript
{
  subject: string,
  body: string
}
```

**Template:**
```
Subject: Weekly Outreach Report - [Date Range]

Hi Alena,

Executive Summary:
[Auto-generated 2-3 sentence overview]

📊 Activity This Week:
- Schools Contacted: X (Germany: Y, France: Z)
- Responses Received: X (Response Rate: Y%)
- Meetings Scheduled: X

📈 Performance Analysis:
- Top Region: [Country] (X% response rate)
- Conversion Rate: X%

🎯 Recommendations:
[Data-driven insights]

Best regards,
Linnea
```

## Error Handling

### API Errors
```javascript
try {
  // API call
} catch (error) {
  console.error('Error:', error);
  return {
    error: true,
    message: error.toString()
  };
}
```

### Quota Limits
- **Gmail:** 500 drafts/day → Track count, warn at 400
- **Gemini:** $100/month budget → Monitor usage
- **Apps Script:** 6-minute execution → Break into chunks

### Data Validation
- Check for empty required fields
- Validate email format
- Sanitize user input
- Handle missing columns gracefully

## Performance Optimization

### Caching
```javascript
// Cache Drive search results (30 minutes)
const cache = CacheService.getScriptCache();
cache.put('driveResults', JSON.stringify(results), 1800);
```

### Batch Operations
- Process 100 rows at once
- Use `getRange()` instead of `getCell()` loops
- Minimize API calls

### Execution Time Management
- Break large operations into chunks
- Use continuation tokens
- Set timeouts for long-running tasks

## Security

### API Keys
- Store in Script Properties (not in code)
- Never log API keys
- Rotate quarterly

### Data Access
- Read-only by default
- Write requires explicit user action
- No auto-deletion of data

### Email Privacy
- Only store work emails
- No student personal data
- GDPR-compliant retention

## Testing Strategy

### Unit Tests
```javascript
function testSearchSchools() {
  const results = searchSchools({country: 'Germany'});
  Logger.log(`Found ${results.length} schools`);
  assert(results.length > 0);
}
```

### Integration Tests
1. Search Drive → Should find files
2. Preview sheet → Should show data
3. Consolidate → Should merge without duplicates
4. Create draft → Should appear in Gmail
5. Weekly report → Should generate stats

### Manual Testing Checklist
- [ ] Search finds relevant files
- [ ] Preview shows correct data
- [ ] Consolidation removes duplicates
- [ ] Gmail drafts created successfully
- [ ] Weekly report has accurate stats
- [ ] No data corruption in master sheet

## Deployment

### Pre-Deployment
1. Backup current Code.gs to Drive
2. Test all functions in development
3. Enable Gmail API (if not already)
4. Set up weekly report trigger
5. Update documentation

### Deployment Steps
1. Open Apps Script editor
2. Copy new functions to Code.gs
3. Save and deploy
4. Test in production with 1 school
5. Monitor for 24 hours
6. Full rollout

### Rollback Plan
1. Keep backup of previous Code.gs
2. If issues: Restore from backup
3. Investigate errors in execution logs
4. Fix and redeploy

## Monitoring

### Execution Logs
```javascript
console.log('Function started');
console.log('Processing X items');
console.error('Error occurred:', error);
```

### Metrics to Track
- API call count (Gemini, Gmail)
- Execution time per function
- Error rate
- User actions (searches, drafts created)

### Alerts
- Gmail quota approaching limit
- API errors > 5% of calls
- Execution timeouts
- Data validation failures

## Cost Analysis

### Current Costs
- Google Workspace: $0 (included)
- Gemini API: $30-40/month

### New Costs
- No additional costs
- Gmail API: Free (within quota)
- Drive API: Free

### Projected Usage
- 50 emails/day = $1.50/month
- 200 emails/month = $6/month
- Weekly reports: $0.40/month
- **Total: ~$35-45/month**

## Future Enhancements

### Phase 4: Analytics Dashboard
- Email open/click tracking
- Response time analysis
- Regional performance comparison
- Predictive modeling

### Phase 5: Mobile App
- Progressive Web App (PWA)
- Offline mode
- Push notifications

### Phase 6: AI Improvements
- Multi-language support
- A/B testing framework
- Learning from user edits
- Sentiment analysis

---

**Last Updated:** January 2, 2026  
**Version:** 2.0  
**Status:** Ready for Implementation
