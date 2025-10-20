// react-icons
import { GoLock } from "react-icons/go";
import { FaCode } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";

// components
import Container from "../components/Container";
import GlowWrapper from "../components/GlowWrapper";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 600 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Container>
        <div className="max-w-[1440px] mx-auto">
          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-25">
            {/* card-1 */}
            <div className="relative flex flex-col items-center justify-center md:items-start md:justify-normal order-2 md:order-1">
              {/* ex-1 */}
              <div className="md:mx-32 mb-5">
                <div className="flex items-center">
                  <div className="bg-neutral/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-amber-50/2 py-25 min-w-[350px] md:min-w-[400px] rounded-3xl">
                    <h1 className="text-5xl font-bold flex flex-col justify-center items-center text-center">
                      <CountUp start={0} end={300} duration={3} suffix="+" />
                      <p className="max-w-[200px]">Games Displayed</p>
                    </h1>
                  </div>
                </div>
              </div>

              {/* ex-2 */}
              <div className="md:mx-32">
                <div className="flex items-center">
                  <div className="bg-neutral/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-amber-50/2 py-10 min-w-[350px] md:min-w-[400px]  rounded-3xl">
                    <div className="flex items-center mx-10 md:mx-15">
                      <p className="border-2 border-white/10 text-indigo-600 rounded-full p-5 text-5xl">
                        <GoLock />
                      </p>
                      <div className="ml-3 md:ml-6">
                        <h1 className="text-3xl font-bold">Ui/Ux Design</h1>
                        <span>Glow + Hover Effects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* blob */}
              <div className="absolute top-50 w-[420px] h-[420px] md:w-[400px] md:h-[400px] rounded-full z-[-1] bg-[linear-gradient(to_top,#060606_30%,#4f46e5_100%)] "></div>
            </div>

            {/* card-2 */}
            <div className="space-y-5 order-1 md:order-2 mx-5 md:mx-0">
              <p className="text-xl font-semibold text-indigo-600 ">
                About Project
              </p>
              <h1 className="text-5xl font-bold ">
                Empowering Gamers Through
                <p className="text-indigo-600">
                  Data<span className="text-white">&</span>
                  <span className="text-indigo-600">Design</span>
                </p>
              </h1>
              <p className="text-white/50 ">
                <span>" </span>
                <span className="text-indigo-600 font-semibold cursor-pointer">
                  Zeplin<span className="text-white">Game</span>
                </span>{" "}
                " is a web app for exploring and managing video game data via
                the RAWG API. Built with React, TypeScript, and TailwindCSS to
                deliver a sleek, interactive experience.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <GlowWrapper>
                  <div className="flex items-center space-x-5 min-h-[70px]">
                    <p className="bg-indigo-600 p-3 rounded-full text-xl">
                      <FaCode />
                    </p>
                    <h1 className="text-xl font-semibold">Game Discovery</h1>
                  </div>
                  <p className="max-w-[550px] text-md text-white/50">
                    Browse and track games in real-time using the RAWG API.
                    Discover details and mark your favorites easily.
                  </p>
                </GlowWrapper>

                <GlowWrapper>
                  <div className="flex items-center space-x-5 min-h-[70px]">
                    <p className="bg-indigo-600 p-3 rounded-full text-xl">
                      <FaCode />
                    </p>
                    <h1 className="text-xl font-semibold">Interactive UI/UX</h1>
                  </div>
                  <p className="max-w-[550px] text-md text-white/50">
                    Crafted with TailwindCSS and glow effects for a modern,
                    gaming-inspired interface that feels alive.
                  </p>
                </GlowWrapper>

                <div className="bg-indigo-600 px-3 py-4 rounded-full text-center">
                  <button className="h1 text-xl text-white font-semibold cursor-pointer">
                    Read More About Me →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* context */}
          <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-4 gap-8 cursor-pointer mt-15">
            <GlowWrapper>
              <div className="text-center flex flex-col space-y-1 py-2">
                <h1 className="text-3xl md:text-5xl font-bold hover:text-indigo-600 transition-all duration-500">
                  Framework
                </h1>
                <p className="text-white/50 text-lg">React + TypeScript</p>
              </div>
            </GlowWrapper>

            <GlowWrapper>
              <div className="text-center flex flex-col space-y-1  py-2">
                <h1 className="text-3xl md:text-5xl font-bold hover:text-indigo-600 transition-all duration-500">
                  Routing
                </h1>
                <p className="text-white/50 text-lg">React Router DOM</p>
              </div>
            </GlowWrapper>

            <GlowWrapper>
              <div className="text-center flex flex-col space-y-1 py-2">
                <h1 className="text-3xl md:text-5xl font-bold hover:text-indigo-600 transition-all duration-500">
                  Styling
                </h1>
                <p className="text-white/50 text-lg">TailwindCSS</p>
              </div>
            </GlowWrapper>

            <GlowWrapper>
              <div className="text-center flex flex-col space-y-1 py-2">
                <h1 className="text-3xl md:text-5xl font-bold hover:text-indigo-600 transition-all duration-500">
                  Data Fetch
                </h1>
                <p className="text-white/50 text-lg">RAWG API</p>
              </div>
            </GlowWrapper>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};
export default About;
