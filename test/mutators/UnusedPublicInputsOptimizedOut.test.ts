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
    const mutants = UnusedPublicInputsOptimizedOut.mutate(circuit.toString());
    expect(mutants.length).toBeGreaterThan(0);
    expect(mutants[0]).not.toContain(
      "recipientSquare <== recipient * recipient;"
    );
    expect(mutants[1]).not.toContain("feeSquare <== fee * fee;");
    expect(mutants[2]).not.toContain("relayerSquare <== relayer * relayer;");
    expect(mutants[3]).not.toContain("refundSquare <== refund * refund;");
  });
});
