import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { Mutator } from "./mutators";
import fs from "fs/promises";
import Secp256k1Add from "./mutators/Secp256k1Add";
import UnusedPublicInputsOptimizedOut from "./mutators/UnusedPublicInputsOptimizedOut";
import path from "path";

const mutators: Mutator[] = [Secp256k1Add, UnusedPublicInputsOptimizedOut];

interface Argv {
  _: string[];
  outDir: string;
  temperature?: number;
}

const argv = yargs(hideBin(process.argv)).argv as unknown as Argv;

const { _: files, outDir = "mutants", temperature } = argv;

(async () => {
  for (const mutator of mutators) {
    for (const file of files) {
      const circuit = await fs.readFile(file, "utf-8");
      const mutated = mutator.mutate(circuit, temperature);
      if (mutated) {
        const mutatedFile = file
          .replace(/\/(?=[^\/]*$)/, `/${outDir}/`)
          .replace(".circom", `.mutated.${mutator.id}-${temperature}.circom`);

        const dirname = path.dirname(mutatedFile);
        await fs.mkdir(dirname, { recursive: true });
        await fs.writeFile(mutatedFile, mutated);
      }
    }
  }
})();
