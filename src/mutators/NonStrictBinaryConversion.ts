import { Mutator } from ".";

const mutator: Mutator = {
  id: "NonStrictBinaryConversion",
  title: "Non-strict binary conversion",
  description:
    "Using Num2Bits and Bits2Num from Circomlib to convert a field element to and from binary form is only safe if the input size is smaller than the size of the prime. If not, there may be multiple correct representations of the input which could cause issues, since we typically expect the circuit output to be uniquely determined by the input. If you cannot restrict the input size below the prime size you should use the strict versions Num2Bits_strict and Bits2Num_strict to convert to and from binary representation. See https://github.com/trailofbits/circomspect/blob/main/doc/analysis_passes.md#non-strict-binary-conversion",
  mutate: (circuit: string) => {
    const answer = [];

    const regex = /_strict/g;

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
