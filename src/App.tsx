import { Outlet, useLocation  } from "react-router-dom";
import { useEffect } from "react";
//component
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Hero from "./components/Hero";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll ขึ้นบนสุดทุกครั้งที่เปลี่ยนหน้า
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Navbar />
      {location.pathname === "/" && <Hero/>}
      <div className="py-15">
        <Container>
          <Outlet />
        </Container>
      </div>

    </>
  );
}
