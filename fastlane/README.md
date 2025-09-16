# Fastlane Setup for Synapse Mobile

This directory contains Fastlane configuration for automated building and deployment of Synapse Mobile.

## 🚀 Quick Setup

### 1. Install Fastlane

```bash
# Install Fastlane
gem install fastlane

# Or using Homebrew (Mac)
brew install fastlane
```

### 2. Configure Environment

```bash
# Copy environment template
cp fastlane/.env.example fastlane/.env

# Edit with your actual values
nano fastlane/.env
```

### 3. Initialize Fastlane (if needed)

```bash
# From project root
cd fastlane
fastlane init
```

## 📱 Available Lanes

### Android

```bash
# Build debug APK
fastlane android build_debug

# Build release APK
fastlane android build_release

# Deploy to internal testing
fastlane android deploy_internal

# Deploy to beta
fastlane android deploy_beta

# Deploy to production
fastlane android deploy_production

# Run tests
fastlane android test
```

### iOS

```bash
# Build app
fastlane ios build

# Deploy to TestFlight
fastlane ios beta

# Deploy to App Store
fastlane ios release

# Run tests
fastlane ios test
```

### Cross-platform

```bash
# Bump version (patch/minor/major)
fastlane bump_version type:patch
fastlane bump_version type:minor
fastlane bump_version type:major

# Generate screenshots
fastlane screenshots
```

## 🔧 Configuration Files

- **Fastfile**: Main configuration with all lanes
- **Appfile**: App-specific configuration (bundle IDs, team IDs)
- **Deliverfile**: App Store metadata and submission settings
- **.env.example**: Template for environment variables

## 🔐 Security Setup

### Android Signing

1. Generate a signing key:
```bash
keytool -genkey -v -keystore synapse-mobile-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias synapse-mobile
```

2. Set environment variables in `.env`:
```
KEYSTORE_FILE=/path/to/synapse-mobile-release.jks
KEYSTORE_PASSWORD=your-password
KEY_ALIAS=synapse-mobile
KEY_PASSWORD=your-key-password
```

### iOS Signing

1. Set up App Store Connect account
2. Create app identifier in Apple Developer portal
3. Generate app-specific password
4. Configure in `.env`:
```
APPLE_ID=your-apple-id@example.com
FASTLANE_PASSWORD=your-app-specific-password
TEAM_ID=your-team-id
```

### Google Play Setup

1. Create service account in Google Cloud Console
2. Download JSON key file
3. Set path in `.env`:
```
GOOGLE_PLAY_JSON_KEY_PATH=/path/to/google-play-api-key.json
```

## 🔄 CI/CD Integration

The Fastlane configuration works with GitHub Actions. See `.github/workflows/` for:

- **build.yml**: Automated builds on PR
- **release.yml**: Automated releases on tag push
- **deploy.yml**: Deploy to app stores

## 📊 Deployment Workflow

### Development
1. Code changes → PR → Automated build & test
2. Merge to main → Build debug versions

### Beta Release
1. `fastlane bump_version type:minor`
2. `fastlane android deploy_beta`
3. `fastlane ios beta`

### Production Release
1. `fastlane bump_version type:major`
2. `fastlane android deploy_production`
3. `fastlane ios release`

## 🐛 Troubleshooting

### Common Issues

**Fastlane not found:**
```bash
gem install fastlane
export PATH="$HOME/.fastlane/bin:$PATH"
```

**Android build fails:**
```bash
cd android
./gradlew clean
cd ..
fastlane android build_debug
```

**iOS build fails:**
```bash
cd ios
pod install
xcodebuild clean
cd ..
fastlane ios build
```

**Signing issues:**
- Verify all environment variables are set
- Check certificate validity
- Ensure provisioning profiles are updated

## 📚 Resources

- [Fastlane Documentation](https://docs.fastlane.tools/)
- [React Native Deployment](https://reactnative.dev/docs/signed-apk-android)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [Google Play Console](https://play.google.com/console/)

---

**Note**: Always test deployments on internal/beta tracks before production!