import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLocationDot, FaPhone } from "react-icons/fa6";

// components
import Container from "../components/Container";
import GlowWrapper from "../components/GlowWrapper";

interface ContactItem {
  id: number;
  title: string;
  name: string;
  icon: React.ReactNode;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const textContact: ContactItem[] = [
    {
      id: 1,
      title: "E-mail:",
      name: "paraphol.puan@bumail.net",
      icon: <MdEmail />,
    },
    {
      id: 2,
      title: "Location:",
      name: "Bang Kapi, Thailand",
      icon: <FaLocationDot />,
    },
    {
      id: 3,
      title: "Contact:",
      name: "088 099 4342",
      icon: <FaPhone />,
    },
    {
      id: 4,
      title: "E-mail:",
      name: "danupol.wung@bumail.net",
      icon: <MdEmail />,
    },
    {
      id: 5,
      title: "Location:",
      name: "Bangkok, Thailand",
      icon: <FaLocationDot />,
    },
    {
      id: 6,
      title: "Contact:",
      name: "094 780 9928",
      icon: <FaPhone />,
    },
  ];

  const isFormValid = Object.values(formData).every((v) => v.trim() !== "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields before submitting!");
      return;
    }

    alert("✅ Your information has been successfully submitted!");
    console.log("Form Data:", formData);

    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <Container>
      <div className="my-10 md:my-30 max-w-[1500px] mx-auto">
        <GlowWrapper>
          <div className="grid md:grid-cols-2 bg-neutral-950 rounded-3xl h-full p-2 md:p-10 gap-10">
            {/* ด้านซ้าย */}
            <div className="flex flex-col justify-center h-full">
              <h1 className="text-5xl font-bold capitalize">
                Get ready to <br className="hidden md:block" /> create great
              </h1>

              <div className="grid md:grid-cols-2">
                <div className="grid grid-rows-3 space-y-5 mt-5">
                  {textContact.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="border-2 border-white/10 rounded-full h-fit w-fit p-3 text-xl">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white/50">{item.title}</div>
                        <div className="font-mono">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-5 mt-5 grid grid-rows-3">
                  {textContact.slice(3, 6).map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="border-2 border-white/10 rounded-full h-fit w-fit p-3 text-xl">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white/50">{item.title}</div>
                        <div className="font-mono">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ด้านขวา */}
            <div>
              <h1 className="text-5xl font-bold uppercase mb-8">
                Get In Touch
              </h1>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-transparent border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-600 transition duration-400"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-transparent border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-600 transition duration-400"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-transparent border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-600 transition duration-400"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="bg-transparent border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-600 transition duration-400"
                  />
                </div>

                {/* Message */}
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="resize-none w-full bg-transparent border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-600 transition duration-400"
                ></textarea>

                {/* Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full rounded-full py-4 text-lg font-semibold transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isFormValid
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Appointment Now →
                </button>
              </form>
            </div>
          </div>
        </GlowWrapper>
      </div>
    </Container>
  );
};

export default Contact;
