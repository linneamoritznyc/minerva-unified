# MINERVA AUTOPILOT
## Product Requirements Document

**An AI Executive Function Assistant for University Recruitment**

**Product Owner:** Linnea Moritz
**Role:** Alumni Ambassador, Western Europe - Minerva University
**Date:** February 1, 2026
**Version:** 1.0

---

## EXECUTIVE SUMMARY

### The Problem
Managing university recruitment across 30+ European countries requires complex timeline coordination that creates executive function paralysis:

- Fair in Helsinki on March 15 means contacting nearby schools in January (2-3 months before)
- Must wait 2-3 weeks for school responses before booking flights
- Need to book flights 2 months ahead to avoid expensive prices
- But can't book until schools confirm visits
- By the time they respond, flights are expensive
- **Result: Complete paralysis and nothing gets done**

This timing paradox, combined with ADHD executive dysfunction, makes the job nearly impossible without external support.

### The Solution
Minerva Autopilot is an AI executive assistant that:
- **Works backwards from events** - identifies what needs to happen and when
- **Manages dependencies automatically** - tracks responses, suggests booking windows
- **Makes decisions proactively** - tells the user what to do, not asks
- **Prepares everything for execution** - user only approves and executes
- **Celebrates wins** - positive reinforcement, never shame

### Key Principle: Supervised Execution
The AI prepares 100% of outputs. The human approves and executes.
- Call scripts are generated → User makes the call
- Flight options are researched → User books the flight
- Follow-up emails are drafted → User reviews and sends (Phase 2)
- **The AI never executes actions autonomously**

---

## USER PROFILE

### Demographics
- **Name:** Linnea Moritz
- **Age:** 28
- **Gender:** Woman
- **Location:** Sweden
- **Education:** Minerva University (Class of 2021)
- **Occupation:** Alumni Ambassador + Artist/Painter

### Psychological Profile (DSM-5 Descriptive)

#### ADHD (Predominantly Inattentive/Combined Presentation)
- Chronic difficulty initiating tasks without intrinsic interest or external deadline
- **Time blindness:** Cannot plan for future without imminent consequences
- Hyperfocus on personally meaningful projects (art, high-impact ideas)
- Emotional dysregulation: rapid mood shifts, frustration when thwarted
- Work completion dependent on: deadlines, social accountability, desire to impress

#### High Demand Avoidance (PDA-like traits)
- Extreme resistance to externally imposed demands lacking personal meaning
- Emotional distress from pressure or structured expectations
- Complete disengagement when motivation is external vs. narrative-based
- Preference for autonomy and self-directed projects

#### Rejection Sensitive Dysphoria (RSD)
- Unbearable emotional pain from perceived rejection or criticism
- Fear of failure causes complete task avoidance
- "You're behind" messaging triggers shame spirals

#### Strengths
- Exceptional artistic ability, visual-spatial intelligence
- Capacity for visionary thinking, long-term strategic planning (when narrative clarity exists)
- High IQ, rapid abstract reasoning
- High adaptability and unconventional problem-solving when intrinsically motivated
- Responds strongly to social accountability and deadlines

### Functional Implications for System Design

**What Works:**
- Social accountability (real person waiting for response)
- Imminent deadlines (fair in 3 days)
- Narrative meaning (helping misfit kids find Minerva)
- Automation that removes decision-making
- External structure that doesn't feel like demands
- Celebration and positive reinforcement
- Phone calls over emails (immediate response, less ghosting anxiety)

**What Fails:**
- Open-ended tasks ("reach out to schools")
- Self-initiated planning
- Database maintenance
- Tasks framed as obligations
- Multi-step processes requiring sustained attention
- Anything requiring her to "remember" or "follow up"
- Shame-based motivation ("you're behind")
- Waiting for email responses (RSD trigger)

---

## JOB DESCRIPTION

### Role Overview
**Title:** Alumni Ambassador, Western Europe
**Employer:** Minerva University
**Manager:** Alena Savitskaya
**Compensation:** $27/hour, invoice monthly

### Territory
30+ countries including: Andorra, Austria, Belgium, Denmark, Finland, France, Germany, Gibraltar, Iceland, Ireland, Italy, Liechtenstein, Luxembourg, Malta, Monaco, Netherlands, Norway, Portugal, San Marino, Spain, Sweden, Switzerland, United Kingdom, Vatican City, and others.

**Note:** Previously covered only Nordic region. Now covers all of Western Europe + Nordic with no team support.

### Core Responsibilities

1. **School Outreach**
   - Identify and contact counselors at competitive high schools
   - Email campaigns to high schools across 23 countries
   - Phone calls to counselors (preferred over email per therapist recommendation)
   - Schedule school visits and workshops

2. **Fair Attendance**
   - Find and evaluate university fairs across Europe
   - Register for fairs (€400-€6,000 depending on fair)
   - Present fair recommendations to manager
   - Attend fairs, collect student leads
   - Follow up with students met at fairs

3. **Travel Coordination**
   - Book flights and hotels for fairs
   - Coordinate school visits near fair locations
   - Maximize trip value (visit multiple schools per trip)
   - Track receipts and bookings

4. **Student Engagement**
   - Host coffee chats (via Calendly: https://calendly.com/linnea-moritz-uni)
   - Support applicants through admissions process
   - Call Slate applicants before deadlines
   - Run family discussions with potential applicants

5. **Database Management**
   - Maintain school contact database
   - Clean and consolidate 10+ scattered spreadsheets
   - Log all interactions and contact history

6. **Administration**
   - Track hours and tasks completed
   - Send monthly invoices to Minerva
   - Log receipts and bookings

7. **Strategy Development**
   - Define outreach strategy for Europe
   - Identify high-value targets (rich students, IB schools, UWC, international schools)
   - Find high-achievers (Olympiad winners, science fair participants, debate champions)

### Target Student Profile
High school students (17-19 years old) who:
- Have high intellectual capacity and genuine love for learning
- Possess depth (research project, startup, coding initiative) AND breadth (debate, arts, leadership)
- Are interested in Minerva's five majors: Arts & Humanities, Business, Computational Sciences, Natural Sciences, Social Sciences
- Ideally from IB, American, or British curriculum schools
- International school students, UWC students (high priority)

### Current Pain Points
- Scope expanded from Nordic to all Western Europe with no additional support
- 10+ scattered databases need consolidation
- Email outreach leads to ghosting and RSD triggers
- Complex timeline coordination causes paralysis
- No clear metrics or goals from manager
- Working alone on a 5-person job

---

## THE CORE PROBLEM: TIMELINE COORDINATION PARADOX

### Example Scenario
**Event:** Helsinki Education Fair - March 15

**What needs to happen:**
1. **January 1 (2.5 months before):** Contact schools within 50km of Helsinki
2. **January 7-21:** Wait for responses (2-3 weeks)
3. **January 15 (2 months before):** Should book flights to get good prices
4. **Problem:** Can't book flights until schools confirm visits
5. **January 21:** Schools start responding
6. **January 21:** Flights are now expensive
7. **Result:** Either expensive flight for just the fair, or paralysis and nothing happens

### Why This Breaks the ADHD Brain
- Requires holding multiple timelines in working memory
- Requires making decisions with incomplete information
- Requires executing things in the right sequence
- No immediate feedback (waiting weeks for responses)
- Fear of wasting money on flights if no school visits confirm
- **Result: Complete paralysis**

### The Solution: AI That Works Backwards
The system should:
1. **Detect event:** Helsinki Fair March 15
2. **Calculate timeline:** Contact schools by Jan 1, book flights by Jan 15
3. **Generate outreach:** Create call scripts for 12 schools within 50km
4. **Track responses:** Monitor which schools confirm
5. **Suggest action:** "3 schools confirmed. Book flights now. Here are options under €200."
6. **Manage the whole sequence proactively**

---

## PRODUCT REQUIREMENTS

### Core Principle: Be a Manager, Not a Task List

The system should actively manage the user, not just display information. It should:
- **Notice things before the user does** ("Fair in Helsinki in 2 months")
- **Decide what needs doing and when**
- **Tell the user the plan**
- **Prompt the user to execute**
- **Celebrate completions**

### Two Communication Interfaces

#### 1. Call List Interface (Primary - Phase 1)
Per therapist recommendation: phone calls reduce anxiety, provide immediate response, eliminate ghosting.

**Features:**
- **Smart Prioritization by Travel:**
  - "You'll be in Paris Feb 10-12, here are 8 schools within 50km to call this week"
  - Schools sorted by proximity to upcoming events

- **Data Displayed:**
  - School name
  - Counselor name
  - Phone number
  - Best time to call (their timezone)
  - Curriculum type (IB/American/British)

- **CRM-Informed Call Scripts:**
  Each school gets a personalized script based on history from CRM:
  - Previous contact history ("Last emailed Sept 2024, no response")
  - Previous meetings ("Met at London Fair 2023")
  - Notes ("They send 2-3 IB students to US universities annually")
  - Their curriculum type
  - Upcoming trip context

- **Example Generated Script:**
  ```
  "Hi [Counselor Name], this is Linnea from Minerva University.
  We actually met briefly at the London University Fair in 2023 -
  I'm reaching out because I'll be in Paris on February 10-12 for
  the CIS Fair and wanted to see if I could visit your school while
  I'm in the area. Last year I reached out via email but know you're
  probably swamped, so thought I'd try calling directly. Would you
  have 15 minutes for me to meet with your IB students interested
  in US universities?"
  ```

- **Script Components:**
  - Reference any previous contact (if exists in CRM)
  - Mention specific upcoming travel/fair
  - Note their curriculum type
  - Talking points (not rigid word-for-word)
  - Follow-up line: "Can I send you some information via email?"

**Technical Requirement:**
Call interface must query CRM spreadsheet for: previous emails, fair meetings, school visits, notes, last contact date - then inject this context into the generated script.

#### 2. Email Interface (Phase 2 - Later)
- Shows email drafts for outreach
- Gmail API integration for draft creation
- Standard workflow: generate → review → send

### Travel Planning Assistant

**Features:**
- Detects upcoming fairs/events
- Researches flight options (presents choices, doesn't book)
- Researches hotel options (budget: €80/night)
- Suggests optimal booking windows
- Creates itineraries combining fair + school visits

**Example Output:**
```
PARIS TRIP - Feb 10-12

FLIGHT OPTIONS (Stockholm → Paris):
[A] SAS - Feb 9, 6:00 AM / Return Feb 12, 8:00 PM
    Price: €110 ✅ Cheapest

[B] Norwegian - Feb 9, 10:00 AM / Return Feb 12, 6:00 PM
    Price: €132 ✅ Better times

HOTEL OPTIONS (Budget: €80/night):
[A] Hotel Arc La Rambla - €75/night, 10 min walk to venue
[B] Ibis Paris - €68/night, 15 min walk

RECOMMENDATION: Flight B + Hotel A = €278 total

SCHOOLS CONFIRMED FOR VISITS:
- International School of Paris (Feb 10, 2pm)
- Lycée International (Feb 11, 10am)

SCHOOLS AWAITING RESPONSE:
- École Jeannine Manuel (called Jan 15)
- British School of Paris (called Jan 16)
```

### Event Timeline Manager

**Features:**
- Shows all upcoming events (fairs, trips, deadlines)
- For each event, shows:
  - What needs to happen
  - When it needs to happen
  - What's been done
  - What's waiting for response
- Works backwards from event date to show current priorities

**Example View:**
```
HELSINKI FAIR - March 15

TIMELINE:
✅ Jan 1: Identified 12 schools within 50km
✅ Jan 5: Called 8 schools (scripts generated)
⏳ Jan 5-20: Waiting for responses (4 confirmed, 4 pending)
→ Jan 20: Book flights (4 schools confirmed!)
○ Feb 1: Confirm hotel
○ Mar 14: Travel day
○ Mar 15: Fair day
○ Mar 16: School visits

READY TO BOOK:
"4 schools confirmed visits. Flight prices going up in 3 days.
Here are your options..." [Shows flight options]
```

### Dashboard / Home View

**Shows:**
- Today's priority action
- Upcoming events (next 30 days)
- Recent wins (tasks completed)
- Progress indicators (encouraging, not shaming)

**Tone Examples:**
- ✅ "You're making great progress on the Paris trip!"
- ✅ "3 schools confirmed for Helsinki - amazing work!"
- ❌ "You have 47 overdue tasks"
- ❌ "You're behind on your goals"

### Celebration & Positive Reinforcement

**When a task is completed:**
- Confetti animation
- Encouraging message: "Amazing work!" / "You're crushing it!" / "That's another one done!"
- Shows what was accomplished
- Streak counter: "3 tasks done today! 🔥"

**Progress Indicators:**
- Show momentum, not deficit
- "You've contacted 12 schools this week" (not "38 schools remaining")
- Visual progress bars that feel rewarding

---

## TECHNICAL ARCHITECTURE

### Technology Stack
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **AI Engine:** Anthropic API (Claude)
- **Database:** Google Sheets (existing CRM data)
- **Calendar:** Google Calendar API (for events)
- **Hosting:** Vercel (free tier)
- **State Management:** Zustand

### Phase 1 Integrations
- Anthropic API (AI decision-making, script generation)
- Google Sheets API (read CRM data, school database)
- Google Calendar API (events, fairs)

### Phase 2 Integrations (Later)
- Gmail API (email drafts)

### Data Sources (Existing)
- **Master CRM Spreadsheet:** `1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY`
- **Sheet Name:** `LM_WE_Schools_Master`
- **Contains:** School names, cities, countries, counselor contacts, relationship status, contact history, notes

### System Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Dashboard  │  │  Call List  │  │  Event Timeline │ │
│  │  (Home)     │  │  Interface  │  │    Manager      │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                 AI MANAGER LAYER                         │
│  - Analyzes events and calculates timelines             │
│  - Generates prioritized call lists                     │
│  - Creates CRM-informed call scripts                    │
│  - Suggests travel options                              │
│  - Decides what user should do next                     │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  INTEGRATION LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Anthropic   │  │   Google     │  │   Google     │  │
│  │     API      │  │   Sheets     │  │  Calendar    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### AI Manager Prompt Strategy
The AI receives context about:
- All upcoming events (from calendar)
- All schools in database
- Contact history for each school
- User's current location
- What's been completed today

And returns:
- Prioritized actions
- Generated call scripts
- Timeline recommendations
- Encouraging messaging

---

## DESIGN REQUIREMENTS

### Visual Design Principles (ADHD-Friendly)

1. **Clean, Minimal Interface**
   - No visual clutter
   - Whitespace for breathing room
   - Clear visual hierarchy

2. **One Primary Action Visible**
   - Don't overwhelm with options
   - Show the recommended next step prominently
   - Other options accessible but not competing for attention

3. **Calm Color Palette**
   - No harsh reds or urgent colors
   - Soft, professional tones
   - Green for success, not red for failure

4. **Consistent Navigation**
   - Same elements in same places
   - Predictable layout (helps with memory issues)

### Tone & Voice

**Always:**
- Warm and supportive
- Celebrates wins big and small
- Frames progress positively
- Uses "we" language ("Let's tackle the Paris trip!")

**Never:**
- Shame-based ("You're behind")
- Pressure language ("Deadline approaching!")
- Criticism of past behavior
- Overwhelming with tasks

### Celebration System

**Confetti Triggers:**
- Task marked complete
- School confirms visit
- Flight booked
- Weekly milestone hit

**Encouragement Messages (Random Selection):**
- "Amazing work! ✨"
- "You're crushing it!"
- "Another one done!"
- "Look at you go!"
- "That's the way!"

---

## SUCCESS METRICS

### User Experience Metrics
- User spends ≤15 minutes/day on portal
- User reports reduced work anxiety
- User completes more outreach than before
- User feels supported, not judged

### Functional Metrics
- 10+ schools contacted per week (calls or emails)
- Travel booked on time (2 months before events)
- All upcoming events have preparation timelines
- Zero missed fairs due to late booking

### Emotional Metrics
- User opens portal daily (it's helpful, not dreaded)
- User feels accomplished after using it
- User recommends system to others with ADHD

---

## IMPLEMENTATION PHASES

### Phase 1: Core System (Current)
- Dashboard with today's priority
- Call List interface with CRM-informed scripts
- Event timeline manager
- Google Sheets integration
- Celebratory UX
- **No email integration yet**

### Phase 2: Email Integration (Later)
- Gmail API integration
- Email draft generation
- Send-ready drafts in Gmail

### Phase 3: Advanced Features (Future)
- Travel booking assistance
- Invoice generation
- Hours tracking
- Student engagement tracking

---

## APPENDIX

### Existing Resources
- **Ambassador Portal:** `/ambassador-portal/` - Next.js UI (LocalStorage only)
- **Atlas CRM:** `/crm-docs/` - Google Apps Script with Gemini integration
- **Master Database:** Google Sheets ID `1IPm1Fl8YwD3NP_GYWGJa_m_qBTGsdnbthGockemp8NY`

### Key Contacts
- **User:** Linnea Moritz (linnea.moritz@uni.minerva.edu)
- **Manager:** Alena Savitskaya
- **Calendly:** https://calendly.com/linnea-moritz-uni

### ADHD Management Strategies (Reference)
- **Time Boxing:** Pomodoro (25 min work, 5 min break)
- **External Scaffolding:** System makes decisions, user executes
- **Cognitive Offloading:** Don't rely on memory, externalize everything
- **Positive Reinforcement:** Celebrate wins, never shame
- **Single Focus:** One primary task visible at a time

---

**Document Status:** Ready for Implementation
**Last Updated:** February 1, 2026
