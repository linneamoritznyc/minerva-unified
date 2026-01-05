# 🚀 ATLAS IMPLEMENTATION - STEP BY STEP GUIDE

## ✅ **First Step: Review & Deploy Enhanced Code**

I've created `Code_Enhanced.gs` with all 3 new features added to your existing code.

---

## 📋 **What to Do Now:**

### **Step 1: Backup Your Current Code (2 minutes)**

1. Open your Google Apps Script project
2. Go to https://script.google.com
3. Find your CRM project
4. Copy your current `Code.gs` to a new file called `Code_Backup.gs`
5. Save it

**Why:** Safety first - keep your working code safe

---

### **Step 2: Review the Enhanced Code (5 minutes)**

1. Open `Code_Enhanced.gs` from your Desktop CRM Coding folder
2. Scroll through and review the 3 new sections:
   - **FEATURE 1:** Multi-Sheet Drive Search (lines ~250-400)
   - **FEATURE 2:** Gmail Draft Creation (lines ~400-480)
   - **FEATURE 3:** Weekly Report Automation (lines ~480-600)

**What to look for:**
- ✅ All your existing functions are preserved
- ✅ New functions are clearly marked
- ✅ Email goes to `linnea.moritz@uni.minerva.edu`
- ✅ Sheet ID matches yours: `132tRQM44YdkZpy4OsmWhbSQfNrEKeO3gqXMB8f-yLZA`

---

### **Step 3: Deploy Enhanced Code (5 minutes)**

1. In Apps Script editor, select all text in `Code.gs`
2. Delete it
3. Copy all content from `Code_Enhanced.gs`
4. Paste into `Code.gs`
5. Click **Save** (Ctrl+S / Cmd+S)
6. Click **Deploy** > **Test deployments**

**Expected result:** "Saved successfully"

---

### **Step 4: Test Multi-Sheet Discovery (10 minutes)**

1. In Apps Script editor, select function: `searchDriveForSchools`
2. Click **Run**
3. Grant permissions if asked
4. Check **Execution log** (View > Logs)

**Expected output:**
```
{
  success: true,
  files: [...],
  count: 5+
}
```

**If it works:** ✅ You can now search your Drive for school spreadsheets

**If it fails:** Check error message, likely permissions issue

---

### **Step 5: Test Gmail Draft Creation (5 minutes)**

1. Generate an email for any school (using your existing UI)
2. Call `saveAsGmailDraft()` with the email data
3. Check your Gmail drafts

**Expected result:** Draft appears in Gmail within 5 seconds

**Test code:**
```javascript
function testGmailDraft() {
  const testEmail = {
    email: 'test@example.com',
    subject: 'Test Subject',
    draft: 'Test body',
    schoolName: 'Test School',
    rowNumber: 2
  };
  
  const result = saveAsGmailDraft(testEmail);
  Logger.log(result);
}
```

---

### **Step 6: Test Weekly Report (5 minutes)**

1. In Apps Script editor, select function: `generateWeeklyReport`
2. Click **Run**
3. Check Gmail drafts

**Expected result:** Weekly report draft created

**If it works:** ✅ Report automation is ready

---

### **Step 7: Set Up Weekly Trigger (3 minutes)**

1. In Apps Script editor, click **Triggers** (clock icon on left)
2. Click **+ Add Trigger**
3. Configure:
   - **Function:** `generateWeeklyReport`
   - **Event source:** Time-driven
   - **Type:** Week timer
   - **Day:** Friday
   - **Time:** 4pm - 5pm
4. Click **Save**

**Expected result:** Trigger appears in list

**What this does:** Every Friday at 4pm, report auto-generates

---

### **Step 8: Update Your HTML UI (Optional, 15 minutes)**

Add buttons to your existing HTML interface:

```html
<!-- Add to your HTML file -->
<button onclick="searchDrive()">🔍 Find School Data</button>
<button onclick="saveDraft()">💾 Save as Gmail Draft</button>
<button onclick="generateReport()">📊 Generate Report Now</button>

<script>
function searchDrive() {
  google.script.run
    .withSuccessHandler(showFiles)
    .searchDriveForSchools();
}

function saveDraft() {
  // Call after email generation
  const emailData = getCurrentEmailData();
  google.script.run
    .withSuccessHandler(showSuccess)
    .saveAsGmailDraft(emailData);
}

function generateReport() {
  google.script.run
    .withSuccessHandler(showSuccess)
    .generateWeeklyReport();
}
</script>
```

---

## 🎯 **Quick Test Checklist**

After deployment, test each feature:

- [ ] **Drive Search:** Finds 5+ spreadsheets
- [ ] **Preview:** Shows first 10 rows of selected file
- [ ] **Consolidate:** Adds schools without duplicates
- [ ] **Gmail Draft:** Creates draft in Gmail
- [ ] **Contact Log:** Updates spreadsheet
- [ ] **Weekly Report:** Generates accurate stats
- [ ] **Trigger:** Set up for Friday 4pm

---

## 🚨 **Common Issues & Fixes**

### **Issue 1: Permission Denied**
**Error:** "Authorization required"
**Fix:** Click "Review Permissions" > Allow access to Drive, Gmail, Sheets

### **Issue 2: API Key Not Found**
**Error:** "GEMINI_API_KEY not found"
**Fix:** 
1. Apps Script editor > Project Settings
2. Script Properties > Add property
3. Key: `GEMINI_API_KEY`, Value: [your key]

### **Issue 3: Gmail Draft Not Appearing**
**Error:** Draft created but not visible
**Fix:** 
1. Check Gmail drafts folder
2. Verify email: linnea.moritz@uni.minerva.edu
3. Check execution logs for errors

### **Issue 4: Duplicate Schools**
**Error:** Same school added multiple times
**Fix:** System checks school name + city. Ensure consistent formatting.

---

## 📊 **Success Metrics**

After 1 week, you should see:
- ✅ 50+ schools consolidated
- ✅ 30+ Gmail drafts created
- ✅ 1 weekly report delivered
- ✅ 5+ hours saved

---

## 🎉 **You're Done When:**

1. ✅ Code deployed successfully
2. ✅ All 3 features tested and working
3. ✅ Weekly trigger set up
4. ✅ First consolidation completed
5. ✅ First Gmail draft created
6. ✅ First weekly report generated

**Estimated time: 30-45 minutes for full setup**

---

## 📞 **Need Help?**

If you encounter issues:
1. Check execution logs (View > Logs)
2. Review error messages
3. Test functions individually
4. Check API quotas (Gmail: 500/day)

---

**Ready to start? Open Apps Script and begin with Step 1!** 🚀
