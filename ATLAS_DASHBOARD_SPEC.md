# 🚀 ATLAS DASHBOARD - Complete Specification

**Based on:** All CRM Coding documentation + User requirements  
**Date:** January 2, 2026  
**Version:** 1.0 - Comprehensive Design

---

## 🎯 **Core Vision**

Atlas is a **standalone Next.js dashboard** for your laptop that:
1. **Reads Windsurf CRM spreadsheet** via Google Sheets API
2. **Integrates with AI assistant** (you/Windsurf) for real-time guidance
3. **Auto-logs emails** from Gmail with 2-sentence AI summaries
4. **Gamifies tasks** with medals, task spinner, and focus modes
5. **Helps populate data** (Irish schools, missing contacts)
6. **Shows "Next Steps"** - AI-powered recommendations for what to do next

---

## 📊 **Data Source: Windsurf CRM Spreadsheet**

**Sheet ID:** `1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY`

**Schema (from SQL instructions doc):**

| Column | Type | Purpose |
|--------|------|---------|
| SchoolID | UNIQUE ID | `[Country Code]-[Sequential Number]` |
| School Name | TEXT | Official school name |
| Country | TEXT | Full country name |
| Country Code | TEXT | ISO 3166-1 alpha-3 |
| Region | TEXT | Western Europe, Northern Europe, etc. |
| City | TEXT | City location |
| Address | TEXT | Street address |
| Strategic Priority Tier | ENUM | A+, A, B, C, D, E, N/A |
| Website | URL | School website |
| School Phone Number | TEXT | Main phone |
| General Email | TEXT | Admin email |
| IB/Int'l Status | ENUM | IB World School, International, etc. |
| Curriculum | TEXT | IB DP, A-Levels, etc. |
| Number of High School Students | NUMBER | Student count |
| Socioeconomic Context | TEXT | Student profile notes |
| Tuition Fees (Annual) | NUMBER | Annual € tuition |
| Special Focus | TEXT | Key traits |
| Primary Contact Name | TEXT | Main counselor |
| Primary Contact Title | TEXT | Counselor title |
| Primary Contact Email | TEXT | Counselor email |
| Relationship Status | ENUM | Contacted, Responded, Partnership, Dormant |
| Last Contact Type | ENUM | Email, Call, Event, N/A |
| Date of last contact | DATE | Most recent contact |
| Replied Status | ENUM | Yes, Not yet |
| Activity Notes | TEXT | Short note on last activity |
| Email Strength (1-5) | NUMBER | Email personalization rating |
| Merge status | ENUM | Yes (from old data), No (new school) |
| Next Step | TEXT | Next action + date |

---

## 🎨 **UI/UX Design (Based on CRM Google Site Functionality doc)**

### **Core Features:**

#### **1. Laser Focus Mode** (ADHD-friendly)
- Toggle button that blurs everything except current school card
- Minimizes visual distraction
- Forces attention on one task at a time

#### **2. Task Spinner** ("Do One Thing!" button)
- Large, central spinning button
- Randomly selects a task from categories:
  - **CRM Outreach:** "Reach out to schools in [random country]"
  - **CRM Cleanup:** "Check 5 DORMANT schools for new contact info"
  - **CRM Quality:** "Upgrade Email Strength rating for 3 B-Priority schools"
  - **Admin:** "Upload receipts" / "Research flight tickets"
- Completing task awards special "Gold Star" medal

#### **3. Micro-Medals & Praise System**
- Instant visual celebration when completing actions:
  - Update Next Step → ✅ "Win!" animation
  - Send email → 🎉 Confetti burst
  - Change status → ⭐ Gold star
- **"Good Job" Counter** in sidebar:
  - "Schools Updated Today: 7"
  - "Emails Sent This Week: 14"
  - Numbers flash/chime when incremented

#### **4. "Next Step" Default View**
- Default dashboard shows "Today's Top 5" or "Next Action List"
- Filtered by Next Step column
- Reduces overwhelm from seeing all 500+ schools

#### **5. Kanban-Style Relationship Pipeline**
- Visual columns: Cold → Contacted → Responded → Partnering
- Drag-and-drop cards between stages
- Shows count in each stage
- Moving card = instant "Win!" celebration

#### **6. Color-Coded Priority System**
- **A+ Priority:** Bold red/orange border
- **B Priority:** Yellow
- **C Priority:** Soft blue/gray
- Instant visual clarity on high-stakes schools

#### **7. Time Sensitivity Highlights**
- **Next Step tomorrow:** Yellow banner
- **Next Step overdue:** Soft red flash
- **All caught up:** "🎉 All Caught Up! You're 100% On Track!" banner

#### **8. Undo Button** (Anxiety relief)
- After any update: "Record updated. Undo" (5 seconds)
- Emotional safety net

---

## 🤖 **AI Assistant Integration**

### **"Next Steps to Take Atlas to the Next Level"**

Persistent panel showing AI-powered recommendations:

**Categories:**
1. **Immediate Actions** (Today)
   - "Follow up with 3 schools who haven't replied in 2 weeks"
   - "Update Next Step dates for 5 overdue tasks"

2. **Strategic Opportunities** (This Week)
   - "Ireland only has 1 school - research 10+ Irish IB schools"
   - "Germany response rate is 25% vs France 14% - focus on Germany"

3. **Data Quality** (Ongoing)
   - "12 schools missing Primary Contact Email - research and add"
   - "8 schools have Email Strength 1/5 - improve personalization"

4. **Upcoming Events** (From invitations doc)
   - "College Day Scandinavia March 9-12 - register by Nov 25"
   - "IBS Provence University Fair Feb 4 - RSVP"

5. **System Improvements**
   - "Set up Gmail auto-logging to track sent emails"
   - "Create email templates for common outreach scenarios"

**AI Chat Interface:**
- Always visible sidebar
- Ask questions: "What should I do next?"
- Get context: "Tell me about Irish schools"
- Request help: "Draft email for [School Name]"

---

## 📧 **Gmail Auto-Logging**

### **How It Works:**

1. **Gmail API Watch** (polls every 5 minutes)
2. **Detect sent emails** from linnea.moritz@uni.minerva.edu
3. **Match recipient** to school in Windsurf CRM
4. **Gemini summarizes** email body in 2 sentences
5. **Update spreadsheet:**
   - Relationship Status → "Contacted"
   - Last Contact Type → "Email"
   - Date of last contact → Today
   - Activity Notes → 2-sentence summary

**Example:**
```
Email sent to: lisa.knapp@katedralskolen.dk
Summary: "Introduced Minerva University's global rotation program. 
Offered to schedule a virtual info session for students."
```

---

## 🔍 **Data Population Tools**

### **Irish Schools Research Assistant**

**Problem:** Only 1 Irish school in database

**Solution:** Built-in research tool

**Features:**
1. **Search IB World Schools directory** (Ireland filter)
2. **Google search:** "international schools Ireland IB"
3. **Extract data:**
   - School name
   - City
   - Website
   - Contact email (from website)
4. **Pre-fill form** with extracted data
5. **One-click add** to Windsurf CRM

**Target:** Add 10+ Irish schools this weekend

**Applies to all 30+ countries:**
- Andorra, Austria, Belgium, Denmark, Finland, France, Germany, etc.
- Identify gaps, research, populate

---

## 🗺️ **Interactive Map View** (From MAP specs doc)

### **European Map with Country Context**

**Features:**
1. **Click country** → Zoom in, show context
2. **Top Summary:** 1-2 lines about education system
3. **Expanded Context:**
   - Student profile
   - Gap year likelihood
   - Mandatory military service
   - Education structure
   - IB program prevalence
   - EducationUSA presence
   - Outreach recommendations

**Example (Finland):**
```json
{
  "overview": "Finland's education system is world-class. 
               Strong English proficiency.",
  "student_profile": "Self-driven, academically strong, 
                      attracted to interdisciplinary programs.",
  "gap_year_likelihood": "Common",
  "mandatory_military": "Yes (males, 6-12 months)",
  "ib_programs": "8%",
  "outreach_actions": [
    "Collaborate with IB schools",
    "Partner with Fulbright Center Helsinki"
  ]
}
```

**All 30+ countries** have this context (AI-generated via Gemini)

---

## 📱 **Dashboard Layout**

### **Main Screen:**

```
┌─────────────────────────────────────────────────────────┐
│  ATLAS - Minerva Outreach Command Center                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ 🎯 Do One    │  │ 🔍 Laser     │  │ 💬 AI Chat   │  │
│  │   Thing!     │  │   Focus      │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│  📊 Today's Top 5 Actions:                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟡 Follow up: Aalborg Katedralskole (Denmark)  │   │
│  │    Next Step: Oct 27, 2025 (OVERDUE)           │   │
│  │    [Update] [Email] [Mark Done]                │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟢 Research: Irish schools (Only 1 in DB)      │   │
│  │    [Start Research Tool]                        │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  🏆 Your Progress Today:                                │
│  Schools Updated: 7  |  Emails Sent: 3  |  Medals: 12  │
├─────────────────────────────────────────────────────────┤
│  🗺️ Map View  |  📋 List View  |  📊 Analytics         │
└─────────────────────────────────────────────────────────┘
```

### **Sidebar (Always Visible):**

```
┌──────────────────────┐
│ 💬 AI Assistant      │
├──────────────────────┤
│ Next Steps:          │
│                      │
│ 1. Follow up with    │
│    3 overdue schools │
│                      │
│ 2. Research Irish    │
│    schools (gap!)    │
│                      │
│ 3. Register for      │
│    College Day       │
│    Scandinavia       │
│                      │
│ [Ask AI anything...] │
└──────────────────────┘
```

---

## 🛠️ **Technical Stack**

### **Frontend:**
- **Framework:** Next.js 14 (App Router)
- **UI:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **Map:** Leaflet or Google Maps API
- **Animations:** Framer Motion

### **Backend:**
- **API Routes:** Next.js API routes
- **Google Sheets API:** Read/write Windsurf CRM
- **Gmail API:** Watch sent folder, read emails
- **Gemini API:** Email summarization, AI chat

### **Data Flow:**
```
Windsurf CRM (Google Sheets)
    ↓ (Google Sheets API)
Next.js Backend
    ↓
React Frontend (Dashboard)
    ↓
User Actions
    ↓
Next.js Backend
    ↓ (Write back)
Windsurf CRM (Updated)
```

### **Gmail Auto-Logging:**
```
Gmail (Sent Folder)
    ↓ (Gmail API Watch)
Next.js Backend (Polling every 5 min)
    ↓
Gemini API (Summarize email)
    ↓
Match recipient to school
    ↓
Update Windsurf CRM
```

---

## 🚀 **Implementation Phases**

### **Phase 1: Core Dashboard (Weekend)**
- Set up Next.js project
- Google Sheets API integration
- Display schools in list view
- Basic filtering (country, priority)
- Read-only mode

### **Phase 2: Gamification (Week 1)**
- Task Spinner
- Micro-Medals system
- Laser Focus Mode
- "Good Job" Counter
- Kanban board view

### **Phase 3: AI Integration (Week 1-2)**
- AI Chat sidebar
- "Next Steps" recommendations
- Email draft generation
- Context about countries

### **Phase 4: Gmail Auto-Logging (Week 2)**
- Gmail API setup
- Email detection
- Gemini summarization
- Auto-update spreadsheet

### **Phase 5: Data Tools (Week 2-3)**
- Irish schools research tool
- IB directory scraper
- Contact finder
- Bulk add interface

### **Phase 6: Map View (Week 3)**
- Interactive European map
- Country context panels
- AI-generated insights

---

## 📋 **Environment Variables**

```env
# Google APIs
GOOGLE_SHEETS_API_KEY=your_key
GOOGLE_SHEETS_SHEET_ID=1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY
GMAIL_API_KEY=your_key
GMAIL_USER_EMAIL=linnea.moritz@uni.minerva.edu

# AI
GEMINI_API_KEY=your_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎯 **Success Metrics**

### **Week 1:**
- Dashboard displays all Windsurf CRM data
- Task Spinner working
- 10+ Irish schools added
- AI chat responds to queries

### **Month 1:**
- 50+ emails auto-logged
- 200+ schools with complete data
- Daily active use (30 min/day)
- "All Caught Up!" banner shown regularly

---

## 💡 **Key Differentiators**

**vs. Google Apps Script CRM:**
- ✅ Better UI/UX (modern, responsive)
- ✅ AI assistant integration
- ✅ Gamification (medals, spinner)
- ✅ Gmail auto-logging
- ✅ Data research tools

**vs. Generic CRM:**
- ✅ Built for ADHD/PDA (focus mode, chunking)
- ✅ Praise-driven (medals, celebrations)
- ✅ Anxiety-reducing (undo, "all caught up")
- ✅ Context-aware (country insights)
- ✅ AI-powered recommendations

---

## 🎨 **Design Principles**

1. **Reduce Cognitive Load** - Show only what's needed now
2. **Instant Feedback** - Every action gets immediate response
3. **Celebrate Progress** - Medals, animations, praise
4. **Safety Nets** - Undo buttons, confirmations
5. **Context-Aware** - AI knows what you need next
6. **Gamify Everything** - Make admin work feel like progress

---

## 🔐 **Security & Privacy**

- **Google OAuth** for Sheets/Gmail access
- **API keys** stored in environment variables
- **No data stored locally** (reads from Sheets)
- **GDPR compliant** (same as existing CRM)

---

## 📦 **Deliverables**

1. **Atlas Dashboard** (Next.js app)
2. **Google Sheets integration** (read/write)
3. **Gmail auto-logging** (with summaries)
4. **AI assistant** (chat + recommendations)
5. **Research tools** (Irish schools, etc.)
6. **Map view** (country context)
7. **Gamification** (medals, spinner, focus mode)

---

**Ready to build! This is the complete spec based on all your CRM docs.** 🚀
