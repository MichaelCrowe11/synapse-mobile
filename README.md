# Synapse Mobile

A React Native app with a code editor, an example gallery, and a settings tab for the Synapse language, where the on-device interpreter handles variable assignments and every quantum or parallel result is canned.

## Status

`early stage`. The app installs, its 10 unit tests pass, and it builds for the iOS simulator (verified 2026-09-10). What does not work yet: the "cloud" executor is a mock that returns fixed numbers after a 1.5 second sleep (`src/services/CloudExecutor/index.ts`), and the on-device interpreter only parses assignments; `run`, `parallel`, and `quantum circuit` return placeholder values (`src/services/LocalInterpreter/index.ts`). `tsc --noEmit` reports 2 errors and `eslint` reports 8 errors, so the CI workflow's test job fails. Last commit 2025-09-15 (5 commits, all that day). The Synapse language itself lives at [MichaelCrowe11/synapse-lang](https://github.com/MichaelCrowe11/synapse-lang).

## Install and first run

Requires Node 20 or newer, Xcode and CocoaPods for iOS, a JDK and Android SDK for Android.

```bash
git clone https://github.com/MichaelCrowe11/synapse-mobile
cd synapse-mobile
npm ci
npm test
```

Output on 2026-09-10 (macOS arm64, Node 26.5.0):

```
PASS __tests__/LocalInterpreter.test.ts
PASS __tests__/App.test.tsx

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        3.015 s
```

iOS simulator build (Xcode 26.2, CocoaPods from Homebrew):

```bash
cd ios
pod install
xcodebuild -workspace SynapseMobile.xcworkspace -scheme SynapseMobile -sdk iphonesimulator -configuration Debug -derivedDataPath build build CODE_SIGNING_REQUIRED=NO
```

```
Pod installation complete! There are 78 dependencies from the Podfile and 77 total pods installed.
** BUILD SUCCEEDED **
```

This is the same command the CI workflow runs. `pod install` took 63 seconds and warned that React Native is moving away from CocoaPods. It edits `ios/SynapseMobile.xcodeproj/project.pbxproj` and `ios/SynapseMobile/Info.plist`; the build needs those edits (when I reverted them and rebuilt, the "Bundle React Native code and images" phase failed with `/scripts/xcode/with-environment.sh: No such file or directory`). I reverted them again before committing. The build output was about 4.9 GB.

The checks that fail:

```bash
npx tsc --noEmit
```

```
src/App.tsx(5,18): error TS7016: Could not find a declaration file for module 'react-native-vector-icons/MaterialIcons'.
src/services/CloudExecutor/index.ts(27,47): error TS2345: Argument of type '(value: unknown) => void' is not assignable to parameter of type '() => void'.
```

```bash
npm run lint
```

```
9 problems (8 errors, 1 warning)
```

All eight errors are `@typescript-eslint/no-unused-vars`.

Steps I did not run today: launching the app in a simulator or on a device (`npm run ios`), the Android build (no JDK on this machine), Metro (`npm start`), and any fastlane lane.

## What runs today

- Three tabs: Editor, Examples, Settings (`src/App.tsx`, `src/screens/`). The Settings switches change local state only; nothing is persisted.
- Editor screen with a plain `TextInput` code box, a Local/Cloud toggle, and a result panel (`src/screens/EditorScreen/index.tsx`, `src/components/CodeEditor/index.tsx`, `src/components/ResultDisplay/index.tsx`). The syntax highlighter in `CodeEditor` is defined but not used.
- `LocalInterpreter.execute(code)`: strips `#` comments, stores `name = 42`, `name = "text"`, and `uncertain name = 298.15 ± 0.5` in a Map, and returns the assignment as text. Tests: `__tests__/LocalInterpreter.test.ts`.
- Example gallery: a hard-coded list of Synapse snippets (`src/screens/ExamplesScreen/index.tsx`).
- Jest with the `react-native` preset; `App.test.tsx` renders the whole app once.
- Android project (`android/`, compileSdk 36, minSdk 24) and iOS project (`ios/`). Only the iOS side was built today.
- CI (`.github/workflows/ci.yml`): lint, jest, tsc on Node 18, then Android and iOS builds. The last run on GitHub (2025-11-18, a Dependabot pull request) failed.

## Roadmap (not built)

Recorded only as comments in the code: a real Synapse execution API (`CloudExecutor` points at `https://api.synapse-lang.com/v1`, which does not resolve), authentication, WebSocket jobs, caching, retries. None of it exists in this repo.

## Limits

- Every quantum, parallel, and uncertainty result shown in the app is a placeholder. `CloudExecutor` returns Bell-state counts drawn from `Math.random()`, three random "branch" results, and a fixed Monte Carlo summary. `LocalInterpreter.handleRun` returns `{'00': 512, '11': 512}` for any circuit name. The messages in the code say so ("Mock quantum results").
- The app does not run Synapse programs. It does not talk to `synapse-lang`. It has no parser beyond `split('=')`.
- The old README listed CodeMirror, a `QuantumVisualizer` component, a `SynapseParser` service, offline sync, and `navigation/`, `styles/`, `utils/` directories. None of these exist in the repo.
- `fastlane/` is configured from environment variables only; no credentials are committed. `android/app/debug.keystore` is the React Native default debug key.
- `app.json` says license MIT, but there is no LICENSE file.
- Dependabot has flagged `js-yaml`, `lodash`, and `qs` transitive versions since 2025-11; the lockfile has not been updated.

## License and contact

No license file. `app.json` says MIT, but no license text is present in the repo.

Contact: michael@crowelogic.com
