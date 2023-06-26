export interface Mutator {
  id: string;
  title: string;
  description: string;
  mutate: (circuit: string) => string[];
}

import AssignedButNotConstrained from "./AssignedButNotConstrained";
import MissingOutputCheckConstraint from "./MissingOutputCheckConstraint";
import Num2Bits from "./Num2Bits";
import Secp256k1Add from "./Secp256k1Add";
import UnusedPublicInputsOptimizedOut from "./UnusedPublicInputsOptimizedOut";

export default [
  AssignedButNotConstrained,
  MissingOutputCheckConstraint,
  Num2Bits,
  Secp256k1Add,
  UnusedPublicInputsOptimizedOut,
];
