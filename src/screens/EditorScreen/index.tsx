import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CodeEditor from '../../components/CodeEditor';
import ResultDisplay from '../../components/ResultDisplay';
import {LocalInterpreter} from '../../services/LocalInterpreter';
import {CloudExecutor} from '../../services/CloudExecutor';

const EditorScreen: React.FC = () => {
  const [code, setCode] = useState(`# Welcome to Synapse Mobile!

# Simple variable declaration
uncertain temperature = 298.15 ± 0.5

# Quantum circuit example
quantum circuit bell:
    qubits: 2
    H(0)
    CNOT(0, 1)
    measure(all)

# Run the circuit
run bell { shots: 1000 }
`);
  const [result, setResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionMode, setExecutionMode] = useState<'local' | 'cloud'>('local');

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);

    try {
      if (executionMode === 'local') {
        const interpreter = new LocalInterpreter();
        const output = await interpreter.execute(code);
        setResult(output);
      } else {
        const executor = new CloudExecutor();
        const output = await executor.execute(code);
        setResult(output);
      }
    } catch (error: any) {
      setResult({
        type: 'error',
        message: error.message || 'Execution failed',
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              executionMode === 'local' && styles.modeButtonActive,
            ]}
            onPress={() => setExecutionMode('local')}>
            <Text
              style={[
                styles.modeButtonText,
                executionMode === 'local' && styles.modeButtonTextActive,
              ]}>
              Local
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              executionMode === 'cloud' && styles.modeButtonActive,
            ]}
            onPress={() => setExecutionMode('cloud')}>
            <Text
              style={[
                styles.modeButtonText,
                executionMode === 'cloud' && styles.modeButtonTextActive,
              ]}>
              Cloud
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.runButton, isRunning && styles.runButtonDisabled]}
          onPress={handleRun}
          disabled={isRunning}>
          {isRunning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.runButtonText}>Run</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.editorContainer}>
        <CodeEditor
          value={code}
          onChange={setCode}
          language="synapse"
          theme="dark"
        />
      </ScrollView>

      {result && (
        <View style={styles.resultContainer}>
          <ResultDisplay result={result} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3d',
  },
  modeSelector: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    padding: 2,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  modeButtonActive: {
    backgroundColor: '#7A5CFF',
  },
  modeButtonText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  runButton: {
    backgroundColor: '#43E5FF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  runButtonDisabled: {
    opacity: 0.6,
  },
  runButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editorContainer: {
    flex: 1,
    padding: 10,
  },
  resultContainer: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#3d3d3d',
    backgroundColor: '#2d2d2d',
  },
});

export default EditorScreen;