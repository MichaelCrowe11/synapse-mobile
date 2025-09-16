import React from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

interface CodeEditorProps {
  value: string;
  onChange: (text: string) => void;
  language?: string;
  theme?: 'light' | 'dark';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'synapse',
  theme = 'dark',
}) => {
  // Simple syntax highlighting for demo
  const getHighlightedCode = () => {
    const keywords = [
      'uncertain', 'quantum', 'circuit', 'parallel', 'branch',
      'hypothesis', 'assume', 'predict', 'measure', 'run',
    ];

    const lines = value.split('\n');
    return lines.map((line, index) => {
      let highlighted = line;

      // Highlight keywords
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlighted = highlighted.replace(regex, `§${keyword}§`);
      });

      return (
        <Text key={index} style={styles.line}>
          {highlighted.split('§').map((part, i) => {
            const isKeyword = keywords.includes(part);
            return (
              <Text
                key={i}
                style={[
                  styles.code,
                  isKeyword && styles.keyword,
                  line.startsWith('#') && styles.comment,
                ]}>
                {part}
              </Text>
            );
          })}
        </Text>
      );
    });
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkTheme]}>
      <ScrollView horizontal>
        <View style={styles.lineNumbers}>
          {value.split('\n').map((_, index) => (
            <Text key={index} style={styles.lineNumber}>
              {index + 1}
            </Text>
          ))}
        </View>
        <ScrollView style={styles.codeContainer}>
          <TextInput
            value={value}
            onChangeText={onChange}
            multiline
            style={[styles.input, theme === 'dark' && styles.darkInput]}
            placeholderTextColor={theme === 'dark' ? '#666' : '#999'}
            placeholder="Enter your Synapse code here..."
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  darkTheme: {
    backgroundColor: '#1e1e1e',
  },
  lineNumbers: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#2d2d2d',
    borderRightWidth: 1,
    borderRightColor: '#3d3d3d',
  },
  lineNumber: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  codeContainer: {
    flex: 1,
    padding: 12,
  },
  input: {
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
    color: '#333',
  },
  darkInput: {
    color: '#f0f0f0',
  },
  line: {
    flexDirection: 'row',
    lineHeight: 20,
  },
  code: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#f0f0f0',
  },
  keyword: {
    color: '#7A5CFF',
    fontWeight: 'bold',
  },
  comment: {
    color: '#6a9955',
    fontStyle: 'italic',
  },
});

export default CodeEditor;