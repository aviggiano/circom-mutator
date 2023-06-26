import MissingOutputCheckConstraint from "../../src/mutators/MissingOutputCheckConstraint";
import fs from "fs/promises";
import path from "path";

describe("MissingOutputCheckConstraint", () => {
  test(MissingOutputCheckConstraint.title, async () => {
    const circuit = await fs.readFile(
      path.join(__dirname, "../circuits/bls_signature.circom")
    );
    expect(circuit.toString()).toContain("r === 10;");
    const mutants = MissingOutputCheckConstraint.mutate(circuit.toString());
    expect(mutants.length).toBeGreaterThan(0);
    expect(mutants[0]).not.toContain("r === 10;");
  });
});
