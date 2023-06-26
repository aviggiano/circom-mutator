export interface Mutator {
  id: string;
  title: string;
  description: string;
  mutate: (circuit: string, temperature?: number) => string | undefined;
}
