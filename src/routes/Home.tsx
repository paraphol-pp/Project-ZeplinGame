// Home.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/gamesSlice";
import type { RootState } from "../store/store";
import CategoryRow from "../components/CategoryRow";
import Container from "../components/Container";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 100 }) as any);
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh] text-gray-300 text-lg">
          <span className="animate-bounce">🎮</span>
          <span className="animate-pulse text-lg">Loading...</span>
        </div>
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh] text-red-400 text-lg font-semibold">
          ❌ Failed to load games. Please try again.
        </div>
      </Container>
    );
  }

  const topGames = items.slice(0, 100);
  const topRating = items.filter((g) => g.rating > 4.5).slice(0, 100);
  const trending = items.slice(10, 100);

  return (
    <div className="relative">

      <div className="-mt-[250px] relative z-20">
        <Container>
          <CategoryRow title="Top Games" games={topGames} />
        </Container>
      </div>


      <Container>
        <CategoryRow title="Top Rating" games={topRating} />
        <CategoryRow title="New & Trending" games={trending} />
      </Container>
    </div>
  );
};

export default Home;
