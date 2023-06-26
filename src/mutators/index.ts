export interface Mutator {
  id: string;
  title: string;
  description: string;
  mutate: (circuit: string) => string[];
}
