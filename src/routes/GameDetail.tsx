import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!game) return <p className="text-center mt-10">Game not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full rounded-xl shadow-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
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

      <h2 className="text-2xl font-semibold mb-2">Available on:</h2>
      <ul className="list-disc list-inside text-gray-300">
        {game.platforms.map((p) => (
          <li key={p.platform.name}>{p.platform.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameDetail;
