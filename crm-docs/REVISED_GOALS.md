# 🎯 REVISED ATLAS GOALS - Windsurf CRM Integration

## 📊 **Actual Goal (Clarified January 2, 2026)**

### **Primary Objective:**
Consolidate ALL Western Europe schools into ONE master spreadsheet: **Windsurf CRM**

**Windsurf CRM Spreadsheet:**
- URL: https://docs.google.com/spreadsheets/d/1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY/edit
- Sheet ID: `1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY`
- Status: Copy of original (can make edits)
- Contains: Data structure explanations, column definitions

### **Key Requirements:**

1. **Write Access to Windsurf CRM**
   - Enable system to edit this spreadsheet
   - Log contacts directly to this sheet
   - Update school data in this sheet

2. **Auto-Log Emails from Gmail**
   - Trigger when email is sent from Gmail
   - Log: Date sent, recipient, school name
   - Add 2-sentence summary of email content
   - Update contact status automatically

3. **Populate Missing Data**
   - Example: Only 1 Irish school currently
   - Need to research and add more Irish schools
   - Fill gaps in other countries too

4. **Consolidate Scattered Data**
   - Find all school data across Drive
   - Merge into Windsurf CRM spreadsheet
   - Remove duplicates
   - Maintain data quality

---

## 🔄 **What Changed from Original Plan:**

### **OLD Plan:**
- Use Sheet ID: `132tRQM44YdkZpy4OsmWhbSQfNrEKeO3gqXMB8f-yLZA` (LM_WE_Schools_Master)
- Read-only by default
- Manual contact logging
- Generate emails, save as drafts

### **NEW Plan:**
- Use Sheet ID: `1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY` (Windsurf CRM)
- Write access enabled
- **Auto-log when emails sent from Gmail**
- **Summarize email content (2 sentences)**
- **Research and populate missing schools (Irish, etc.)**

---

## 🚀 **Updated Implementation Plan:**

### **Phase 1: Windsurf CRM Integration (2 hours)**
1. Update Sheet ID in code
2. Review Windsurf CRM structure
3. Map columns to existing code
4. Test read/write access
5. Verify data structure compatibility

### **Phase 2: Gmail Send Trigger (3 hours)** ⭐ **NEW**
1. Set up Gmail API watch for sent emails
2. Detect when email is sent
3. Extract recipient, subject, body
4. Use Gemini to summarize email (2 sentences)
5. Match recipient to school in Windsurf CRM
6. Log contact with summary

**Technical Approach:**
```javascript
// Gmail API: Watch for sent emails
// Trigger: onEmailSent()
// Extract: recipient, subject, body
// Gemini: Summarize in 2 sentences
// Update: Windsurf CRM with log entry
```

### **Phase 3: Data Population (2 hours)** ⭐ **NEW**
1. Research Irish schools (IB, A-Levels)
2. Find school websites, contact emails
3. Add to Windsurf CRM
4. Repeat for other underrepresented countries
5. Verify data quality

**Data Sources:**
- IB World Schools directory
- Google search: "international schools Ireland"
- School websites for contact info

### **Phase 4: Multi-Sheet Consolidation (2 hours)**
1. Search Drive for school spreadsheets
2. Preview and select files
3. Consolidate into Windsurf CRM
4. Remove duplicates
5. Verify data integrity

---

## 🔧 **Technical Changes Needed:**

### **1. Update Sheet ID**
```javascript
// OLD
const SHEET_ID = '132tRQM44YdkZpy4OsmWhbSQfNrEKeO3gqXMB8f-yLZA';

// NEW
const SHEET_ID = '1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY';
```

### **2. Add Gmail Send Trigger** ⭐ **NEW FEATURE**
```javascript
function setupGmailWatch() {
  // Gmail API: Watch sent folder
  // Trigger: onEmailSent()
  // Process: Extract and log
}

function onEmailSent(message) {
  // Extract recipient, subject, body
  // Match to school in Windsurf CRM
  // Summarize with Gemini (2 sentences)
  // Log to spreadsheet
}
```

### **3. Add Email Summarization** ⭐ **NEW FEATURE**
```javascript
function summarizeEmail(emailBody) {
  // Call Gemini API
  // Prompt: "Summarize this email in 2 sentences"
  // Return: 2-sentence summary
}
```

### **4. Enable Write Access**
```javascript
// Remove read-only restrictions
// Enable direct writes to Windsurf CRM
// Add error handling for write operations
```

---

## 📋 **New Requirements:**

### **Gmail Integration:**
- **Trigger:** When email sent from linnea.moritz@uni.minerva.edu
- **Action:** Auto-log to Windsurf CRM
- **Data logged:**
  - Date sent
  - School name (matched from recipient)
  - Contact email
  - 2-sentence summary of email
  - Status: "Contacted"

### **Data Population:**
- **Irish schools:** Research and add 10+ schools
- **Other gaps:** Identify underrepresented countries
- **Data quality:** Verify emails, phone numbers, websites

### **Windsurf CRM Structure:**
- **Review:** Understand existing column structure
- **Map:** Align code with Windsurf CRM columns
- **Preserve:** Keep data explanations and structure

---

## ⚠️ **Critical Questions to Answer:**

1. **Windsurf CRM Structure:**
   - What columns exist?
   - What are the data explanations?
   - How is data currently structured?

2. **Gmail Trigger:**
   - Can we use Gmail API watch?
   - Or use Apps Script installable trigger?
   - How to match sent email to school?

3. **Email Summarization:**
   - Use Gemini API (already configured)?
   - 2 sentences max?
   - What to include in summary?

4. **Data Population:**
   - Which countries need more schools?
   - What data sources to use?
   - How to verify contact info?

---

## 🎯 **Next Steps:**

### **Immediate (Today):**
1. ✅ Share Windsurf CRM spreadsheet with edit access
2. ⏳ Review Windsurf CRM structure (columns, data)
3. ⏳ Update Sheet ID in code
4. ⏳ Test read/write access

### **This Weekend:**
1. Implement Gmail send trigger
2. Add email summarization
3. Research Irish schools
4. Consolidate scattered data

### **Next Week:**
1. Test auto-logging
2. Populate missing schools
3. Verify data quality
4. Deploy to production

---

## 💡 **Key Insights:**

**This is NOT about:**
- ❌ Building a separate web app
- ❌ Read-only data consolidation
- ❌ Manual contact logging

**This IS about:**
- ✅ ONE master spreadsheet (Windsurf CRM)
- ✅ Auto-logging from Gmail
- ✅ AI-powered email summaries
- ✅ Complete Western Europe school database

---

## 📊 **Success Metrics:**

### **Week 1:**
- Windsurf CRM integrated
- Gmail auto-logging working
- 10+ Irish schools added
- First auto-logged email

### **Month 1:**
- 500+ schools in Windsurf CRM
- 50+ auto-logged emails
- All Western Europe countries represented
- Data quality >95%

---

**Status:** Ready to implement revised plan  
**Next:** Review Windsurf CRM structure and update code
