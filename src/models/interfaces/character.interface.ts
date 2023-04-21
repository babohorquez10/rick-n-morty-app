export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: "Alive" | "Dead" | "unknown";
}
