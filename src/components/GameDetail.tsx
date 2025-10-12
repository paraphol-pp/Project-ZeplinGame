import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import type { RootState } from "../store/store";
import Container from "./Container";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

type GameDetail = {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  released: string;
  rating: number;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
};

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        setGame(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleFavorite = () => {
    if (!game) return;
    if (isFavorite) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite(game));
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh] text-gray-300 text-lg">
          <span className="animate-bounce">🎮</span>
          <span className="animate-pulse text-lg">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!game) {
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh] text-gray-300 text-lg">
          <span className="animate-bounce">🎮</span>
          <span className="animate-pulse text-lg">Game not found.</span>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-5xl mx-auto p-6 text-white pt-20">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full rounded-xl shadow-lg mb-6"
        />

        <div className="flex items-center justify-between mb-3">
          <h1 className="text-4xl font-bold">{game.name}</h1>
          <button
            onClick={handleFavorite}
            className={`px-5 py-2 rounded-lg font-semibold transition cursor-pointer
            ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-500 hover:bg-indigo-700"
            }`}
          >
            {isFavorite ? "★ Favorited" : "☆ Add to Favorite"}
          </button>
        </div>

        <p className="text-gray-400 mb-2">Released: {game.released}</p>
        <p className="text-yellow-400 font-semibold mb-4">
          ⭐ {game.rating} / 5
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {game.genres.map((g) => (
            <span
              key={g.name}
              className="bg-indigo-600/20 border border-indigo-500 text-sm px-3 py-1 rounded-full"
            >
              {g.name}
            </span>
          ))}
        </div>

        <p className="leading-relaxed text-gray-300 mb-8">
          {game.description_raw}
        </p>
      </div>
    </Container>
  );
};

export default GameDetail;
