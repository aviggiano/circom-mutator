import { Mutator } from ".";

const mutator: Mutator = {
  id: "AssignedButNotConstrained",
  title: "Replace constraints by assignments",
  description:
    "A very common bug and misunderstanding is the difference between assignments and constraints. For zk circuits, constraints are the mathematical equations that must be satisfied by any given inputs for a proof to be valid. If any of the inputs result in one of the constraint equations to be incorrect, a valid proof is not possible (well, extremely unlikely). See https://github.com/0xPARC/zk-bug-tracker#8-assigned-but-not-constrained",
  mutate: (circuit: string) => {
    const answer = [];

    const constraints = [/<==/g, /==\>/g];
    const substitutions = ["<--", "-->"];
    for (let i = 0; i < constraints.length; i++) {
      const constraint = constraints[i];
      const substitution = substitutions[i];

      let result;
      while ((result = constraint.exec(circuit)) !== null) {
        const mutant =
          circuit.substring(0, result.index) +
          substitution +
          circuit.substring(result.index + result[0].length, circuit.length);
        answer.push(mutant);
      }
    }
    return answer;
  },
};

export default mutator;
