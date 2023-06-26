# circom-mutator

Mutation testing tool for circom

# How it works

This is a tool based on source-based rewrite of circom code lines for mutation generation.

Currently, it only uses regular expressions, treating code as text. Future versions might include transpiling the circom circuits into an intermediate representation for better analyses.

Most of the mutators are derived from [0xPARC's ZK Bug Tracker](https://github.com/0xPARC/zk-bug-tracker#dark-forest-1) and [yAcademy ZK Fellowship audits](https://github.com/zBlock-1). Please submit a pull request if you would like to include a new test case or a "trophy" if you were able to find any bugs in the wild with this tool.

# Usage

Run directly through the command line to see the mutants or install it into your project and use the API on your tests.

```
# command line
npx circom-mutator <files>

# test setup
npm install --dev circom-mutator
# or
yarn add -D circom-mutator
```
