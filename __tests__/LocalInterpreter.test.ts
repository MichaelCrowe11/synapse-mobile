import {LocalInterpreter} from '../src/services/LocalInterpreter';

describe('LocalInterpreter', () => {
  let interpreter: LocalInterpreter;

  beforeEach(() => {
    interpreter = new LocalInterpreter();
  });

  describe('Variable Assignment', () => {
    it('should handle simple numeric assignment', async () => {
      const result = await interpreter.execute('x = 42');
      expect(result.type).toBe('success');
      expect(result.value).toBe('x = 42');
    });

    it('should handle string assignment', async () => {
      const result = await interpreter.execute('name = "Synapse"');
      expect(result.type).toBe('success');
      expect(result.value).toBe('name = "Synapse"');
    });

    it('should handle uncertain values', async () => {
      const result = await interpreter.execute('uncertain temperature = 298.15 ± 0.5');
      expect(result.type).toBe('uncertain');
      expect(result.value).toContain('298.15 ± 0.5');
    });
  });

  describe('Quantum Circuits', () => {
    it('should recognize quantum circuit definition', async () => {
      const code = `quantum circuit bell:
    qubits: 2`;
      const result = await interpreter.execute(code);
      expect(result.type).toBe('quantum_circuit');
      expect(result.circuit_name).toBe('bell');
    });

    it('should handle run command', async () => {
      const result = await interpreter.execute('run bell');
      expect(result.type).toBe('quantum_circuit');
      expect(result.counts).toBeDefined();
      expect(result.counts['00']).toBeGreaterThan(0);
      expect(result.counts['11']).toBeGreaterThan(0);
    });
  });

  describe('Parallel Blocks', () => {
    it('should recognize parallel blocks', async () => {
      const result = await interpreter.execute('parallel');
      expect(result.type).toBe('parallel');
      expect(result.branches).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid assignment', async () => {
      const result = await interpreter.execute('x == = 42');
      expect(result.type).toBe('error');
    });

    it('should handle empty input', async () => {
      const result = await interpreter.execute('');
      expect(result.type).toBe('success');
    });
  });

  describe('Comments', () => {
    it('should ignore comments', async () => {
      const code = `# This is a comment
x = 42  # Another comment`;
      const result = await interpreter.execute(code);
      expect(result.type).toBe('success');
      expect(result.value).toBe('x = 42');
    });
  });
});