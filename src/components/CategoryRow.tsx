import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import GameCard from "./GameCard";
import type { Game } from "../store/gamesSlice";

type CategoryRowProps = {
  title: string;
  games: Game[];
};

const CategoryRow = ({ title, games }: CategoryRowProps) => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4 ">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        // loop={true}
        grabCursor={true}
        speed={800}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <GameCard
              id={game.id}
              name={game.name}
              background_image={game.background_image}
              rating={game.rating}
              released={game.released}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryRow;
