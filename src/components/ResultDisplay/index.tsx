import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface ResultDisplayProps {
  result: any;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({result}) => {
  const formatResult = () => {
    if (!result) return null;

    if (result.type === 'error') {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorMessage}>{result.message}</Text>
        </View>
      );
    }

    if (result.type === 'quantum_circuit') {
      return (
        <View style={styles.quantumContainer}>
          <Text style={styles.resultTitle}>Quantum Circuit Result</Text>
          <Text style={styles.resultSubtitle}>
            Circuit: {result.circuit_name} | Qubits: {result.qubits}
          </Text>
          {result.counts && (
            <View style={styles.countsContainer}>
              <Text style={styles.countsTitle}>Measurement Results:</Text>
              {Object.entries(result.counts).map(([state, count]) => (
                <Text key={state} style={styles.countItem}>
                  |{state}⟩: {count as any}
                </Text>
              ))}
            </View>
          )}
        </View>
      );
    }

    if (result.type === 'parallel') {
      return (
        <View style={styles.parallelContainer}>
          <Text style={styles.resultTitle}>Parallel Execution</Text>
          {Object.entries(result.branches || {}).map(([branch, value]) => (
            <View key={branch} style={styles.branchResult}>
              <Text style={styles.branchName}>Branch {branch}:</Text>
              <Text style={styles.branchValue}>{String(value)}</Text>
            </View>
          ))}
        </View>
      );
    }

    // Default output
    return (
      <View style={styles.defaultContainer}>
        <Text style={styles.resultTitle}>Result</Text>
        <Text style={styles.resultText}>
          {typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {formatResult()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#1e1e1e',
  },
  errorContainer: {
    padding: 15,
    backgroundColor: '#3d1e1e',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
  },
  errorTitle: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorMessage: {
    color: '#ffaaaa',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  quantumContainer: {
    padding: 15,
    backgroundColor: '#1e2d3d',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#43E5FF',
  },
  parallelContainer: {
    padding: 15,
    backgroundColor: '#2d1e3d',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#7A5CFF',
  },
  defaultContainer: {
    padding: 15,
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultSubtitle: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 10,
  },
  resultText: {
    color: '#f0f0f0',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  countsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
  },
  countsTitle: {
    color: '#43E5FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  countItem: {
    color: '#f0f0f0',
    fontSize: 13,
    fontFamily: 'monospace',
    marginLeft: 10,
    marginVertical: 2,
  },
  branchResult: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
  },
  branchName: {
    color: '#7A5CFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  branchValue: {
    color: '#f0f0f0',
    fontSize: 13,
    fontFamily: 'monospace',
    marginTop: 3,
  },
});

export default ResultDisplay;