
const Hero = () => {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden">

      <video
        className="absolute top-0 left-0 w-full h-screen object-cover"
        src="/assets/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-black via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black via-black/10 to-transparent" />



    </section>
  );
};

export default Hero;
