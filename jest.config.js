module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|react-native-screens|react-native-safe-area-context|react-native-reanimated)/)',
  ],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|svg)$': 'identity-obj-proxy',
  },
};
