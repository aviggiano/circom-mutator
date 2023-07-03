import fs from "fs/promises";
import path from "path";
import cp from "child_process";
import mutators from "./mutators";

interface Params {
  description: string;
  filename: string;
  test: () => Promise<void>;
}

function exec(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

export default function testMutations({ description, filename, test }: Params) {
  describe.only(`[mutation] ${description}`, () => {
    let dependencyFilename: string;
    let original: string;
    beforeAll(async () => {
      const file = await fs.readFile(filename, "utf-8");
      const main = file.match(/include.*"(.*)"/)![1];
      const mainDir = filename.match(/(.*)\//)![1];
      dependencyFilename = path.join(mainDir, main);
      original = await fs.readFile(dependencyFilename, "utf-8");
    });
    afterEach(async () => {
      await fs.writeFile(dependencyFilename, original);
    });
    for (const mutator of mutators) {
      it(`Apply mutator ${mutator.id} and verify if tests still pass`, async () => {
        const mutants = mutator.mutate(original);
        for (const mutant of mutants) {
          await fs.writeFile(`${dependencyFilename}.mutant`, mutant);
          const diff = await exec(
            `diff ${dependencyFilename} ${dependencyFilename}.mutant`
          );
          await fs.writeFile(`${dependencyFilename}`, mutant);
          await fs.rm(`${dependencyFilename}.mutant`);
          try {
            await test();
          } catch (err) {
            console.log(diff);
            throw err;
          }
        }
      });
    }
  });
}
