import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../store/gamesSlice";
import GameCard from "./GameCard";
import type { RootState } from "../store/store";

const GameList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 40 }) as any);
  }, [dispatch]);

  if (status === "loading") return <p>Loading games...</p>;
  if (status === "failed") return <p>Failed to load games.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          name={game.name}
          background_image={game.background_image}
          rating={game.rating}
          released={game.released}
        />
      ))}
    </div>
  );
};

export default GameList;
