# ⚖️ GDPR COMPLIANCE GUIDE FOR ATLAS CRM

## ⚠️ **CRITICAL: Read Before Sending First Email**

This guide ensures Atlas CRM complies with EU data protection laws (GDPR).

---

## 📋 **Legal Requirements Checklist**

### **Before Launch (Week 1):**

- [ ] **Legal Review** - Schedule 1-hour consultation with Minerva legal counsel
  - Cost: ~$500 (one-time)
  - Purpose: Confirm lawful basis for processing
  - Deliverable: Signed approval to proceed

- [ ] **Data Protection Impact Assessment (DPIA)**
  - Document what data you collect (work emails, names, schools)
  - Document why (B2B outreach for university recruitment)
  - Document lawful basis: "Legitimate business interest"
  - Template: See below

- [ ] **Privacy Policy Update**
  - Ensure Minerva website has privacy policy
  - Must cover: Data collection, retention, deletion rights
  - Link in email footer

- [ ] **Email Footer Implementation**
  - Already added to `Code_Enhanced_v2.gs`
  - Includes opt-out and privacy policy link
  - GDPR-compliant

---

## 📄 **Data Protection Impact Assessment (DPIA) Template**

```
DPIA for Atlas CRM - Minerva University Outreach
Date: [Today's Date]
Prepared by: Linnea Moritz

1. DATA PROCESSING DESCRIPTION
   What: School counselor work emails, names, school affiliations
   Why: B2B outreach for university recruitment
   How: Google Sheets storage, AI email generation, Gmail drafts
   
2. LAWFUL BASIS
   Article 6(1)(f) GDPR: Legitimate business interest
   - Interest: University recruitment and student enrollment
   - Necessity: Direct outreach to counselors is standard practice
   - Balance: B2B contact, no sensitive data, opt-out available
   
3. DATA MINIMIZATION
   Collect ONLY:
   ✅ Work email addresses
   ✅ Professional names and titles
   ✅ School affiliations
   
   Do NOT collect:
   ❌ Personal email addresses
   ❌ Home addresses
   ❌ Phone numbers (unless provided by school)
   ❌ Student personal data
   ❌ Financial information
   
4. RETENTION POLICY
   - Active contacts: Indefinite (ongoing relationship)
   - Inactive contacts: 2 years after last contact
   - Automatic archival: Quarterly cleanup (see cleanupOldContacts())
   
5. DATA SUBJECT RIGHTS
   - Right to deletion: deleteContact() function
   - Right to export: exportContactData() function
   - Right to opt-out: Email footer with unsubscribe
   
6. SECURITY MEASURES
   - Data stored in Google Workspace (SOC 2, ISO 27001)
   - Access limited to linnea.moritz@uni.minerva.edu
   - No data sharing with third parties
   - Encrypted in transit and at rest (Google's infrastructure)
   
7. RISK ASSESSMENT
   Low Risk because:
   - B2B contact only (not consumer data)
   - No sensitive personal data
   - Standard recruitment practice
   - Opt-out available
   - 2-year retention limit
   
8. APPROVAL
   Reviewed by: [Minerva Legal Counsel Name]
   Date: [Review Date]
   Approved: [ ] Yes  [ ] No
   Notes: ___________________________
```

---

## 🔒 **Data Retention Policy**

### **Automatic Cleanup (Already Implemented)**

The system automatically archives contacts with no activity in 2+ years:

**Function:** `cleanupOldContacts()`  
**Trigger:** Quarterly (every 3 months)  
**Action:** Moves inactive contacts to "Archived_Contacts" sheet

**To Set Up Trigger:**
1. Apps Script editor > Triggers
2. Add trigger:
   - Function: `cleanupOldContacts`
   - Event: Time-driven
   - Type: Week timer
   - Interval: Every 12 weeks (quarterly)
3. Save

---

## 📧 **GDPR-Compliant Email Footer**

Already implemented in `Code_Enhanced_v2.gs`:

```
---
You received this email because you are a school counselor at [School Name].
To opt out of future emails, reply with "unsubscribe".
Privacy Policy: https://www.minerva.edu/privacy
```

**What it does:**
- ✅ Explains why they received the email
- ✅ Provides opt-out mechanism
- ✅ Links to privacy policy
- ✅ Meets GDPR transparency requirements

---

## 🗑️ **Data Subject Rights Implementation**

### **1. Right to Deletion**

**Function:** `deleteContact(rowNumber)`

**How to use:**
1. Find contact in spreadsheet
2. Note row number
3. Run: `deleteContact(rowNumber)`
4. Contact archived to "Deleted_Contacts" sheet
5. Removed from active database

**When to use:**
- Counselor requests deletion
- School requests removal
- Compliance requirement

---

### **2. Right to Data Export**

**Function:** `exportContactData(rowNumber)`

**How to use:**
1. Find contact in spreadsheet
2. Note row number
3. Run: `exportContactData(rowNumber)`
4. Returns JSON with all stored data
5. Send to requester

**When to use:**
- Counselor requests their data
- GDPR data portability request

---

### **3. Right to Opt-Out**

**Process:**
1. Counselor replies "unsubscribe" to email
2. Manually run: `deleteContact(rowNumber)`
3. Send confirmation: "You've been removed from our list"

**Future enhancement:** Auto-detect unsubscribe replies

---

## 📊 **What Data is Stored**

### **Allowed (B2B Professional Data):**
✅ School counselor work email  
✅ Counselor professional name  
✅ School name and location  
✅ Contact date and status  
✅ School system (IB, A-Levels, etc.)  

### **Prohibited (Personal/Sensitive Data):**
❌ Personal email addresses  
❌ Home addresses  
❌ Personal phone numbers  
❌ Student names or data  
❌ Financial information  
❌ Health information  
❌ Political/religious views  

---

## 🌍 **Geographic Scope**

**GDPR applies to:**
- All EU countries (27 member states)
- EEA countries (Iceland, Liechtenstein, Norway)
- UK (UK GDPR)
- Switzerland (Swiss DPA)

**Your coverage:**
- Western Europe ✅
- Nordic region ✅
- All require GDPR compliance

---

## ⚠️ **Common GDPR Violations to Avoid**

### **❌ DON'T:**
1. **Buy email lists** - Must have legitimate basis for each contact
2. **Share data with third parties** - No selling or sharing counselor data
3. **Keep data indefinitely** - Must delete after 2 years of inactivity
4. **Ignore deletion requests** - Must respond within 30 days
5. **Send emails without opt-out** - Every email must have unsubscribe

### **✅ DO:**
1. **Document your lawful basis** - Complete DPIA before launch
2. **Provide opt-out** - Email footer with unsubscribe
3. **Delete on request** - Use deleteContact() function
4. **Archive old data** - Run cleanupOldContacts() quarterly
5. **Get legal review** - $500 investment prevents €20M fines

---

## 💰 **Cost of Non-Compliance**

**GDPR Fines:**
- Up to €20 million OR
- 4% of annual global revenue
- Whichever is higher

**For Minerva University:**
- Potential fine: €20 million
- Reputational damage: Priceless
- Legal review cost: $500

**ROI of compliance: ∞**

---

## 📅 **Implementation Timeline**

### **Week 1 (Before Sending Emails):**
- [ ] Complete DPIA template
- [ ] Schedule legal review with Minerva counsel
- [ ] Get written approval
- [ ] Set up quarterly cleanup trigger
- [ ] Test email footer in generated emails

### **Week 2 (After Legal Approval):**
- [ ] Begin outreach with GDPR-compliant emails
- [ ] Monitor for opt-out requests
- [ ] Document all deletion requests

### **Quarterly (Every 3 Months):**
- [ ] Run cleanupOldContacts() (automatic if trigger set)
- [ ] Review archived contacts
- [ ] Update DPIA if process changes

---

## 🆘 **Handling GDPR Requests**

### **Deletion Request:**
```
1. Receive request: "Please delete my data"
2. Verify identity: Confirm email matches records
3. Run: deleteContact(rowNumber)
4. Respond within 30 days: "Your data has been deleted"
5. Document request in log
```

### **Data Export Request:**
```
1. Receive request: "What data do you have on me?"
2. Verify identity: Confirm email matches records
3. Run: exportContactData(rowNumber)
4. Send JSON data within 30 days
5. Document request in log
```

### **Opt-Out Request:**
```
1. Receive: "Unsubscribe" reply
2. Run: deleteContact(rowNumber)
3. Respond: "You've been removed"
4. Never contact again
```

---

## 📞 **Legal Review Preparation**

**What to bring to legal counsel:**
1. This GDPR Compliance Guide
2. Completed DPIA template
3. Sample generated email (with footer)
4. Data retention policy (2 years)
5. List of data collected (work emails only)

**Questions to ask:**
1. Is "legitimate business interest" the correct lawful basis?
2. Do we need explicit consent instead?
3. Is 2-year retention appropriate?
4. Any additional requirements for Minerva?
5. Should we register with data protection authority?

**Expected outcome:**
- Written approval to proceed OR
- Minor adjustments to policy
- Total time: 1 hour
- Cost: ~$500

---

## ✅ **Compliance Checklist**

Before sending first email:
- [ ] DPIA completed
- [ ] Legal review scheduled
- [ ] Legal approval received
- [ ] Email footer tested
- [ ] Quarterly cleanup trigger set
- [ ] Deletion process documented
- [ ] Export process documented
- [ ] Team trained on GDPR rights

After launch:
- [ ] Monitor opt-out requests
- [ ] Respond to deletion requests within 30 days
- [ ] Run quarterly cleanup
- [ ] Update DPIA annually
- [ ] Review compliance quarterly

---

## 📚 **Additional Resources**

- **GDPR Official Text:** https://gdpr-info.eu/
- **ICO Guidance (UK):** https://ico.org.uk/for-organisations/guide-to-data-protection/
- **Legitimate Interest Assessment:** https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/legitimate-interests/
- **B2B vs B2C GDPR:** https://gdpr.eu/b2b-gdpr-compliance/

---

## 🎯 **Bottom Line**

**Atlas CRM is GDPR-ready IF you:**
1. ✅ Get legal review before launch ($500, 1 hour)
2. ✅ Use the email footer (already implemented)
3. ✅ Set up quarterly cleanup (already implemented)
4. ✅ Respond to deletion requests (already implemented)

**Total compliance cost: $500 one-time + 1 hour/quarter maintenance**

**Risk of non-compliance: €20M fine + reputational damage**

**Recommendation: Get legal review THIS WEEK before sending first email.**

---

**Last Updated:** January 2, 2026  
**Next Review:** After legal counsel consultation  
**Status:** Ready for legal review
