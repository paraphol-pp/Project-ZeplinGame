import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
// import type { Game } from "../store/gamesSlice";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);


  if (favorites.length === 0) {
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh] text-gray-300 text-lg">
          <span className="animate-bounce">🎮</span>
          <span className="animate-pulse text-lg">You haven’t favorited any games yet</span>
        </div>
      </Container>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10">
      {favorites.map((game) => (
        <Link
          key={game.id}
          to={`/game/${game.id}`}
          className="bg-neutral-800 rounded-xl overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold truncate">{game.name}</h3>
            <p className="text-yellow-400 text-sm">⭐ {game.rating.toFixed(2)}</p>
            <p className="text-gray-400 text-xs">{game.released}</p>
          </div>
        </Link>
        
      ))}
    </div>
  );
};

export default Favorites;
