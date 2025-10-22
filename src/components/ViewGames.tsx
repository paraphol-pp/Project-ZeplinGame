import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchGames } from "../store/gamesSlice";
import GameCard from "../components/GameCard";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

export default function ViewGames() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: games, status } = useAppSelector((s) => s.games);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const filter = params.get("filter") || "";

  useEffect(() => {
    if (!games || games.length === 0) {
      dispatch(fetchGames({ page: 1, limit: 100 }));
    }
  }, [dispatch, games?.length]);

  if (status === "loading") return <p className="text-center py-12">Loading…</p>;
  if (status === "failed")
    return <p className="text-center py-12 text-red-400">Failed to load games.</p>;

  let displayGames = games || [];
  let title = "All Games";

  if (filter === "top") {
    title = "Top Games";
    displayGames = displayGames.slice(0, 20);
  } else if (filter === "rating") {
    title = "Top Rating";
    displayGames = displayGames
      .filter((g) => typeof g.rating === "number" && g.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating);
  } else if (filter === "new") {
    title = "New & Trending";
    displayGames = [...displayGames]
      .sort((a, b) => (b.released > a.released ? 1 : -1))
      .slice(0, 40);
  }

  return (
    <div className="py-8">
      <div className="relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:text-indigo-200 transition-all duration-300 cursor-pointer "
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-white text-center">{title}</h2>
      </div>

      {(!displayGames || displayGames.length === 0) ? (
        <div className="text-center text-gray-300 py-12">No games found.</div>
      ) : (
        <Container>
          <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {displayGames.map((g) => (
                  <GameCard
                    key={g.id}
                    id={g.id}
                    name={g.name}
                    background_image={g.background_image}
                    rating={g.rating}
                    released={g.released}
                  />
                ))}
              </div>
          </div>
        </Container>
      )}
    </div>
  );
}
