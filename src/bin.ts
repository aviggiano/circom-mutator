import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs/promises";
import path from "path";
import mutators from "./mutators";

interface Argv {
  _: string[];
  outDir: string;
}

const argv = yargs(hideBin(process.argv)).argv as unknown as Argv;

const { _: files, outDir = "mutants" } = argv;

(async () => {
  console.log(`[circom-mutator] start`);
  console.log(
    `[circom-mutator] creating mutants of '${files.join(
      ","
    )}' and saving to '${outDir}'`
  );
  for (const mutator of mutators) {
    for (const file of files) {
      const circuit = await fs.readFile(file, "utf-8");
      const mutants = mutator.mutate(circuit);
      let i = 0;
      for (const mutant of mutants) {
        i++;
        const name = `${mutator.id}-${i.toString().padStart(2, "0")}`;
        const mutatedFile = file
          .replace(/\/(?=[^\/]*$)/, `/${outDir}/`)
          .replace(".circom", `.mutated.${name}.circom`);

        const dirname = path.dirname(mutatedFile);
        await fs.mkdir(dirname, { recursive: true });
        console.log(`[circom-mutator] creating mutant ${name}`);
        await fs.writeFile(mutatedFile, mutant);
      }
    }
  }
  console.log(`[circom-mutator] done`);
})();
