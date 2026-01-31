# 🚀 ATLAS QUICK START GUIDE

## What You Have
✅ Working CRM with AI email generation (Gemini API)
✅ School search and filtering
✅ Contact logging
✅ Analytics dashboard

## What to Add (8 hours)

### 1. Multi-Sheet Discovery (3 hours)
Add to Code.gs:
```javascript
function searchDriveForSchools() {
  const files = DriveApp.searchFiles(
    'title contains "school" and mimeType = "application/vnd.google-apps.spreadsheet"'
  );
  const results = [];
  while (files.hasNext()) {
    const file = files.next();
    results.push({id: file.getId(), name: file.getName()});
  }
  return results;
}
```

### 2. Gmail Drafts (2 hours)
```javascript
function saveAsGmailDraft(email, subject, body) {
  GmailApp.createDraft(email, subject, body);
  return {success: true};
}
```

### 3. Weekly Reports (3 hours)
```javascript
function generateWeeklyReport() {
  const stats = getWeeklyStats();
  const report = formatReport(stats);
  GmailApp.createDraft('linnea.moritz@uni.minerva.edu', 'Weekly Report', report);
}
```

Set trigger: Edit > Triggers > Add > generateWeeklyReport > Friday 4pm

## Next Steps
1. Open Apps Script editor
2. Add 3 functions above to Code.gs
3. Test each function
4. Set up weekly trigger
5. Done!

See ATLAS_IMPLEMENTATION_PLAN.md for full details.
