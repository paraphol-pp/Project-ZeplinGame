import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

//Component
import App from "./App";
import Home from "./routes/Home";
import GameDetail from "./components/GameDetail";
import Favorites from "./routes/Favorites";
import About from "./routes/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,
        element: <Home /> 
      },
      { path: "game/:id",
        element: <GameDetail />
      },
      { path: "favorites",
        element: <Favorites />
      },
      { path: "about",
        element: <About />
      },
      { path: "blog",
        element: <Blog />
      },
      { path: "contact",
        element: <Contact />
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
