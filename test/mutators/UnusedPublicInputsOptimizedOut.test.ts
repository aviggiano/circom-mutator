import UnusedPublicInputsOptimizedOut from "../../src/mutators/UnusedPublicInputsOptimizedOut";
import fs from "fs/promises";
import path from "path";

describe("UnusedPublicInputsOptimizedOut", () => {
  test(UnusedPublicInputsOptimizedOut.title, async () => {
    const circuit = await fs.readFile(
      path.join(__dirname, "../circuits/withdraw.circom")
    );
    expect(circuit.toString()).toContain(
      "recipientSquare <== recipient * recipient;"
    );
    expect(
      UnusedPublicInputsOptimizedOut.mutate(circuit.toString())
    ).not.toContain("recipientSquare <== recipient * recipient;");
  });
});
