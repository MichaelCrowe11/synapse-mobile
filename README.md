# Synapse Mobile

A mobile app for the Synapse programming language, bringing quantum computing and scientific reasoning to mobile devices.

## Features

- **Code Editor**: Syntax-highlighted editor for Synapse language
- **Local Execution**: Run simple Synapse scripts locally
- **Cloud Execution**: Execute quantum simulations and heavy computations in the cloud
- **Interactive Examples**: Learn with guided tutorials and examples
- **Quantum Visualization**: Visualize quantum circuits and results
- **Offline Support**: Work offline with automatic sync when connected

## Tech Stack

- **React Native 0.81.4**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation library
- **CodeMirror Mobile**: Code editor component
- **React Native Reanimated**: Smooth animations
- **AsyncStorage**: Local data persistence

## Project Structure

```
synapse-mobile/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CodeEditor/
│   │   ├── QuantumVisualizer/
│   │   └── ResultDisplay/
│   ├── screens/          # App screens
│   │   ├── EditorScreen/
│   │   ├── ExamplesScreen/
│   │   └── SettingsScreen/
│   ├── services/         # Core services
│   │   ├── SynapseParser/
│   │   ├── CloudExecutor/
│   │   └── LocalInterpreter/
│   ├── navigation/       # Navigation configuration
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── __tests__/           # Test files
└── android/            # Android-specific code
└── ios/               # iOS-specific code
```

## Getting Started

### Prerequisites

- Node.js 18+
- React Native development environment
- Android Studio (for Android)
- Xcode (for iOS/macOS)

### Installation

```bash
# Clone the repository
git clone https://github.com/MichaelCrowe11/synapse-mobile.git
cd synapse-mobile

# Install dependencies
npm install

# iOS only: Install pods
cd ios && pod install && cd ..
```

### Running the App

```bash
# Android
npm run android

# iOS
npm run ios

# Start Metro bundler
npm start
```

## Development

### Code Style

- ESLint and Prettier for code formatting
- TypeScript strict mode enabled
- Component-based architecture

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Building for Production

```bash
# Android APK
cd android && ./gradlew assembleRelease

# iOS (requires Apple Developer account)
cd ios && xcodebuild -scheme SynapseMobile archive
```

## Core Features Implementation

### 1. Code Editor

The code editor supports:
- Synapse syntax highlighting
- Auto-completion for keywords
- Error highlighting
- Code folding
- Theme support (light/dark)

### 2. Local Interpreter

Basic Synapse features that run locally:
- Variable declarations
- Basic arithmetic
- Simple functions
- String operations

### 3. Cloud Execution

Advanced features that require cloud:
- Quantum circuit simulation
- Parallel execution blocks
- Complex scientific computations
- Machine learning operations

### 4. Example Gallery

Pre-built examples:
- Hello World
- Quantum Entanglement
- Monte Carlo Simulation
- Uncertainty Propagation
- Drug Discovery Pipeline

## API Integration

The app connects to the Synapse Cloud API for:
- Code execution
- Quantum simulation
- Result storage
- User authentication

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Synapse Language creators
- React Native community
- Quantum computing research community

## Contact

- GitHub: [@MichaelCrowe11](https://github.com/MichaelCrowe11)
- Project: [Synapse-Lang](https://github.com/MichaelCrowe11/synapse-lang)