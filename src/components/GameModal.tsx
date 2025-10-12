import { motion, AnimatePresence } from "framer-motion";
import type { Game } from "../store/gamesSlice";

type GameModalProps = {
  game: Game | null;
  onClose: () => void;
};

const GameModal = ({ game, onClose }: GameModalProps) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-neutral-900 rounded-xl overflow-hidden w-[90%] md:w-[60%] lg:w-[50%] shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-6 space-y-3">
            <h2 className="text-3xl font-bold">{game.name}</h2>
            <p className="text-gray-400 text-sm">Released: {game.released}</p>
            <p className="text-yellow-400 font-semibold">
              ⭐ {game.rating.toFixed(2)} / 5
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;
