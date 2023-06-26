import Num2Bits from "../../src/mutators/Num2Bits";
import fs from "fs/promises";
import path from "path";

describe("Num2Bits", () => {
  test(Num2Bits.title, async () => {
    const circuit = await fs.readFile(
      path.join(__dirname, "../circuits/utils.circom")
    );
    expect(circuit.toString()).toContain(
      "signal bitCheck[LIMIT_BIT_SIZE] <== Num2Bits(LIMIT_BIT_SIZE)(messageId);"
    );
    const mutants = Num2Bits.mutate(circuit.toString());
    expect(mutants.length).toBeGreaterThan(0);
    expect(mutants[0]).not.toContain("Num2Bits");
  });
});
