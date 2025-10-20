import { FaRegUser, FaRegComments } from "react-icons/fa";
import { motion } from "framer-motion";

// components
import Container from "../components/Container";
import GlowWrapper from "../components/GlowWrapper";

const Blog = () => {
  const details = [
    {
      id: 1,
      date: "12 Oct",
      title: "Behind ZeplinGame How RAWG API Powers Game Discovery",
      author: "Mesbah",
      comments: "Comments (05)",
      image: "/assets/blog-img-1.avif",
    },
    {
      id: 2,
      date: "13 Oct",
      title: "Creating Glow Effects and Hover Animations with TailwindCSS",
      author: "Mesbah",
      comments: "Comments (05)",
      image: "/assets/blog-img-2.avif",
    },
    {
      id: 3,
      date: "16 Oct",
      title: "Using Redux Toolkit for Smooth State Management",
      author: "Mesbah",
      comments: "Comments (05)",
      image: "/assets/blog-img-3.avif",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 600 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Container>
        <div className="max-w-[1440px] mx-5 md:mx-auto">
          {/* header */}
          <div className="space-y-5  mt-20 mb-20">
            <p className="text-xl font-semibold text-indigo-600 uppercase">
              Latest Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">
              Transforming Ideas into
              <br />
              Game-Ready Designs
            </h1>
          </div>

          {/* content */}
          <div className="grid md:grid-cols-3 gap-8">
            {details.map((item) => (
              <GlowWrapper key={item.id} type="card" noPadding>
                <div className="bg-neutral-950 rounded-2xl overflow-hidden group cursor-pointer transition duration-500">
                  {/* image */}
                  <div className="relative w-full h-[300px] overflow-hidden rounded-b-3xl shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="h1 absolute top-0 left-0 bg-neutral-900/60 text-white text-sm font-semibold px-4 py-2 rounded-br-md">
                      {item.date}
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-7 space-y-4">
                    <div className="flex items-center gap-4 text-white/50 text-sm">
                      <div className="flex items-center gap-1">
                        <FaRegUser /> {item.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRegComments /> {item.comments}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold leading-snug group-hover:text-indigo-600 transition duration-300">
                      {item.title}
                    </h2>

                    <button className="border border-white/10 rounded-full px-6 py-2 text-white/70 hover:bg-indigo-600 hover:text-white transition duration-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </GlowWrapper>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Blog;
