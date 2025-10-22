// Home.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchGames } from "../store/gamesSlice"; 
import SectionHeader from "../components/SectionHeader";
import CategoryRow from "../components/CategoryRow";
import Container from "../components/Container";

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 100 }));
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

  const topGames = items.slice(0, 10);       // ตัวอย่างจำกัดแสดง 10 ชิ้น
  const topRating = items.filter((g) => g.rating > 4.5).slice(0, 10);
  const trending = items.slice(10, 20);

  return (
    <div className="relative">

      {/* Top Games (header + carousel) */}
      <div className="-mt-[450px] md:-mt-[250px] relative z-20">
        <Container>
          {/* Top Games — มีปุ่ม View Top Games */}
          <SectionHeader
            title="Top Games"
            to="/games?filter=top"
            buttonLabel="View Top Games →"
          />
          <CategoryRow games={topGames} />
        </Container>
      </div>

      <Container>
        {/* Top Rating */}
        <SectionHeader
          title="Top Rating"
          to="/games?filter=rating"
          buttonLabel="View Top Rating →"
        />
        <CategoryRow games={topRating} />

        {/* New & Trending */}
        <SectionHeader
          title="New & Trending"
          to="/games?filter=new"
          buttonLabel="View New & Trending →"
        />
        <CategoryRow games={trending} />
      </Container>
    </div>
  );
};

export default Home;
