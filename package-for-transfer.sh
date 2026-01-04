#!/bin/bash

# Package Minerva Ambassador Portal for Transfer
# This script creates a clean package without node_modules for easy transfer

echo "📦 Packaging Minerva Ambassador Portal for transfer..."

# Create a temporary directory
TEMP_DIR="minerva-ambassador-portal-package"
rm -rf $TEMP_DIR
mkdir -p $TEMP_DIR

# Copy all files except node_modules and build artifacts
echo "📋 Copying files..."
rsync -av --progress \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.blackbox' \
  --exclude 'package-for-transfer.sh' \
  --exclude '*.log' \
  ./ $TEMP_DIR/

# Create a ZIP file
echo "🗜️  Creating ZIP archive..."
cd ..
zip -r minerva-ambassador-portal.zip minerva-ambassador-portal-package/

# Clean up temp directory
rm -rf minerva-ambassador-portal-package

echo "✅ Package created: minerva-ambassador-portal.zip"
echo "📦 Size: $(du -h minerva-ambassador-portal.zip | cut -f1)"
echo ""
echo "Next steps:"
echo "1. Download minerva-ambassador-portal.zip to your laptop"
echo "2. Extract the ZIP file"
echo "3. Run: cd minerva-ambassador-portal && npm install"
echo "4. Run: npm run dev"
echo "5. Deploy to Vercel: vercel"
