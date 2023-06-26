import { Mutator } from ".";

const mutator: Mutator = {
  id: "Num2Bits",
  title: "Arithmetic Over/Under Flows",
  description:
    "Zk cryptography often involves modular arithmetic over a scalar field. This means that all operations are done modulo the order of the field. It's easy to forget this fact, and not account for over/under flows. This can cause unintended consequences if there are no checks preventing these patterns. We can use the LessThan and Num2Bits templates defined by Circomlib to ensure the values we are working with are within the correct bounds, and will not cause overflows or underflows. See https://github.com/0xPARC/zk-bug-tracker#3-arithmetic-overunder-flows",
  mutate: (circuit: string) => {
    const answer = [];

    const constraint = /.*<==.*Num2Bits.*/g;

    let result;
    while ((result = constraint.exec(circuit)) !== null) {
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
