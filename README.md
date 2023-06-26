# circom-mutator

Mutation testing tool for circom

# How it works

This is a tool based on source-based rewrite of code lines for mutation generation.

Currently, it only uses regular expressions, treating code as text. Future versions might include transpiling the circom circuits into an intermediate representation for better analyses,

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

# Parameters

| Parameter | Description |
| --- | --- |
| `temperature` | Determines how much change the mutator should apply to the source code. Passing 1 means all occurrences matching a mutator will be changed. Passing 0.5 means only half of the occurences will be changed |
