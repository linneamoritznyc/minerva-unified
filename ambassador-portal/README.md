# Minerva Ambassador Portal

A comprehensive web-based management system for Minerva University Alumni Ambassadors to manage outreach activities across Western Europe and the Nordic region.

## Overview

This portal helps you efficiently manage:
- **Schools Database**: Track high schools and educational institutions
- **Counselor Contacts**: Maintain relationships with school counselors and career advisors
- **Student Leads**: Manage prospective student information and engagement
- **Visits & Events**: Schedule and track school visits, workshops, and information sessions
- **Travel Planning**: Plan and organize trips across 30+ countries
- **Email Templates**: Access professional outreach templates
- **Workshop Materials**: Comprehensive presentation materials about Minerva's five majors
- **Research Tools**: Resources for finding talented students and top schools
- **Analytics**: Track performance metrics and engagement

## Features

### 1. Dashboard
- Quick overview of all activities
- Upcoming visits and follow-ups
- Key statistics and metrics
- Quick access to all modules

### 2. Schools Database
- Add and manage school information
- Filter by country, priority, and status
- Track contact history and follow-ups
- Export to CSV for reporting

### 3. Counselors Database
- Comprehensive contact management
- Relationship strength tracking
- Preferred contact method
- LinkedIn integration
- Export capabilities

### 4. Students Database
- Track prospective student leads
- Engagement level monitoring
- Interested majors and concentrations
- Source tracking (fairs, competitions, referrals)
- Achievement and olympiad records

### 5. Email Templates
- Pre-written professional templates for:
  - Counselor introduction and follow-up
  - Student reconnection after events
  - Workshop invitations
  - Family discussion invitations
  - Olympiad winner outreach
  - Application support
- Customizable placeholders
- Copy-to-clipboard functionality

### 6. Workshop Materials
- Complete 60-90 minute workshop outline
- Detailed information about all five majors:
  - Arts & Humanities
  - Business
  - Computational Sciences
  - Natural Sciences
  - Social Sciences
- Concentration descriptions
- Key skills and career pathways
- Interactive activity suggestions

### 7. Research Tools
- Ideal student profile guidelines
- Top schools by country
- Academic competition resources:
  - International Mathematical Olympiad (IMO)
  - International Physics Olympiad (IPhO)
  - International Chemistry Olympiad (IChO)
  - International Olympiad in Informatics (IOI)
  - International Biology Olympiad (IBO)
  - International Science and Engineering Fair (ISEF)
  - World Schools Debating Championships
- Online platforms for finding talented students

### 8. Visits & Events
- Schedule school visits and events
- Track visit status (Planned, Confirmed, Completed, Cancelled)
- Record attendees and leads generated
- Follow-up tracking
- Calendar view of upcoming visits

### 9. Travel Planning
- Plan multi-city trips
- Track transportation and accommodation
- Budget management
- Expense tracking
- Trip status monitoring

### 10. Analytics
- Visual dashboards with charts
- Schools and students by country
- Student engagement levels
- Visit types distribution
- Performance metrics

### 11. Data Export/Import
- Full data backup as JSON
- Individual CSV exports for each database
- Import data from backups
- Cross-device data transfer

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Storage**: Browser LocalStorage
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### First Time Setup

1. Open the application in your browser (http://localhost:3000)
2. Start by adding schools in your region
3. Add counselor contacts
4. Create email templates for outreach
5. Schedule your first visits
6. Track student leads as you meet them

## Data Management

### Storage
All data is stored locally in your browser's LocalStorage. This means:
- Data persists between sessions
- No server or database required
- Data is private and secure on your device
- Clearing browser data will delete all information

### Backup Strategy
1. **Regular Exports**: Export your data weekly using the Export page
2. **Before Major Changes**: Always export before importing new data
3. **Multiple Backups**: Keep backups in multiple locations (cloud storage, external drive)
4. **CSV Exports**: Export individual databases as CSV for spreadsheet analysis

### Data Transfer
To transfer data between devices:
1. Export all data as JSON from the old device
2. Import the JSON file on the new device
3. Verify all data transferred correctly

## Best Practices

### Outreach
- Personalize all email templates with specific details
- Log every interaction in the database
- Set follow-up dates for all contacts
- Track relationship strength over time
- Use Calendly link in all communications

### School Visits
- Schedule visits 4-6 weeks in advance
- Confirm visits 1 week before
- Bring workshop materials and business cards
- Collect student contact information
- Send follow-up emails within 48 hours

### Student Engagement
- Add students to database immediately after meeting
- Note specific interests and achievements
- Track engagement level changes
- Provide application support throughout the process
- Connect highly interested students with current Minerva students

### Travel Planning
- Book transportation and accommodation early
- Build buffer time between visits
- Keep all booking confirmations organized
- Track expenses for reporting
- Plan efficient routes to minimize travel time

## Countries Covered

Western Europe & Nordic Region (30+ countries):
- Andorra, Austria, Belgium, Denmark, Finland, France, Germany
- Gibraltar, Greenland, Guernsey, Iceland, Ireland, Italy, Jersey
- Liechtenstein, Luxembourg, Malta, Monaco, Netherlands, Norway
- Portugal, San Marino, Spain, Sweden, Switzerland, United Kingdom
- Vatican City

## Support & Contact

**Linnea Moritz**
- Alumni Ambassador, Western Europe & Nordic Region
- Minerva University, Class of 2021
- Calendly: https://calendly.com/linnea-moritz-uni

## Key Milestones

1. **Research & Outreach**
   - Identify top schools in each country
   - Build counselor contact database
   - Reach out to previous fair contacts

2. **School Visits**
   - Schedule and conduct school visits
   - Host workshops and information sessions
   - Build relationships with school officials

3. **Student Engagement**
   - Track prospective student leads
   - Provide application support
   - Host coffee chats and family discussions

4. **Competition Outreach**
   - Find olympiad winners and competition participants
   - Reach out to talented students
   - Connect with competition organizers

5. **Reporting & Analysis**
   - Track applications and admissions
   - Analyze outreach effectiveness
   - Report on regional performance

## Tips for Success

1. **Consistency**: Log all activities immediately
2. **Follow-up**: Set reminders and follow through
3. **Personalization**: Customize all communications
4. **Organization**: Keep all data up-to-date
5. **Backup**: Export data regularly
6. **Networking**: Build strong relationships with counselors
7. **Visibility**: Maintain active presence in the region
8. **Quality**: Focus on finding the right-fit students
9. **Support**: Provide excellent service to applicants
10. **Metrics**: Track and analyze your performance

## Future Enhancements

Potential features for future versions:
- Cloud synchronization
- Email integration
- Calendar integration
- Mobile app
- Automated reminders
- Advanced analytics
- Collaboration features
- CRM integration

## License

This application is proprietary software developed for Minerva University Alumni Ambassadors.

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Developed for**: Minerva University Alumni Ambassador Program
