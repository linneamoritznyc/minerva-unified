# 🚀 ATLAS IMPLEMENTATION PLAN
**Minerva Outreach CRM → Atlas Upgrade**  
**Date:** January 2, 2026  
**Developer:** Linnea Moritz  
**Timeline:** This Weekend (8 hours)

---

## 📊 CURRENT STATE ANALYSIS

### ✅ What You Already Have (80% Complete)
Your existing Google Apps Script CRM is **production-ready** with:

**Backend (Code.gs):**
- ✅ Google Sheets integration (Sheet ID: `132tRQM44YdkZpy4OsmWhbSQfNrEKeO3gqXMB8f-yLZA`)
- ✅ AI email generation (Gemini 2.5 Flash API)
- ✅ Personalized email templates with school/counselor context
- ✅ Contact activity logging
- ✅ Country filtering and search
- ✅ Settings management (`email_context` sheet)
- ✅ Error handling and fallbacks

**Frontend (HTML):**
- ✅ "Minerva Outreach Command Center" dashboard
- ✅ Search and filter (priority, status, country)
- ✅ Copy-to-clipboard for AI prompts
- ✅ Sortable data table
- ✅ Tailwind CSS responsive UI

**Analytics:**
- ✅ Conversion funnel (Contactable → Outreach → Response → Partnership)
- ✅ Q3 2025 goal tracking
- ✅ Performance metrics

### ❌ What's Missing (20% - Atlas Requirements)
1. **Multi-sheet discovery** - Currently hardcoded to one spreadsheet
2. **Gmail draft creation** - Emails generated but not saved to Gmail
3. **Weekly automated reports** - No scheduled reporting to Alena

---

## 🎯 IMPLEMENTATION STRATEGY

### Phase 1: Multi-Sheet Drive Search (3 hours)
**Goal:** Find and consolidate German/French school data across scattered spreadsheets

**What to Build:**
```javascript
// New functions to add to Code.gs:

1. searchDriveForSchools()
   - Search entire Drive for spreadsheets
   - Filter by keywords: "school", "Germany", "France", "Berlin", "Paris"
   - Return list of matching files with metadata

2. previewSheetData(fileId)
   - Show first 10 rows of any spreadsheet
   - Let user confirm if it contains school data
   - Display column headers for mapping

3. consolidateSheets(selectedFileIds)
   - Extract data from selected spreadsheets
   - Normalize column names (School Name, City, Country, Email, etc.)
   - Remove duplicates (by school name + city)
   - Create new consolidated sheet in master spreadsheet
   - Return summary (X schools from Y files)
```

**UI Changes:**
- Add "🔍 Find School Data" button to dashboard
- Show file selection interface with checkboxes
- Display preview of each file's data
- "Consolidate Selected Files" action button

**Acceptance Criteria:**
- ✅ User clicks "Find School Data"
- ✅ System shows 5+ relevant spreadsheets
- ✅ User previews and selects files
- ✅ System consolidates into one clean sheet
- ✅ Takes < 5 minutes from search to consolidated data

---

### Phase 2: Gmail Draft Creation (2 hours)
**Goal:** Save generated emails as Gmail drafts ready to send

**What to Build:**
```javascript
// New functions to add to Code.gs:

1. saveAsGmailDraft(recipientEmail, subject, body, schoolName)
   - Create Gmail draft using GmailApp.createDraft()
   - Add label "Minerva Outreach" for organization
   - Return draft URL for user to review
   - Handle Gmail API quota (500 drafts/day)

2. batchCreateDrafts(emailArray)
   - Generate multiple drafts at once
   - Progress indicator (X of Y drafts created)
   - Error handling for failed drafts
   - Return summary report
```

**UI Changes:**
- Add "💾 Save as Gmail Draft" button after email generation
- Show success message with link to Gmail drafts
- Add "📧 Batch Create Drafts" for multiple schools
- Display quota warning if approaching limit

**Acceptance Criteria:**
- ✅ User generates email for school
- ✅ Clicks "Save as Gmail Draft"
- ✅ Draft appears in Gmail within 5 seconds
- ✅ Draft has correct recipient, subject, body
- ✅ User can review and send from Gmail

---

### Phase 3: Weekly Report Automation (3 hours)
**Goal:** Automated Friday 4pm reports to Alena

**What to Build:**
```javascript
// New functions to add to Code.gs:

1. generateWeeklyReport()
   - Calculate stats from last 7 days:
     * Schools contacted (by country)
     * Email open rates (if tracking enabled)
     * Responses received
     * Meetings scheduled
     * Fair registrations
   - Generate executive summary (2-3 sentences)
   - Create formatted report email
   - Save as Gmail draft to linnea.moritz@uni.minerva.edu

2. getWeeklyStats()
   - Query master spreadsheet for activity
   - Filter by date range (last 7 days)
   - Calculate conversion rates
   - Identify top performing regions
   - Flag any missed deadlines

3. formatReportEmail(stats)
   - Professional email template
   - Executive summary at top
   - Detailed metrics in sections
   - Strategic recommendations
   - Action items for next week
```

**Trigger Setup:**
1. Open Apps Script editor
2. Click "Triggers" (clock icon)
3. Add trigger:
   - Function: `generateWeeklyReport`
   - Event: Time-driven
   - Type: Week timer
   - Day: Friday
   - Time: 4pm - 5pm

**Report Template:**
```
Subject: Weekly Outreach Report - [Date Range]

Hi Alena,

Executive Summary:
[2-3 sentence overview of the week]

📊 Activity This Week:
- Schools Contacted: X (Germany: Y, France: Z)
- Responses Received: X (Response Rate: Y%)
- Meetings Scheduled: X
- Fair Registrations: X

📈 Performance Analysis:
- Top Performing Region: [Country] (X% response rate)
- Conversion Rate: X% (contacted → responded)
- Partnership Pipeline: X schools in discussion

🎯 Strategic Recommendations:
[Data-driven insights based on performance]

📅 Next Week Priorities:
[Upcoming deadlines and focus areas]

Best regards,
Linnea
```

**Acceptance Criteria:**
- ✅ Report generates automatically every Friday 4pm
- ✅ Draft appears in Gmail (not auto-sent)
- ✅ Contains accurate stats from last 7 days
- ✅ Includes strategic recommendations
- ✅ Takes < 5 minutes to review and send

---

## 🛠️ TECHNICAL IMPLEMENTATION

### Required APIs & Permissions
1. **Google Drive API** (already enabled)
   - `DriveApp.searchFiles()`
   - Read spreadsheet files

2. **Gmail API** (needs enabling)
   - `GmailApp.createDraft()`
   - Create labels
   - Authorization scope: `https://www.googleapis.com/auth/gmail.compose`

3. **Gemini API** (already configured)
   - API key stored in Script Properties
   - Model: `gemini-2.5-flash`

### Code Structure
```
Code.gs (Backend)
├── Existing Functions (Keep as-is)
│   ├── doGet()
│   ├── getSettings()
│   ├── getCountryList()
│   ├── searchSchools()
│   ├── draftEmailForSchool()
│   └── logContact()
│
└── New Functions (Add)
    ├── searchDriveForSchools()
    ├── previewSheetData()
    ├── consolidateSheets()
    ├── saveAsGmailDraft()
    ├── batchCreateDrafts()
    ├── generateWeeklyReport()
    ├── getWeeklyStats()
    └── formatReportEmail()
```

### Data Flow
```
User Action → Frontend (HTML) → Backend (Code.gs) → Google Services
                                                    ├── Drive API
                                                    ├── Sheets API
                                                    ├── Gmail API
                                                    └── Gemini API
```

---

## 📅 WEEKEND SCHEDULE

### Saturday Morning (4 hours)
**9:00 - 11:00am:** Phase 1 - Multi-Sheet Discovery
- Write `searchDriveForSchools()` function
- Write `previewSheetData()` function
- Write `consolidateSheets()` function
- Test with real Drive files

**11:00am - 1:00pm:** Phase 1 - UI Integration
- Add "Find School Data" button
- Build file selection interface
- Add preview modal
- Test end-to-end workflow

### Saturday Afternoon (2 hours)
**2:00 - 4:00pm:** Phase 2 - Gmail Drafts
- Enable Gmail API in Apps Script
- Write `saveAsGmailDraft()` function
- Write `batchCreateDrafts()` function
- Add UI buttons
- Test draft creation

### Sunday Morning (2 hours)
**9:00 - 11:00am:** Phase 3 - Weekly Reports
- Write `generateWeeklyReport()` function
- Write `getWeeklyStats()` function
- Write `formatReportEmail()` function
- Set up time-based trigger
- Test report generation

### Sunday Afternoon (1 hour)
**11:00am - 12:00pm:** Testing & Documentation
- End-to-end testing of all features
- Update user documentation
- Deploy to production
- Demo to Alena (optional)

---

## ✅ ACCEPTANCE CRITERIA

### Phase 1: Multi-Sheet Discovery
- [ ] User can search entire Drive for school spreadsheets
- [ ] System finds 5+ relevant files
- [ ] User can preview data before consolidating
- [ ] System creates clean consolidated sheet
- [ ] Process takes < 5 minutes

### Phase 2: Gmail Drafts
- [ ] Generated emails save as Gmail drafts
- [ ] Drafts appear in Gmail within 5 seconds
- [ ] Drafts have correct recipient/subject/body
- [ ] Batch creation works for 10+ schools
- [ ] Quota warnings display when approaching limit

### Phase 3: Weekly Reports
- [ ] Report generates automatically Friday 4pm
- [ ] Draft appears in Gmail (not auto-sent)
- [ ] Contains accurate 7-day stats
- [ ] Includes strategic recommendations
- [ ] Takes < 5 minutes to review

---

## 🚨 RISK MITIGATION

### Technical Risks
1. **Gmail API Quota** (500 drafts/day)
   - Mitigation: Add quota tracking, warn at 400 drafts
   - Fallback: Batch operations across multiple days

2. **Drive Search Performance** (slow with 1000+ files)
   - Mitigation: Cache results, add pagination
   - Optimization: Search specific folders first

3. **Apps Script 6-Minute Limit**
   - Mitigation: Break consolidation into chunks
   - Use continuation tokens for large operations

### Data Risks
1. **Duplicate Schools** (same school in multiple sheets)
   - Mitigation: Match by school name + city
   - UI: Show duplicates, let user choose which to keep

2. **Missing Columns** (inconsistent spreadsheet formats)
   - Mitigation: Flexible column mapping
   - UI: Let user map columns manually if auto-detect fails

---

## 📊 SUCCESS METRICS

### Immediate (This Weekend)
- ✅ All 3 phases completed and tested
- ✅ System consolidates 20+ schools from 5+ spreadsheets
- ✅ 10 Gmail drafts created successfully
- ✅ First weekly report generated

### Week 1 (After Deployment)
- 50+ schools consolidated from scattered sheets
- 30+ Gmail drafts created
- First automated Friday report sent to Alena
- User reports 5+ hours saved

### Month 1 (Production Use)
- 200+ schools in consolidated database
- 100+ emails sent via Gmail drafts
- 4 weekly reports delivered
- Response rate improved 10%+

---

## 🔄 FUTURE ENHANCEMENTS (Post-Weekend)

### Phase 4: Advanced Analytics (Week 2)
- Email open/click tracking
- A/B testing subject lines
- Regional performance comparison
- Predictive response rate modeling

### Phase 5: Prospect Discovery (Week 3-4)
- Olympiad result monitoring (with legal review)
- Automated school research
- LinkedIn integration for counselor discovery

### Phase 6: Mobile Optimization (Week 5)
- Progressive Web App (PWA)
- Offline mode
- Push notifications for responses

---

## 📝 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Backup current Code.gs to Drive
- [ ] Test all functions in development
- [ ] Enable Gmail API in Apps Script project
- [ ] Set up weekly report trigger
- [ ] Update user documentation

### Deployment
- [ ] Deploy new Code.gs version
- [ ] Test in production with real data
- [ ] Verify Gmail drafts working
- [ ] Confirm weekly report trigger active
- [ ] Monitor for errors (24 hours)

### Post-Deployment
- [ ] Demo to Alena (optional)
- [ ] Collect user feedback
- [ ] Monitor API quotas
- [ ] Document any issues
- [ ] Plan Phase 4 enhancements

---

## 💰 COST ANALYSIS

### Current Costs: $0/month
- Google Apps Script: Free
- Google Drive/Sheets: Free (Workspace account)
- Gmail: Free (Workspace account)

### New Costs: $30-40/month
- Gemini API: $30-40/month (existing)
- No additional costs for new features

### ROI
- Time saved: 10-15 hours/week
- Value: $25,000+/year
- Cost: $360-480/year
- ROI: 5,000%+

---

## 🎯 NEXT STEPS

1. **Read this plan** ✅
2. **Review updated Code.gs** (being created now)
3. **Test Phase 1** (Multi-sheet discovery)
4. **Test Phase 2** (Gmail drafts)
5. **Test Phase 3** (Weekly reports)
6. **Deploy to production**
7. **Demo to Alena**

---

## 📞 SUPPORT & QUESTIONS

If you encounter issues:
1. Check Apps Script execution logs (View > Logs)
2. Verify API permissions granted
3. Check Gmail API quota usage
4. Review error messages in UI
5. Test with small datasets first

---

**Ready to build? Let's upgrade your CRM to Atlas this weekend! 🚀**
