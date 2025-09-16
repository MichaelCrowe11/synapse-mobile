#!/bin/bash

# Synapse Mobile Quick Start Script
# This script helps you quickly get the app running

echo "🚀 Synapse Mobile Quick Start"
echo "=============================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Platform selection
echo ""
echo "Which platform would you like to test?"
echo "1) Android"
echo "2) iOS (Mac only)"
echo "3) Both"
echo "4) Just start Metro bundler"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🤖 Starting Android app..."
        echo "Make sure you have an Android emulator running or device connected!"
        echo ""
        npx react-native run-android
        ;;
    2)
        echo ""
        echo "🍎 Starting iOS app..."
        if [[ "$OSTYPE" != "darwin"* ]]; then
            echo "❌ iOS development is only available on macOS"
            exit 1
        fi

        # Install pods if needed
        if [ ! -d "ios/Pods" ]; then
            echo "📦 Installing CocoaPods dependencies..."
            cd ios && pod install && cd ..
        fi

        npx react-native run-ios
        ;;
    3)
        echo ""
        echo "📱 Starting both platforms..."

        # Start Metro in background
        npx react-native start &
        METRO_PID=$!

        sleep 5

        # Run Android
        npx react-native run-android &

        # Run iOS if on Mac
        if [[ "$OSTYPE" == "darwin"* ]]; then
            if [ ! -d "ios/Pods" ]; then
                cd ios && pod install && cd ..
            fi
            npx react-native run-ios &
        fi

        wait $METRO_PID
        ;;
    4)
        echo ""
        echo "🚇 Starting Metro bundler only..."
        npx react-native start
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✨ Happy testing!"
echo ""
echo "Troubleshooting tips:"
echo "- If the app doesn't start, try: npm start -- --reset-cache"
echo "- For Android issues: cd android && ./gradlew clean"
echo "- For iOS issues: cd ios && pod install"
echo "- Documentation: https://github.com/MichaelCrowe11/synapse-mobile"