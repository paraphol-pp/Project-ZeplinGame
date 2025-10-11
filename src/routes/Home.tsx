import GameList from "../components/GameList";

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white px-10 py-10">
      <h1 className="text-4xl font-bold mb-6">🎮 Top Games</h1>
      <GameList />
    </div>
  );
};

export default Home;
