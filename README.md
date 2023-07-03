# circom-mutator

Mutation testing tool for circom

# How it works

`circom-mutator` is a mutation testing tool designed for the circom programming language. This tool primarily revolves around the source-based rewrite of circom code lines to generate mutations.


Currently, it operates by utilizing regular expressions to treat the code as text. This methodology may evolve in the future, potentially incorporating the transpiling of circom circuits into an intermediate representation to enable deeper analyses.

The majority of mutators present in `circom-mutator` are based on:

- [0xPARC's ZK Bug Tracker](https://github.com/0xPARC/zk-bug-tracker#dark-forest-1)
- [Circomspect's analysis passes](https://github.com/trailofbits/circomspect/blob/main/doc/analysis_passes.md)
- [yAcademy ZK Fellowship audits](https://github.com/zBlock-1)


Contributions are welcomed. If you wish to include a new test case or if you've identified any bugs in the wild using this tool, feel free to submit a pull request.

# Usage

You can either use `circom-mutator` as a standalone CLI or integrate it into your project and leverage its API in your tests. 

## CLI

```
npx circom-mutator <files> [--out-dir <directory>]
```

This will generate all possible mutants from the provided input file.

## Test integration

1. Install the package using npm or yarn:

```
npm install --dev circom-mutator
# or
yarn add -D circom-mutator
```

Once you have installed circom-mutator in your project, you can use the `testMutations` in your test files:

```typescript
testMutations({
  description: "eff_ecdsa",
  filename: path.join(__dirname, "./circuits/eff_ecdsa_test.circom"),
  test: async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "./circuits/eff_ecdsa_test.circom"),
      {
        prime: "secq256k1"
      }
    );

    const privKey = Buffer.from(
      "f5b552f608f5b552f608f5b552f6082ff5b552f608f5b552f608f5b552f6082f",
      "hex"
    );
    const pubKey = ec.keyFromPrivate(privKey.toString("hex")).getPublic();
    const msg = Buffer.from("hello world");
    const circuitInput = getEffEcdsaCircuitInput(privKey, msg);

    const w = await circuit.calculateWitness(circuitInput, true);

    await circuit.assertOut(w, {
      pubKeyX: pubKey.x.toString(),
      pubKeyY: pubKey.y.toString()
    });

    // mutated circuits should make tests fail
    expect(async () => await circuit.checkConstraints(w)).toThrow();
  }
});
```

This will output the diff between the mutants and the original circuit as well as the test results. A fail means the mutated circuit was still able to pass the test, which is not desireable.

# False positives

Please note that this tool may generate numerous false positives. Not all circuits will check for every possible constraint, as some are expected to be implemented at the application layer.

For instance, certain circuits may permit an attacker to create fake witnesses by randomly selecting edge cases (such as zero point, points at infinity, or additions with p & -p). These circuits will expect app developers to perform these verifications.

Nevertheless, it remains important to verify that failures detected by `circom-mutator` are indeed false positives, rather than a result of insufficient test coverage.