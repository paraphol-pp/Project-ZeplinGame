import { Outlet } from "react-router-dom";

//component
import Navbar from "./components/Navbar";

export default function App() {
  return (
    // theme cupcake DaisyUI
    <div data-theme="cupcake" className="min-h-screen bg-base-200">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="footer footer-center p-6 bg-base-100 text-base-content mt-10">
        <aside>
          <p>© {new Date().getFullYear()} MovieNow — Teaching</p>
        </aside>
      </footer>
      
    </div>
  );
}