#!/bin/bash

# GitHub Push Commands for Minerva Ambassador Portal
# Run these commands to push your code to GitHub

echo "=================================================="
echo "  Minerva Ambassador Portal - GitHub Push"
echo "=================================================="
echo ""
echo "STEP 1: Create repository on GitHub"
echo "  Go to: https://github.com/new"
echo "  Repository name: minerva-ambassador-portal"
echo "  DO NOT initialize with README"
echo ""
echo "STEP 2: Run these commands"
echo "=================================================="
echo ""

# Navigate to project directory
cd /vercel/sandbox/minerva-ambassador-portal

# Add remote
echo "Adding GitHub remote..."
git remote add origin https://github.com/linneamoritznyc/minerva-ambassador-portal.git

# Show status
echo ""
echo "Git status:"
git status

echo ""
echo "=================================================="
echo "Ready to push!"
echo "=================================================="
echo ""
echo "Run this command to push:"
echo "  git push -u origin main"
echo ""
echo "You'll need:"
echo "  Username: linneamoritznyc"
echo "  Password: [Your Personal Access Token]"
echo ""
echo "Get token at: https://github.com/settings/tokens"
echo "=================================================="
