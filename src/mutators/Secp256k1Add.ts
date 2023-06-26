import { Mutator } from ".";

const mutator: Mutator = {
  id: "Secp256k1Add",
  title: "Replace Secp256k1AddComplete by Secp256k1AddIncomplete.",
  description:
    "Secp256k1AddComplete handles points at infinity and distinguishes the cases where the points added are the same or not (uses doubling if the points are the same). Secp256k1AddIncomplete only handles the case where the points added are distinct and neither is the point at infinity. In some cases,Secp256k1AddComplete is needed to properly handle when a point at infinity appears/same points are added. See https://github.com/personaelabs/spartan-ecdsa",
  mutate: (circuit: string) => {
    const answer = [];

    const regex = /Secp256k1AddComplete/g;
    const offset = "Secp256k1AddComplete".length;

    let result;
    while ((result = regex.exec(circuit)) !== null) {
      const mutant =
        circuit.substring(0, result.index) +
        "Secp256k1AddIncomplete" +
        circuit.substring(result.index + offset, circuit.length);
      answer.push(mutant);
    }
    return answer;
  },
};

export default mutator;
