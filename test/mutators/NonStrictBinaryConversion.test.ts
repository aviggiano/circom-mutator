import NonStrictBinaryConversion from "../../src/mutators/NonStrictBinaryConversion";
import fs from "fs/promises";
import path from "path";

describe("NonStrictBinaryConversion", () => {
  test(NonStrictBinaryConversion.title, async () => {
    const circuit = await fs.readFile(
      path.join(__dirname, "../circuits/smtverifier.circom")
    );
    expect(circuit.toString()).not.toContain("Num2Bits()");
    expect(circuit.toString()).toContain("Num2Bits_strict()");
    const mutants = NonStrictBinaryConversion.mutate(circuit.toString());
    expect(mutants.length).toBeGreaterThan(0);
    mutants.forEach((mutant) => {
      expect(mutant).toContain("Num2Bits()");
    });
  });
});
