# PRODUCT REQUIREMENTS DOCUMENT
## Atlas - AI-Powered CRM for University Outreach

**Project:** Atlas CRM Enhancement  
**Product Owner:** Linnea Moritz  
**Target User:** Alumni Ambassador, Western Europe (Minerva University)  
**Development Platform:** Google Apps Script  
**Version:** 2.0  
**Date:** January 2, 2026  
**Status:** Ready for Implementation

---

## EXECUTIVE SUMMARY

### The Problem
As the sole Alumni Ambassador covering Western Europe and the Nordic region (30+ countries), outreach operations are managed through:
- Multiple unstructured Google Sheets scattered across Drive
- Manual email generation taking 15-20 minutes per school
- No systematic way to track which schools have been contacted
- Weekly reporting to manager takes 2+ hours of manual data compilation
- No ability to discover high-value prospects systematically

**Impact:** 10-15 hours per week spent on operational tasks instead of strategic relationship building.

### The Solution
Atlas is an enhanced Google Apps Script CRM that automates operational tasks and enables data-driven decision making.

**Core Capabilities:**
1. **Multi-Sheet Discovery** - Find and consolidate school data across scattered spreadsheets
2. **AI Email Generation** - Personalized outreach emails using Gemini API (already built)
3. **Gmail Draft Creation** - Save generated emails directly to Gmail drafts (reusing Anti-Apathy Portal code)
4. **Weekly Reporting** - Automated Friday reports with performance analytics
5. **Contact Tracking** - Log all outreach activity in centralized database

### Business Value
- **Time Savings:** 10-15 hours/week → 2-3 hours/week (80% reduction)
- **Data Quality:** Single source of truth for all school data
- **Strategic Insight:** Performance analytics by region, school type, and time period
- **Scalability:** Can handle 500+ schools vs current 50-100
- **Cost:** $35-45/month (Gemini API only)
- **ROI:** $25,000+ annual value for <$600/year investment

---

## PROBLEM STATEMENT

### Current State
**What exists today:**
- ✅ Google Apps Script CRM with basic school search
- ✅ AI email generation using Gemini 2.5 Flash
- ✅ Manual contact logging in spreadsheet
- ✅ Basic analytics dashboard
- ✅ Gmail draft creation (from Anti-Apathy Portal)

**Pain Points:**
1. **Data Fragmentation**
   - School data scattered across 10+ spreadsheets
   - No way to find all German/French schools quickly
   - Duplicate entries across files
   - Inconsistent column naming

2. **Manual Email Workflow**
   - Generate email in CRM
   - Copy to Gmail manually
   - Create draft manually
   - Log contact manually
   - 5-10 minutes per school

3. **Reporting Burden**
   - Manager expects weekly updates every Friday
   - 2+ hours to compile stats manually
   - No automated insights
   - Easy to miss important trends

4. **No Prospect Discovery**
   - Can't systematically find high-value schools
   - Rely on manual research
   - Miss opportunities in new regions

### Desired State
**What success looks like:**
- 🎯 All school data in one consolidated database
- 🎯 Find any school in <10 seconds
- 🎯 Generate and save email draft in <2 minutes
- 🎯 Weekly report auto-generated every Friday
- 🎯 Data-driven insights guide regional strategy
- 🎯 Spend 80% of time on relationships, 20% on operations

---

## GOALS & SUCCESS METRICS

### Primary Goals
1. **Reduce operational overhead** from 10-15 hours/week to 2-3 hours/week
2. **Consolidate data** from scattered spreadsheets into single source of truth
3. **Automate reporting** to manager with zero manual effort
4. **Enable data-driven strategy** through performance analytics

### Success Metrics

#### Efficiency Metrics
- **Time to find school data:** 30+ minutes → <5 minutes (90% reduction)
- **Time to generate email:** 15-20 minutes → <2 minutes (90% reduction)
- **Weekly reporting time:** 2 hours → 5 minutes (95% reduction)
- **Total weekly time saved:** 10-15 hours → 2-3 hours (80% reduction)

#### Quality Metrics
- **Data completeness:** 60% → 95% (schools with contact info)
- **Duplicate rate:** 15% → <2% (after consolidation)
- **Email personalization:** 70% → 95% (AI-generated quality)
- **Response rate:** Current baseline → +20% improvement (better targeting)

#### Adoption Metrics
- **User completes consolidation:** Within first week
- **Gmail drafts created:** 30+ in first month
- **Weekly reports delivered:** 4/4 Fridays in first month
- **User satisfaction:** "Indispensable" rating after 30 days

---

## USER PERSONAS

### Primary User: Linnea Moritz
**Role:** Alumni Ambassador, Western Europe  
**Organization:** Minerva University  
**Location:** Sweden (covering 30+ countries)

**Responsibilities:**
- Outreach to 500+ international schools
- Build relationships with university counselors
- Organize virtual workshops and campus visits
- Report weekly to manager (Alena)
- Attend education fairs across Europe

**Pain Points:**
- Overwhelmed by operational tasks
- Data scattered across multiple files
- Manual reporting takes hours
- Hard to prioritize which schools to contact
- No visibility into what's working

**Goals:**
- Spend more time building relationships
- Data-driven regional strategy
- Impress manager with professional reports
- Scale outreach without burning out

**Tech Savviness:** High
- Comfortable with Google Apps Script
- Built Anti-Apathy Portal (job search automation)
- Uses AI tools daily (Gemini, Claude)
- Prefers automation over manual work

### Secondary User: Alena (Manager)
**Role:** Manager of Alumni Ambassadors  
**Needs:**
- Weekly updates on outreach activity
- Performance metrics by region
- Strategic recommendations
- Confidence in data accuracy

**Current Frustration:**
- Reports are inconsistent
- Hard to compare performance across ambassadors
- No visibility into pipeline

**Desired Outcome:**
- Professional weekly reports
- Data-driven insights
- Proactive recommendations
- Confidence in Linnea's operations

---

## FEATURES & REQUIREMENTS

### Feature 1: Multi-Sheet Drive Search
**Priority:** P0 (Must Have)  
**Effort:** 3 hours  
**User Story:** As an ambassador, I want to search my entire Drive for school spreadsheets so I can consolidate all data in one place.

**Functional Requirements:**
- FR1.1: System searches Google Drive for spreadsheets containing keywords: "school", "Germany", "France", "Berlin", "Paris", "IB", "counselor"
- FR1.2: System displays list of matching files with metadata (name, last modified, owner)
- FR1.3: User can preview first 10 rows of any file before selecting
- FR1.4: User can select multiple files to consolidate
- FR1.5: System extracts data from selected files
- FR1.6: System maps columns automatically (fuzzy matching: "School Name" = "School" = "Name")
- FR1.7: System detects duplicates by school name + city (case-insensitive)
- FR1.8: System appends new schools to master spreadsheet
- FR1.9: System shows summary: "Added X schools, skipped Y duplicates, Z errors"

**Non-Functional Requirements:**
- NFR1.1: Search completes in <15 seconds for 100+ files
- NFR1.2: Consolidation processes 500 rows in <30 seconds
- NFR1.3: Duplicate detection accuracy >98%
- NFR1.4: Original files remain untouched (read-only)

**Acceptance Criteria:**
- ✅ User clicks "Find School Data"
- ✅ System finds 5+ relevant spreadsheets
- ✅ User previews and selects 3 files
- ✅ System consolidates without duplicates
- ✅ Process completes in <5 minutes
- ✅ Master sheet has 200+ schools

**Edge Cases:**
- Empty spreadsheets → Skip with warning
- Missing columns → Map what's available, flag missing data
- Inconsistent formats → Best-effort mapping, show conflicts
- Large files (1000+ rows) → Process in chunks to avoid timeout

---

### Feature 2: Gmail Draft Creation
**Priority:** P0 (Must Have)  
**Effort:** 1 hour (reusing Anti-Apathy Portal code)  
**User Story:** As an ambassador, I want generated emails to save directly as Gmail drafts so I can review and send quickly.

**Functional Requirements:**
- FR2.1: After email generation, user clicks "Save as Gmail Draft"
- FR2.2: System creates draft in Gmail with correct recipient, subject, body
- FR2.3: System adds "Minerva Outreach" label to draft
- FR2.4: System shows success message with link to Gmail drafts
- FR2.5: System logs contact in spreadsheet (status: "Contacted", date: today)
- FR2.6: User can batch create drafts for 10+ schools at once

**Non-Functional Requirements:**
- NFR2.1: Draft appears in Gmail within 5 seconds
- NFR2.2: Batch creation: 100ms per draft + overhead
- NFR2.3: Gmail API quota: 500 drafts/day (warn at 400)
- NFR2.4: Email recipient: linnea.moritz@uni.minerva.edu (university email)

**Acceptance Criteria:**
- ✅ User generates email for school
- ✅ Clicks "Save as Gmail Draft"
- ✅ Draft appears in Gmail within 5 seconds
- ✅ Draft has correct recipient/subject/body
- ✅ Draft has "Minerva Outreach" label
- ✅ Contact logged in spreadsheet
- ✅ User can open Gmail and send immediately

**Technical Notes:**
- Reuse code from Anti-Apathy Portal (already working)
- Change recipient email from personal to university
- Use `GmailApp.createDraft(recipient, subject, body)`
- Error handling for quota limits

---

### Feature 3: Weekly Report Automation
**Priority:** P0 (Must Have)  
**Effort:** 2 hours  
**User Story:** As an ambassador, I want automated weekly reports so I can send professional updates to my manager without manual work.

**Functional Requirements:**
- FR3.1: Every Friday at 4pm CET, system generates weekly report
- FR3.2: Report includes:
  - Executive summary (2-3 sentences)
  - Schools contacted by country
  - Response rate and conversion metrics
  - Meetings scheduled
  - Fair registrations
  - Top performing region
  - Strategic recommendations
- FR3.3: System creates Gmail draft (does NOT auto-send)
- FR3.4: User reviews and sends to manager
- FR3.5: User can manually trigger report generation anytime

**Non-Functional Requirements:**
- NFR3.1: Report generation completes in <10 seconds
- NFR3.2: Data accuracy: 100% (pulls from master sheet)
- NFR3.3: Report format: Professional, scannable, actionable
- NFR3.4: Trigger reliability: 99%+ (Google Apps Script time-based trigger)

**Acceptance Criteria:**
- ✅ Friday 4pm: Draft appears in Gmail automatically
- ✅ Report contains accurate 7-day stats
- ✅ Executive summary is coherent and useful
- ✅ Strategic recommendations are data-driven
- ✅ User reviews and sends in <5 minutes
- ✅ Manager is impressed with quality

**Report Template:**
```
Subject: Weekly Outreach Report - [Date Range]

Hi Alena,

Executive Summary:
This week I contacted 15 schools across Germany (8) and France (7), 
with a 20% response rate. Germany continues to outperform France 
(25% vs 14% response rate), suggesting we should reallocate focus.

📊 Activity This Week:
- Schools Contacted: 15 (Germany: 8, France: 7)
- Responses Received: 3 (Response Rate: 20%)
- Meetings Scheduled: 1
- Fair Registrations: 2

📈 Performance Analysis:
- Top Performing Region: Germany (25% response rate)
- Conversion Rate: 20% (contacted → responded)
- Partnership Pipeline: 5 schools in active discussion

🎯 Strategic Recommendations:
1. Increase Germany outreach (higher response rate)
2. A/B test subject lines for France (low engagement)
3. Follow up with 3 pending responses from last week

📅 Next Week Priorities:
- Berlin education fair (Jan 15-16)
- Follow up with 8 pending responses
- Target 20 new schools in Switzerland

Best regards,
Linnea
```

---

### Feature 4: Enhanced Analytics Dashboard
**Priority:** P1 (Should Have)  
**Effort:** 2 hours  
**User Story:** As an ambassador, I want to see performance trends so I can optimize my outreach strategy.

**Functional Requirements:**
- FR4.1: Dashboard shows conversion funnel:
  - Total schools → Schools with contact → Contacted → Responded → Partnership
- FR4.2: Performance by country (response rate, conversion rate)
- FR4.3: Time series: Outreach activity over last 12 weeks
- FR4.4: Goal tracking: Progress toward quarterly targets
- FR4.5: Recommendations based on data patterns

**Acceptance Criteria:**
- ✅ Dashboard loads in <3 seconds
- ✅ Charts are clear and actionable
- ✅ User can identify top/bottom performers
- ✅ Recommendations are specific and useful

---

## OUT OF SCOPE (Future Phases)

### Phase 4: Prospect Discovery (Not in MVP)
- Olympiad result monitoring
- Automated school research
- LinkedIn integration
- **Reason:** Legal complexity, requires GDPR review

### Phase 5: Email Tracking (Not in MVP)
- Open rate tracking
- Click rate tracking
- A/B testing framework
- **Reason:** Requires external service integration

### Phase 6: Mobile App (Not in MVP)
- Progressive Web App
- Offline mode
- Push notifications
- **Reason:** Scope creep, web interface sufficient

---

## TECHNICAL ARCHITECTURE

### Technology Stack
- **Platform:** Google Apps Script (JavaScript ES6)
- **Database:** Google Sheets (existing: `132tRQM44YdkZpy4OsmWhbSQfNrEKeO3gqXMB8f-yLZA`)
- **AI Engine:** Google Gemini 2.5 Flash API
- **Email:** Gmail API (GmailApp)
- **Storage:** Google Drive API (DriveApp)
- **Frontend:** HTML5 + Tailwind CSS

### System Components

```
┌─────────────────────────────────────────────┐
│           User Interface (HTML)              │
│  - School search                             │
│  - Email generation                          │
│  - Drive file selection                      │
│  - Analytics dashboard                       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│        Backend (Code.gs)                     │
│  - searchDriveForSchools()                   │
│  - consolidateSheets()                       │
│  - draftEmailForSchool()                     │
│  - saveAsGmailDraft()                        │
│  - generateWeeklyReport()                    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Google Services                      │
│  - Drive API (file search)                   │
│  - Sheets API (data storage)                 │
│  - Gmail API (draft creation)                │
│  - Gemini API (email generation)             │
└──────────────────────────────────────────────┘
```

### Data Model

**Master Sheet: `LM_WE_Schools_Master`**
```
Primary Key: School Name + City (composite)
Columns:
- School Name (string, required)
- City (string, required)
- Country (string, required)
- Primary Contact Name (string, optional)
- Primary Contact Email (string, optional)
- General Email (string, optional)
- Relationship Status (enum: Not Contacted, Contacted, Responded, Partnership)
- Last Contact Type (enum: Email, Phone, Meeting)
- Date of last contact (date)
- Priority Tier (enum: A, B, C)
- School System (enum: IB, A-Levels, etc.)
- Visit Status (string)
```

### API Integrations

**Gemini API:**
- Model: gemini-2.5-flash
- Cost: ~$0.001 per email
- Quota: Unlimited (pay-per-use)

**Gmail API:**
- Method: GmailApp.createDraft()
- Quota: 500 drafts/day
- Cost: Free

**Drive API:**
- Method: DriveApp.searchFiles()
- Quota: Unlimited
- Cost: Free

---

## SECURITY & COMPLIANCE

### Data Protection
- **Read-Only by Default:** Original spreadsheets never modified
- **User Confirmation:** All write operations require explicit approval
- **Backup Strategy:** Daily backups before any data changes
- **Version History:** Google Sheets native versioning

### GDPR Compliance
- **Data Minimization:** Only store work emails, no personal data
- **Lawful Basis:** Legitimate business interest (B2B outreach)
- **Retention Policy:** Delete contact data after 2 years of inactivity
- **Data Subject Rights:** Can delete any contact on request
- **Opt-Out:** Email footer includes unsubscribe option

### API Security
- **API Keys:** Stored in Script Properties (not in code)
- **Access Control:** Single user (linnea.moritz@uni.minerva.edu)
- **Session Management:** Google OAuth (automatic)
- **Audit Logging:** Apps Script execution logs

---

## IMPLEMENTATION PLAN

### Phase 0: Preparation (1 hour)
- Backup current Code.gs to Drive
- Enable Gmail API in Apps Script project
- Review existing code structure
- Set up development environment

### Phase 1: Multi-Sheet Discovery (3 hours)
**Saturday Morning, 9am-12pm**
- Implement `searchDriveForSchools()`
- Implement `previewSheetData()`
- Implement `consolidateSheets()`
- Build UI for file selection
- Test with real Drive files

**Deliverable:** Can search Drive and consolidate spreadsheets

### Phase 2: Gmail Draft Integration (1 hour)
**Saturday Afternoon, 2pm-3pm**
- Copy Gmail draft code from Anti-Apathy Portal
- Adapt for university email (linnea.moritz@uni.minerva.edu)
- Add "Save as Draft" button to UI
- Test draft creation with 3 schools

**Deliverable:** Generated emails save as Gmail drafts

### Phase 3: Weekly Report Automation (2 hours)
**Sunday Morning, 9am-11am**
- Implement `generateWeeklyReport()`
- Implement `getWeeklyStats()`
- Implement `formatReportEmail()`
- Set up Friday 4pm trigger
- Test report generation

**Deliverable:** Automated weekly reports

### Phase 4: Testing & Deployment (30 minutes)
**Sunday Morning, 11am-11:30am**
- End-to-end testing
- Deploy to production
- Monitor for errors
- Update documentation

**Deliverable:** Production-ready Atlas system

### Total Timeline: 6.5 hours over one weekend

---

## RISKS & MITIGATION

### Technical Risks

**Risk 1: Apps Script 6-Minute Timeout**
- **Impact:** High (consolidation fails for large datasets)
- **Probability:** Medium
- **Mitigation:** Process in chunks, use continuation tokens
- **Fallback:** Manual batch processing

**Risk 2: Gmail API Quota (500 drafts/day)**
- **Impact:** Medium (can't create more drafts)
- **Probability:** Low (typical usage: 20-30/day)
- **Mitigation:** Track quota, warn at 400, batch across days
- **Fallback:** Manual draft creation

**Risk 3: Gemini API Cost Overrun**
- **Impact:** Low (budget: $100/month)
- **Probability:** Low (typical: $35-45/month)
- **Mitigation:** Monitor usage, set hard limits
- **Fallback:** Reduce AI usage, use templates

### Data Risks

**Risk 4: Duplicate Schools**
- **Impact:** Medium (data quality issues)
- **Probability:** High (multiple sources)
- **Mitigation:** Fuzzy matching algorithm, user review
- **Fallback:** Manual deduplication

**Risk 5: Data Loss**
- **Impact:** High (lose all work)
- **Probability:** Very Low (Google Sheets reliability)
- **Mitigation:** Daily backups, version history
- **Fallback:** Restore from backup

### User Adoption Risks

**Risk 6: User Doesn't Adopt**
- **Impact:** High (wasted development effort)
- **Probability:** Low (user is developer)
- **Mitigation:** User-driven requirements, iterative feedback
- **Fallback:** N/A (user is building for themselves)

---

## SUCCESS CRITERIA

### Launch Criteria (Must Have)
- ✅ All 3 core features implemented and tested
- ✅ System consolidates 200+ schools successfully
- ✅ 10 Gmail drafts created without errors
- ✅ First weekly report generated and sent
- ✅ No data corruption in master sheet
- ✅ User completes end-to-end workflow in <30 minutes

### Week 1 Success (Early Indicators)
- 50+ schools consolidated from scattered sheets
- 30+ Gmail drafts created
- First automated Friday report delivered
- User reports 5+ hours saved
- Zero critical bugs

### Month 1 Success (Adoption)
- 200+ schools in consolidated database
- 100+ emails sent via Gmail drafts
- 4/4 weekly reports delivered on time
- Response rate baseline established
- User rates system as "indispensable"

### Quarter 1 Success (Impact)
- 500+ schools in database
- 300+ emails sent
- 12/12 weekly reports delivered
- Response rate improved 20%+
- Manager praises data quality
- User saves 10+ hours/week consistently

---

## COST-BENEFIT ANALYSIS

### Development Costs
- **Time Investment:** 6.5 hours (one weekend)
- **Opportunity Cost:** $0 (weekend project)
- **Learning Value:** High (reusable skills)

### Operating Costs
- **Gemini API:** $35-45/month
- **Google Workspace:** $0 (already have)
- **Gmail API:** $0 (free)
- **Drive API:** $0 (free)
- **Total:** $35-45/month ($420-540/year)

### Benefits
- **Time Saved:** 10-15 hours/week = 520-780 hours/year
- **Hourly Value:** $50/hour (conservative)
- **Annual Value:** $26,000-39,000
- **Data Quality:** Priceless (better decisions)
- **Manager Satisfaction:** Priceless (career impact)

### ROI Calculation
- **Investment:** $540/year (operating costs)
- **Return:** $26,000/year (time savings)
- **ROI:** 4,700%
- **Payback Period:** 1 week

---

## APPENDIX

### Glossary
- **Apps Script:** Google's JavaScript platform for automation
- **Gemini:** Google's AI model for text generation
- **Gmail Draft:** Unsent email saved in Gmail
- **Master Sheet:** Central database of all school data
- **Consolidation:** Merging data from multiple sources
- **Fuzzy Matching:** Approximate string matching algorithm

### References
- Google Apps Script Documentation: https://developers.google.com/apps-script
- Gemini API Documentation: https://ai.google.dev/docs
- Gmail API Documentation: https://developers.google.com/gmail/api
- Anti-Apathy Portal: Existing project with Gmail draft code

### Change Log
- **v1.0 (Dec 2024):** Initial CRM with AI email generation
- **v2.0 (Jan 2026):** Atlas upgrade with multi-sheet discovery, Gmail drafts, weekly reports

---

## APPROVAL & SIGN-OFF

**Product Owner:** Linnea Moritz  
**Status:** Approved for Implementation  
**Start Date:** January 4, 2026 (Saturday)  
**Target Completion:** January 5, 2026 (Sunday)  
**Review Date:** January 12, 2026 (1 week post-launch)

---

**Document Version:** 1.0  
**Last Updated:** January 2, 2026  
**Next Review:** Post-implementation (January 12, 2026)
