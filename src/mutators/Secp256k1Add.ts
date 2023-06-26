import { Mutator } from ".";

const mutator: Mutator = {
  id: "Secp256k1Add",
  title: "Replace Secp256k1AddComplete by Secp256k1AddIncomplete.",
  description:
    "Secp256k1AddComplete handles points at infinity and distinguishes the cases where the points added are the same or not (uses doubling if the points are the same). Secp256k1AddIncomplete only handles the case where the points added are distinct and neither is the point at infinity. In some cases,Secp256k1AddComplete is needed to properly handle when a point at infinity appears/same points are added.",
  mutate: (circuit: string, temperature = 1) => {
    const ocurrences = circuit.match(/Secp256k1AddComplete/g);
    if (ocurrences) {
      const N = Math.floor(ocurrences.length * temperature);
      let i = 0;
      for (const ocurrence of ocurrences) {
        if (i > N) break;

        circuit = circuit.replace(
          /Secp256k1AddComplete/g,
          "Secp256k1AddIncomplete"
        );

        i++;
      }
      return circuit;
    } else return undefined;
  },
};

export default mutator;
