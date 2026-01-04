# Deployment Guide - Minerva Ambassador Portal

## Current Status

Your application is currently built and running in a **sandbox environment**. The files are located at:
```
/vercel/sandbox/minerva-ambassador-portal/
```

## Deployment Options

### Option 1: Deploy to Vercel (Recommended) ⭐

Vercel is the best hosting platform for Next.js applications and offers free hosting.

#### Steps to Deploy to Vercel:

1. **Download the Project Files**
   - The entire `minerva-ambassador-portal` folder needs to be on your local machine
   - You can download it as a ZIP or clone it

2. **Install Vercel CLI on Your Local Machine**
   ```bash
   npm install -g vercel
   ```

3. **Navigate to Project Directory**
   ```bash
   cd minerva-ambassador-portal
   ```

4. **Login to Vercel**
   ```bash
   vercel login
   ```

5. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Accept defaults for Next.js project
   - Your app will be live in minutes!

6. **Production Deployment**
   ```bash
   vercel --prod
   ```

**Result**: You'll get a URL like `https://minerva-ambassador-portal.vercel.app`

---

### Option 2: Deploy via Vercel Dashboard (No CLI)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Code to GitHub**
   - Create a new repository on GitHub
   - Push your code:
   ```bash
   cd minerva-ambassador-portal
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Import to Vercel**
   - In Vercel dashboard, click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

**Result**: Automatic deployments on every git push!

---

### Option 3: Run Locally on Your Laptop

#### Steps to Transfer Files to Your Laptop:

**Method A: Download from Sandbox**

If you have access to download files from this sandbox:
1. Download the entire `minerva-ambassador-portal` folder
2. Extract to your desired location
3. Open terminal in that folder
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Access at http://localhost:3000

**Method B: Copy Files Manually**

1. Create a new folder on your laptop: `minerva-ambassador-portal`
2. Copy all files from the sandbox to your local folder
3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

**Method C: Use Git**

If you can access the sandbox via SSH or file transfer:
```bash
# On your laptop
scp -r user@sandbox:/vercel/sandbox/minerva-ambassador-portal ./
cd minerva-ambassador-portal
npm install
npm run dev
```

---

### Option 4: Other Hosting Platforms

#### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod`

#### GitHub Pages (Static Export)
1. Add to `next.config.ts`:
   ```typescript
   output: 'export',
   images: { unoptimized: true }
   ```
2. Build: `npm run build`
3. Deploy the `out` folder to GitHub Pages

#### Self-Hosted (Your Own Server)
1. Build: `npm run build`
2. Copy files to your server
3. Run: `npm start`
4. Use PM2 or similar for process management

---

## Important Notes About Data Storage

### ⚠️ Critical: LocalStorage Limitation

This application uses **browser LocalStorage** for data storage. This means:

- **Data is stored in the browser**, not on a server
- **Each device/browser has its own data**
- **Clearing browser data deletes everything**
- **No automatic sync between devices**

### Recommended Data Management Strategy:

1. **Regular Backups**
   - Export data weekly using the Export page
   - Save JSON files to cloud storage (Google Drive, Dropbox, etc.)

2. **Multi-Device Usage**
   - Export from Device A
   - Import to Device B
   - Keep backups synchronized manually

3. **Production Consideration**
   - For multi-device sync, you'd need to add a backend (Firebase, Supabase, etc.)
   - Current version is perfect for single-user, single-device use

---

## Connecting to Your Vercel Account

### I Cannot Directly Connect to Your Vercel Account

For security reasons, I cannot:
- ❌ Access your Vercel account
- ❌ Deploy directly to your account
- ❌ Connect to your local laptop
- ❌ Transfer files automatically

### What You Need to Do:

**You must manually transfer the files** using one of these methods:

#### Method 1: Copy-Paste (Small Files)
1. Read each file from the sandbox
2. Create the same file structure on your laptop
3. Copy the content

#### Method 2: Download Archive
If the sandbox provides a download option:
1. Create a ZIP of the folder
2. Download to your laptop
3. Extract and use

#### Method 3: Git Repository
1. Initialize git in the sandbox (if possible)
2. Push to GitHub/GitLab
3. Clone on your laptop

---

## Recommended Workflow

### For Immediate Use:

1. **Transfer Files to Your Laptop**
   - Use any method above to get files locally
   
2. **Test Locally**
   ```bash
   cd minerva-ambassador-portal
   npm install
   npm run dev
   ```
   - Verify everything works at http://localhost:3000

3. **Deploy to Vercel**
   ```bash
   vercel
   ```
   - Get a public URL
   - Access from anywhere

### For Long-Term Use:

1. **Set Up Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Link repository to Vercel
   - Enable automatic deployments

3. **Establish Backup Routine**
   - Export data weekly
   - Store in cloud storage
   - Document your workflow

---

## File Transfer Instructions

### What You Need to Transfer:

The entire `minerva-ambassador-portal` folder containing:

```
minerva-ambassador-portal/
├── app/                    # All application pages
├── lib/                    # Utility functions
├── types/                  # TypeScript definitions
├── public/                 # Static assets
├── node_modules/           # (Don't transfer - reinstall with npm install)
├── package.json            # Dependencies
├── package-lock.json       # Lock file
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
├── next.config.ts          # Next.js config
├── README.md               # Documentation
├── USER_GUIDE.md           # User guide
├── PROJECT_SUMMARY.md      # Project summary
└── DEPLOYMENT_GUIDE.md     # This file
```

### Size Estimate:
- Without node_modules: ~2-3 MB
- With node_modules: ~400-500 MB

**Recommendation**: Transfer without `node_modules`, then run `npm install` locally.

---

## Quick Start Commands

### On Your Local Laptop:

```bash
# 1. Navigate to project folder
cd minerva-ambassador-portal

# 2. Install dependencies (first time only)
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Run production server
npm start

# 6. Deploy to Vercel
vercel
```

---

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## Next Steps

1. ✅ **Transfer files to your laptop** (choose method above)
2. ✅ **Test locally** with `npm run dev`
3. ✅ **Deploy to Vercel** for online access
4. ✅ **Set up regular backups** using Export feature
5. ✅ **Start using the portal** for your ambassador work!

---

## Support

If you encounter issues:
1. Check the README.md for setup instructions
2. Review the USER_GUIDE.md for usage help
3. Verify Node.js version (requires Node 18+)
4. Check Vercel documentation: https://vercel.com/docs

---

## Summary

**You cannot directly connect this sandbox to your Vercel or laptop.**

**You must:**
1. Transfer files manually to your laptop
2. Deploy from your laptop to Vercel
3. Use the Export/Import feature for data backup

**Recommended Path:**
```
Sandbox → Your Laptop → GitHub → Vercel
```

This gives you version control, automatic deployments, and a production URL!

---

**Questions?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- This project's README.md for detailed setup

Good luck with your ambassador work! 🎓
