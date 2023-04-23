export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: "Alive" | "Dead" | "unknown";
  starred: boolean;
  comments: string[];
}
