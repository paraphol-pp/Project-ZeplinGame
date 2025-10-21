import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchGames } from "../store/gamesSlice";
import GameCard from "../components/GameCard";

const GameList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    // ถ้าไม่มี localStorage fetch ใหม่
    const cached = localStorage.getItem("games");

    if (items.length === 0 && !cached) {
      console.log("📡 No cache found → fetching from API");
      dispatch(fetchGames({}));
    } else if (cached && items.length === 0) {
      console.log("💾 Loaded from localStorage → set to Redux");
      dispatch({
        type: "games/fetchGames/fulfilled",
        payload: { count: JSON.parse(cached).length, results: JSON.parse(cached) },
      });
    }
  }, [dispatch, items.length]);

  // Load
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-center text-indigo-400 animate-pulse text-xl font-semibold">
          🎮 Loading games...
        </p>
      </div>
    );
  }

  // Fail
  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center text-red-400">
        Failed to load games. Please try again.
        <button
          onClick={() => dispatch(fetchGames({}))}
          className="mt-3 px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
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
