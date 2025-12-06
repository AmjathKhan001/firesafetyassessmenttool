# Fire Safety Assessment Tool 🔥

A free, privacy-focused web tool for residential fire safety assessment based on Bureau of Indian Standards (BIS) guidelines.

## 🚀 Live Demo
Visit: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

## 📋 Features
- **4-minute assessment** based on 22 key fire safety questions
- **No registration required** - completely anonymous
- **Instant safety score** with detailed recommendations
- **Print-ready PDF reports**
- **Mobile responsive** design
- **Multi-language support** (English)
- **Integrated safety store** with Amazon Associates
- **Support option** via Buy Me a Coffee

## 🏗️ Deployment Guide

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name it: `fire-safety-tool`
4. Choose "Public"
5. Click "Create repository"

### Step 2: Upload Files
Upload these 6 files to your GitHub repository:
1. `index.html` - Main assessment form
2. `style.css` - Styling
3. `script.js` - Logic and scoring
4. `report.html` - Results page
5. `privacy.html` - Privacy policy
6. `README.md` - This file

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your `fire-safety-tool` repository
5. Click "Deploy"

That's it! Your tool will be live in 2 minutes.

## 🔧 Configuration

### Google AdSense
- AdSense Publisher ID: `pub-6687860250561653`
- Auto ads are already integrated
- Update in `index.html` and `report.html` if needed

### Google Analytics
- Tracking ID: `G-376208036`
- Already configured in all pages
- Events track Amazon clicks and support clicks

### Amazon Associates
- Store link: `https://amzn.to/4p8ceG6`
- Products displayed in tool and report
- Tracking implemented for clicks

### Buy Me a Coffee
- Support link: `https://buymeacoffee.com/s.amjathkhan`
- Integrated in header and footer
- Tracking for support clicks

## 📊 Assessment Logic

### Scoring System
- **22 questions** with weighted importance
- **Maximum score:** 100 points
- **5 safety levels:** Excellent, Good, Moderate, Needs Improvement, High Risk
- **Automatic recommendations** based on responses

### Safety Levels
1. **85-100%:** Excellent Safety ✅
2. **70-84%:** Good Safety 👍
3. **50-69%:** Moderate Safety ⚠️
4. **30-49%:** Needs Improvement 🔔
5. **0-29%:** High Risk 🚨

## 📱 Pages Structure
1. **index.html** - Main assessment form
2. **report.html** - Results and recommendations
3. **privacy.html** - Privacy policy (required for AdSense)

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #d32f2f;      /* Main red color */
    --secondary: #1976d2;    /* Blue accent */
    --accent: #ff9800;       /* Orange accent */
}