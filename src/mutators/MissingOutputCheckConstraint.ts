import { Mutator } from ".";

const mutator: Mutator = {
  id: "MissingOutputCheckConstraint",
  title: "Remove constraints on circuit outputs",
  description:
    "Some intermediate circuits are often used to guarantee that outputs remain in a certain range. However, not always the main circuit will check the output of these constraining circuits. The fix is to add a constraint on all of the outputs of the constraining circuits. See https://github.com/0xPARC/zk-bug-tracker#3-circom-pairing-missing-output-check-constraint",
  mutate: (circuit: string) => {
    const answer = [];

    const regex = /.*.*===.*;/gi;

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
