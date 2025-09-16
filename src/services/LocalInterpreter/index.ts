/**
 * Local Synapse interpreter for mobile
 * Handles basic operations that don't require cloud computing
 */

interface ExecutionResult {
  type: 'success' | 'error' | 'quantum_circuit' | 'parallel' | 'uncertain';
  value?: any;
  message?: string;
  [key: string]: any;
}

export class LocalInterpreter {
  private variables: Map<string, any> = new Map();

  async execute(code: string): Promise<ExecutionResult> {
    try {
      // Remove comments
      const lines = code.split('\n').map(line => {
        const commentIndex = line.indexOf('#');
        return commentIndex >= 0 ? line.substring(0, commentIndex).trim() : line.trim();
      }).filter(line => line.length > 0);

      for (const line of lines) {
        const result = await this.executeLine(line);
        if (result.type === 'error') {
          return result;
        }
      }

      // Return last variable or success
      if (this.variables.size > 0) {
        const lastVar = Array.from(this.variables.entries()).pop();
        return {
          type: 'success',
          value: lastVar ? `${lastVar[0]} = ${this.formatValue(lastVar[1])}` : 'Execution completed',
        };
      }

      return {type: 'success', value: 'Execution completed'};
    } catch (error: any) {
      return {
        type: 'error',
        message: error.message || 'Execution failed',
      };
    }
  }

  private async executeLine(line: string): Promise<ExecutionResult> {
    // Handle variable assignment
    if (line.includes('=')) {
      return this.handleAssignment(line);
    }

    // Handle quantum circuit (mock for local)
    if (line.startsWith('quantum circuit')) {
      return this.handleQuantumCircuit(line);
    }

    // Handle parallel block (mock for local)
    if (line.startsWith('parallel')) {
      return {
        type: 'parallel',
        message: 'Parallel execution requires cloud computing',
        branches: {
          A: 'Mock result A',
          B: 'Mock result B',
        },
      };
    }

    // Handle run command
    if (line.startsWith('run')) {
      return this.handleRun(line);
    }

    return {type: 'success', value: line};
  }

  private handleAssignment(line: string): ExecutionResult {
    const parts = line.split('=').map(p => p.trim());
    if (parts.length !== 2) {
      return {type: 'error', message: 'Invalid assignment syntax'};
    }

    const [varName, valueExpr] = parts;

    // Handle uncertain values
    if (varName.startsWith('uncertain')) {
      const actualName = varName.replace('uncertain', '').trim();
      const uncertainMatch = valueExpr.match(/([0-9.]+)\s*±\s*([0-9.]+)/);
      if (uncertainMatch) {
        const [, value, uncertainty] = uncertainMatch;
        this.variables.set(actualName, {
          type: 'uncertain',
          value: parseFloat(value),
          uncertainty: parseFloat(uncertainty),
        });
        return {
          type: 'uncertain',
          value: `${actualName} = ${value} ± ${uncertainty}`,
        };
      }
    }

    // Handle simple numeric values
    const numValue = parseFloat(valueExpr);
    if (!isNaN(numValue)) {
      this.variables.set(varName, numValue);
      return {type: 'success', value: `${varName} = ${numValue}`};
    }

    // Handle string values
    if (valueExpr.startsWith('"') && valueExpr.endsWith('"')) {
      const strValue = valueExpr.slice(1, -1);
      this.variables.set(varName, strValue);
      return {type: 'success', value: `${varName} = "${strValue}"`};
    }

    // Store as expression
    this.variables.set(varName, valueExpr);
    return {type: 'success', value: `${varName} = ${valueExpr}`};
  }

  private handleQuantumCircuit(line: string): ExecutionResult {
    const match = line.match(/quantum circuit (\w+):/);
    if (match) {
      const circuitName = match[1];
      this.variables.set(`circuit_${circuitName}`, {
        type: 'quantum_circuit',
        name: circuitName,
      });
      return {
        type: 'quantum_circuit',
        circuit_name: circuitName,
        message: 'Quantum circuit defined (simulation requires cloud)',
      };
    }
    return {type: 'error', message: 'Invalid quantum circuit syntax'};
  }

  private handleRun(line: string): ExecutionResult {
    const match = line.match(/run (\w+)/);
    if (match) {
      const circuitName = match[1];
      // Mock quantum results for demo
      return {
        type: 'quantum_circuit',
        circuit_name: circuitName,
        qubits: 2,
        counts: {
          '00': 512,
          '11': 512,
        },
        message: 'Mock quantum results (real simulation requires cloud)',
      };
    }
    return {type: 'error', message: 'Invalid run syntax'};
  }

  private formatValue(value: any): string {
    if (value && value.type === 'uncertain') {
      return `${value.value} ± ${value.uncertainty}`;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  clear() {
    this.variables.clear();
  }
}