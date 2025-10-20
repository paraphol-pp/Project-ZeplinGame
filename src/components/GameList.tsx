import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchGames } from "../store/gamesSlice";
import GameCard from "../components/GameCard";

const GameList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    if (items.length === 0 && status === "idle") {
      dispatch(fetchGames({}));
    }
  }, [dispatch, items.length, status]);

  // loading
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-center text-purple-400 animate-pulse">
          🎮 Loading games...
        </p>
      </div>
    );
  }

  // failed
  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center text-red-400">
        ❌ Failed to load games. Please try again.
        <button
          onClick={() => dispatch(fetchGames({}))}
          className="mt-3 px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-10">
      {items.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
};

export default GameList;
