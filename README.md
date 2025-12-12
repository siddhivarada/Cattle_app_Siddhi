# 🐄 Cattle Health Monitoring PWA

A complete, production-ready Progressive Web App (PWA) for real-time cattle health monitoring. Built with Next.js 14, React, and Tailwind CSS.

## 📋 Features

### Core Functionality
- ✅ **Real-time Health Monitoring** - Simulates smart collar data every 3-5 seconds
- ✅ **Multi-Platform Support** - Works on mobile, tablet, and desktop
- ✅ **PWA Capabilities** - Installable on devices, works offline
- ✅ **Smart Notifications** - In-app alerts + browser notifications (even when tab is inactive)
- ✅ **Cattle Management** - Add, view, and delete cattle with detailed profiles
- ✅ **Health Analytics** - Track 6 vital parameters with intelligent alert detection

### Health Parameters Monitored

| Parameter | Normal Range | Alert Triggers |
|-----------|-------------|----------------|
| Body Temperature | 38-39°C | >39°C or <36.5°C |
| Heart Rate | 40-100 bpm | >100 bpm |
| Breathing Rate | 10-30 breaths/min | <10 or >30 |
| Rumen Movement | 2-3 cycles/min | <1.5 cycles/min |
| Heat/Estrus Index | - | >0.9 (breeding opportunity) |
| Vaccination Status | - | Due date reached |

### User Interface
- 🎨 Clean, farmer-friendly design
- 📱 Fully responsive (mobile-first)
- 🌙 Green color scheme for agricultural context
- 🖼️ Unsplash cattle images
- 🔔 Bottom-right notification toast system
- 📊 Real-time health dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Extract all files to your project directory**
```bash
# Your project structure should look like:
your-project/
├── app/
│   ├── dashboard/
│   ├── page.js
│   ├── layout.js
│   └── globals.css
├── components/
├── lib/
├── public/
├── package.json
├── next.config.js
└── tailwind.config.js
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **For production deployment**
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and deploy

### Post-Deployment

Your app will be live at: `https://your-project.vercel.app`

The PWA will be fully functional with:
- Service worker registered
- Installable on mobile devices
- Browser notifications enabled

## 📱 PWA Installation

### On Mobile (iOS/Android)

**Chrome/Edge (Android):**
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home Screen" or "Install App"
4. Confirm installation

**Safari (iOS):**
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Name it and tap "Add"

### On Desktop

**Chrome/Edge:**
1. Open the app
2. Look for the install icon in the address bar
3. Click "Install"

**Note:** The install prompt appears automatically if the PWA criteria are met.

## 🔔 Enabling Notifications

### First-Time Setup
1. When you first open the app, you'll be prompted to allow notifications
2. Click "Allow" in the browser prompt
3. The bell icon in the header will turn green when enabled

### Browser Notification Features
- Notifications appear even when:
  - Tab is in the background
  - Browser is minimized
  - Multiple tabs are open
- Auto-dismiss after 10 seconds
- Click notification to return to app

### In-App Notifications
- Appear in bottom-right corner
- Color-coded by severity:
  - 🔴 Red: Critical (temperature, breathing issues)
  - 🟡 Yellow: Warning (heart rate, vaccination due)
  - 🔵 Blue: Info (heat/estrus detection)
- Auto-dismiss after 10 seconds
- Manual dismiss available

## 🎮 Using the Simulator

### How It Works
The app includes a built-in simulator that mimics real smart collar hardware:

1. **Runs automatically** every 3-5 seconds
2. **Randomly selects** a cow from your herd
3. **Generates realistic vitals** (80% normal, 20% abnormal)
4. **Triggers alerts** when parameters exceed safe ranges
5. **Updates dashboard** in real-time

### Simulator Controls
- **Toggle ON/OFF**: Click "Simulator ON/OFF" button in header
- **Monitor Status**: Green = running, Gray = paused
- When paused, no new vitals are generated

### Testing Alerts
Add multiple cows and wait. The simulator will:
- Generate various health scenarios
- Trigger different types of alerts
- Show notifications (in-app + browser)
- Update health status on cow cards

## 🏗️ Project Structure

```
/app
├── app/
│   ├── page.js                    # Login page
│   ├── dashboard/page.js          # Main dashboard
│   ├── layout.js                  # Root layout + PWA meta
│   └── globals.css                # Global styles
├── components/
│   ├── CowCard.js                 # Cattle card component
│   ├── AddCowForm.js              # Add cattle form
│   ├── AlertNotification.js       # Alert toast component
│   └── HealthMonitor.js           # Health parameter display
├── lib/
│   ├── storage.js                 # localStorage utilities
│   ├── simulator.js               # Vital sign generator + alert detection
│   └── notifications.js           # Browser notification utilities
├── public/
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker
│   ├── icon-192.svg               # App icon (small)
│   └── icon-512.svg               # App icon (large)
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **PWA**: Service Worker + Web App Manifest
- **Notifications**: Web Notifications API
- **Images**: Next.js Image + Unsplash

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` or use Tailwind classes directly:
- Primary: `green-600` (can change to any color)
- Background: `green-50` to `green-100` gradient

### Add More Health Parameters
1. Update `healthRanges` in `/lib/simulator.js`
2. Add generation logic in `generateVitals()`
3. Add detection logic in `detectAlerts()`
4. Update UI in `HealthMonitor.js`

### Change Simulator Timing
In `/app/dashboard/page.js`, modify:
```javascript
const getRandomInterval = () => 3000 + Math.random() * 2000;
// Change to: 5000 + Math.random() * 3000 for 5-8 seconds
```

### Replace Icons
Replace `/public/icon-192.svg` and `/public/icon-512.svg` with PNG files:
- Use 192x192 and 512x512 PNG images
- Update `manifest.json` to reference `.png` instead of `.svg`

## 📊 Data Storage

All data is stored in browser localStorage:
- **Farmer info**: Login name and date
- **Cattle list**: All cow profiles (name, tag ID, DOB, etc.)
- **Alerts**: Last 50 alerts (auto-pruned)
- **Vitals**: Latest vitals per cow (session only)

**Note**: Data persists across sessions but is browser-specific. Clearing browser data will reset the app.

## 🚨 Known Limitations

### Simulator Mode
- **No real IoT hardware** - This is a demonstration app
- Vitals are randomly generated, not from actual sensors
- To connect real hardware, you would need to:
  - Replace simulator with API endpoints
  - Integrate with your IoT platform (e.g., MQTT, WebSocket)
  - Add backend authentication and data persistence

### Browser Compatibility
- **Notifications**: Requires HTTPS in production (works on localhost)
- **PWA Install**: Best support in Chrome, Edge, Safari 16.4+
- **Service Worker**: Requires HTTPS (works on localhost)

### Storage Limits
- localStorage has ~5-10MB limit per origin
- Recommend max 50-100 cattle entries
- For larger herds, migrate to database (MongoDB, PostgreSQL)

## 🔐 Security Considerations

This is a demo app with simplified authentication:
- **No password protection** - Only name-based login
- **No encryption** - Data stored in plain text locally
- **No backend** - All logic runs client-side

**For production use, implement:**
- Real authentication (Firebase, Auth0, NextAuth)
- Backend API with database
- User roles and permissions
- Data encryption
- HTTPS everywhere

## 🐛 Troubleshooting

### PWA Won't Install
- Make sure you're on HTTPS (or localhost)
- Check that `manifest.json` is accessible
- Verify service worker registered (check DevTools > Application)
- Try hard refresh (Ctrl+Shift+R)

### Notifications Not Working
- Check browser permissions (Site Settings)
- HTTPS required in production
- Some browsers block notifications by default
- Check browser console for errors

### Simulator Not Running
- Check browser console for errors
- Ensure cows are added (simulator needs data)
- Verify localStorage isn't full
- Try toggling simulator OFF then ON

### Images Not Loading
- Unsplash URLs require internet connection
- Check `next.config.js` has `images.domains` configured
- Replace with local images if needed

## 📈 Future Enhancements

Potential features to add:
- [ ] Historical health data graphs
- [ ] Export data to CSV/PDF
- [ ] Multi-farm support
- [ ] Vet appointment scheduling
- [ ] Weather integration
- [ ] Breeding cycle tracking
- [ ] Feed management
- [ ] Cost tracking
- [ ] Real IoT hardware integration
- [ ] Mobile app (React Native)

## 📄 License

This is a demo application. Feel free to use, modify, and distribute as needed.

## 🙋 Support

For issues or questions:
1. Check this README
2. Review browser console for errors
3. Verify all dependencies are installed
4. Test in different browser (Chrome recommended)

## 🎉 Credits

- Built with ❤️ for farmers
- Cow images from Unsplash
- Icons from Lucide React
- UI inspiration from modern PWA designs

---

**Made with Next.js 14 | Ready for Vercel Deployment | 100% Open Source**
