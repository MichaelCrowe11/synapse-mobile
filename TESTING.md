# Synapse Mobile - Testing Guide

## 🚀 Quick Start Testing (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Android Studio (for Android) or Xcode (for iOS/Mac)
- Git

### Step 1: Clone and Install

```bash
# If not already cloned
git clone https://github.com/MichaelCrowe11/synapse-mobile.git
cd synapse-mobile

# Install dependencies
npm install
```

### Step 2: Choose Your Platform

#### 🤖 Android Testing

1. **Start Android Emulator:**
   - Open Android Studio
   - Click "AVD Manager"
   - Create/Start a virtual device (Pixel 5, API 33 recommended)

2. **Run the app:**
```bash
npm run android
```

#### 🍎 iOS Testing (Mac only)

1. **Install iOS dependencies:**
```bash
cd ios && pod install && cd ..
```

2. **Run the app:**
```bash
npm run ios
```

#### 🌐 Web Testing (Quickest - 2 minutes)

Add web support:
```bash
npm install react-native-web react-dom
npm start
# Then press 'w' for web
```

## 📱 What to Test

### 1. **Editor Screen** (Main screen)
- [ ] Type sample code in editor
- [ ] Switch between Local/Cloud modes
- [ ] Press "Run" button
- [ ] Verify results appear at bottom

**Test Code Samples:**

```synapse
# Simple variable
x = 42
y = 13
result = x + y
```

```synapse
# Uncertainty
uncertain temp = 298.15 ± 0.5
```

```synapse
# Quantum circuit (Cloud mode)
quantum circuit bell:
    qubits: 2
    H(0)
    CNOT(0, 1)
run bell { shots: 1000 }
```

### 2. **Examples Screen**
- [ ] Browse example cards
- [ ] Tap on an example
- [ ] View code
- [ ] Tap "Load in Editor" (future feature)

### 3. **Settings Screen**
- [ ] Toggle Dark Mode switch
- [ ] Toggle Auto-save
- [ ] Check About section

## 🧪 Testing Features by Mode

### Local Mode Testing

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Variables | `x = 42` | Shows "x = 42" |
| Strings | `name = "Test"` | Shows name = "Test" |
| Uncertainty | `uncertain t = 100 ± 5` | Shows "t = 100 ± 5" |
| Comments | `# comment` | Ignored |

### Cloud Mode Testing (Mock)

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Quantum Circuit | Run bell state | Shows measurement counts |
| Parallel | `parallel { ... }` | Shows branch results |
| Complex Math | Any code | Shows simulated results |

## 🐛 Common Issues & Solutions

### Issue: App doesn't start
**Solution:**
```bash
# Clear cache
npx react-native start --reset-cache

# Clean build (Android)
cd android && ./gradlew clean && cd ..

# Clean build (iOS)
cd ios && xcodebuild clean && cd ..
```

### Issue: Dependencies error
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: Metro bundler issues
**Solution:**
```bash
# Kill existing Metro process
killall -9 node

# Restart
npm start -- --reset-cache
```

### Issue: Android build fails
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## 📊 Performance Testing

### Check these metrics:
1. **App Launch Time**: Should be < 3 seconds
2. **Code Execution**: Local < 100ms, Cloud mock ~1.5s
3. **Screen Navigation**: Instant (< 100ms)
4. **Memory Usage**: < 200MB

### Performance Test Commands:
```bash
# Android performance
adb shell dumpsys meminfo com.synapsemobile

# iOS performance (in Xcode)
Product -> Profile -> Instruments
```

## ✅ Testing Checklist

### Basic Functionality
- [ ] App launches without crash
- [ ] All three tabs are accessible
- [ ] Editor accepts text input
- [ ] Run button executes code
- [ ] Results display correctly

### UI/UX
- [ ] Dark theme works properly
- [ ] Syntax highlighting visible
- [ ] Settings switches work
- [ ] Scrolling is smooth
- [ ] Text is readable

### Edge Cases
- [ ] Empty code execution
- [ ] Very long code (1000+ lines)
- [ ] Invalid syntax handling
- [ ] Network offline behavior
- [ ] Rapid button presses

## 🔧 Debug Mode

Enable debug menu:
- **Android**: Shake device or Cmd+M (Mac) / Ctrl+M (Windows)
- **iOS**: Shake device or Cmd+D

Debug options:
- Reload (refresh app)
- Debug JS Remotely (Chrome DevTools)
- Enable Hot Reloading
- Show Inspector

## 📝 Test Results Template

```markdown
## Test Session - [Date]

**Device:** [Device name/emulator]
**OS:** [Android/iOS version]
**App Version:** 1.0.0

### Editor Screen
- [ ] Code input: ✅/❌
- [ ] Execution: ✅/❌
- [ ] Results display: ✅/❌

### Examples Screen
- [ ] List display: ✅/❌
- [ ] Detail view: ✅/❌

### Settings Screen
- [ ] Switches work: ✅/❌
- [ ] Values save: ✅/❌

### Issues Found:
1. [Issue description]
2. [Issue description]

### Performance:
- Launch time: [X]s
- Memory usage: [X]MB
```

## 🚢 Production Testing

Before release:
1. Test on real devices (not just emulators)
2. Test on different screen sizes
3. Test on older OS versions (Android 6+, iOS 12+)
4. Test with poor network conditions
5. Test accessibility features

## 📞 Support

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/MichaelCrowe11/synapse-mobile/issues)
2. Create a new issue with:
   - Device/OS info
   - Steps to reproduce
   - Error messages/screenshots

---

**Happy Testing! 🎉** The app should be fully functional within 5-10 minutes of setup.