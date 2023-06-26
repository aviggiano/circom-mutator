import { Mutator } from ".";

const mutator: Mutator = {
  id: "UnusedPublicInputsOptimizedOut",
  title:
    "Remove dummy constraint used to prevent comiler optimization of public inputs.",
  description:
    "Many circuits will have a variable as a public input, but won't write any constraints on that variable. These public inputs without any constraints can act as key information when verifying the proof. However, as of Circom 2.0, the default r1cs compilation uses an optimizer. The optimizer will optimize these public inputs out of the circuit if they are not involved in any constraints. To prevent this over optimization, one can add a non-linear constraint that involves the public input. TornadoCash and Semaphore do this. TornadoCash used multiple non-linear constraints to prevent its public variables from being optimized out. Semaphore's public 'signalHash' input is intentionally added into a non-linear constraint ('signalHashSquared') to prevent it from being optimized out. tornado-core/circuits/withdraw.circom. See https://github.com/0xPARC/zk-bug-tracker#5-unused-public-inputs-optimized-out",
  mutate: (circuit: string) => {
    const answer = [];

    const regex = /.*square.*<==.*\w+\\*\w+.*;/gi;

    let result;
    while ((result = regex.exec(circuit)) !== null) {
      const mutant =
        circuit.substring(0, result.index) +
        "" +
        circuit.substring(result.index + result[0].length, circuit.length);
      answer.push(mutant);
    }
    return answer;
  },
};

export default mutator;
