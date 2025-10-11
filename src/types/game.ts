export type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  genres: { name: string }[];
};

export type GamesResponse = {
  count: number;
  next?: string;
  previous?: string;
  results: Game[];
};
