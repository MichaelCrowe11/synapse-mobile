import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface Example {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  code: string;
}

const examples: Example[] = [
  {
    id: '1',
    title: 'Hello World',
    description: 'Simple variable declaration and printing',
    difficulty: 'Beginner',
    category: 'Basics',
    code: `# Simple Synapse program
name = "World"
greeting = "Hello, " + name
print(greeting)`,
  },
  {
    id: '2',
    title: 'Uncertain Temperature',
    description: 'Working with uncertainty quantification',
    difficulty: 'Beginner',
    category: 'Uncertainty',
    code: `# Temperature with uncertainty
uncertain temperature = 298.15 ± 0.5
uncertain pressure = 101.325 ± 0.1

# Calculations propagate uncertainty
energy = temperature * pressure`,
  },
  {
    id: '3',
    title: 'Bell State',
    description: 'Create quantum entanglement',
    difficulty: 'Intermediate',
    category: 'Quantum',
    code: `# Quantum Bell state
quantum circuit bell:
    qubits: 2
    H(0)        # Hadamard on qubit 0
    CNOT(0, 1)  # Entangle qubits
    measure(all)

run bell { shots: 1000 }`,
  },
  {
    id: '4',
    title: 'Parallel Monte Carlo',
    description: 'Parallel execution for Monte Carlo simulation',
    difficulty: 'Advanced',
    category: 'Parallel',
    code: `# Parallel Monte Carlo π estimation
parallel {
    branch A: estimate_pi(100000)
    branch B: estimate_pi(100000)
    branch C: estimate_pi(100000)
}

# Synthesize results
final_estimate = average(A, B, C)`,
  },
  {
    id: '5',
    title: 'Scientific Hypothesis',
    description: 'Hypothesis-driven computation',
    difficulty: 'Intermediate',
    category: 'Scientific',
    code: `# Scientific reasoning
hypothesis H1:
    assume: temperature > 273
    assume: pressure == 1
    predict: state == "liquid"

experiment E1:
    measure: actual_state
    validate: H1.predict == actual_state`,
  },
];

const ExamplesScreen: React.FC = () => {
  const [selectedExample, setSelectedExample] = React.useState<Example | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#43E5FF';
      case 'Intermediate':
        return '#FFA500';
      case 'Advanced':
        return '#FF6B6B';
      default:
        return '#999';
    }
  };

  const renderExample = ({item}: {item: Example}) => (
    <TouchableOpacity
      style={styles.exampleCard}
      onPress={() => setSelectedExample(item)}>
      <View style={styles.exampleHeader}>
        <Text style={styles.exampleTitle}>{item.title}</Text>
        <View
          style={[
            styles.difficultyBadge,
            {backgroundColor: getDifficultyColor(item.difficulty) + '20'},
          ]}>
          <Text
            style={[
              styles.difficultyText,
              {color: getDifficultyColor(item.difficulty)},
            ]}>
            {item.difficulty}
          </Text>
        </View>
      </View>
      <Text style={styles.exampleCategory}>{item.category}</Text>
      <Text style={styles.exampleDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (selectedExample) {
    return (
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedExample(null)}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{selectedExample.title}</Text>
        </View>
        <ScrollView style={styles.codeContainer}>
          <Text style={styles.codeText}>{selectedExample.code}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.runButton}>
          <Text style={styles.runButtonText}>Load in Editor</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={examples}
        renderItem={renderExample}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  listContainer: {
    padding: 10,
  },
  exampleCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#7A5CFF',
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  exampleTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  exampleCategory: {
    color: '#7A5CFF',
    fontSize: 12,
    marginBottom: 5,
  },
  exampleDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3d',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#43E5FF',
    fontSize: 16,
  },
  detailTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeContainer: {
    flex: 1,
    padding: 15,
  },
  codeText: {
    color: '#f0f0f0',
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  runButton: {
    backgroundColor: '#7A5CFF',
    margin: 15,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  runButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExamplesScreen;