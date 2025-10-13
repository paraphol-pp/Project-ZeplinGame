import { Link } from "react-router-dom";

// components
import GlowWrapper from "./GlowWrapper";

type GameCardProps = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
};

const GameCard = ({
  id,
  name,
  background_image,
  rating,
  released,
}: GameCardProps) => {
  return (
    <GlowWrapper>

    <Link
      to={`/game/${id}`}
      className="group relative block rounded-xl overflow-hidden bg-neutral-950 transition-all duration-300 hover:scale-105 hover:z-10 "
    >
      {/* Image */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={background_image}
          alt={name}
          className="w-full h-50 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center rounded-xl">
        <div className="absolute top-20">
          <p className="text-white font-semibold text-sm mb-2">{name}</p>
          <button className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-full cursor-pointer">
            View Details
          </button>
        </div>
      </div>

      {/* Game Info */}
      <div className="p-3 rounded-b-xl">
        <h3 className="font-semibold truncate text-white text-lg">{name}</h3>
        <p className="text-yellow-400 text-sm">⭐ {rating.toFixed(2)}</p>
        <p className="text-gray-400/50 text-xs">{released}</p>
      </div>
    </Link>
    </GlowWrapper>
  );
};

export default GameCard;
