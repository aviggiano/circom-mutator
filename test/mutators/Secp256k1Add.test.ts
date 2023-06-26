import Secp256k1Add from "../../src/mutators/Secp256k1Add";
import fs from "fs/promises";
import path from "path";

describe("Secp256k1Add", () => {
  test(Secp256k1Add.title, async () => {
    const circuit = await fs.readFile(
      path.join(__dirname, "../circuits/eff_ecdsa.circom")
    );
    expect(circuit.toString()).not.toContain("Secp256k1AddIncomplete");
    expect(Secp256k1Add.mutate(circuit.toString())).toContain(
      "Secp256k1AddIncomplete"
    );
  });
});
