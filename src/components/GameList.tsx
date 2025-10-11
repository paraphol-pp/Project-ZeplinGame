import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/gamesSlice";
import type { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";

const GameList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.games);
  

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 30 }));
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10">
    {items.map((game) => (
      <Link
        to={`/game/${game.id}`}
        key={game.id}
        className="bg-neutral-900 p-3 rounded-xl hover:scale-105 transition-all block"
      >
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded-lg object-cover mb-3"
        />
        <h3 className="text-white font-semibold">{game.name}</h3>
        <p className="text-gray-400 text-sm">{game.released}</p>
        <p className="text-yellow-400 text-sm">
          ⭐ {game.rating} / 5
        </p>
        <p className="text-indigo-400 text-sm">
          {game.genres.map((g) => g.name).join(", ")}
        </p>
      </Link>
    ))}
  </div>
  );
};

export default GameList;
