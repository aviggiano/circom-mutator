import AssignedButNotConstrained from "../../src/mutators/AssignedButNotConstrained";
import fs from "fs/promises";
import path from "path";

describe("AssignedButNotConstrained", () => {
  test(AssignedButNotConstrained.title, async () => {
    const circuit = await fs.readFile(
      path.join(__dirname, "../circuits/comparators.circom")
    );
    expect(circuit.toString()).toContain("out <== -in*inv +1;");
    const mutants = AssignedButNotConstrained.mutate(circuit.toString());
    expect(mutants.length).toBeGreaterThan(0);
    expect(mutants[0]).not.toContain("out <== -in*inv +1;");
    expect(mutants[0]).toContain("out <-- -in*inv +1;");
  });
});
