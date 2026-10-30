import {
  Routes,
  Route
} from "react-router-dom";

import {
  lazy,
  Suspense
} from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyRegistrations from "./pages/MyRegistrations";

import { useTheme } from "./context/ThemeContext";

const Gallery = lazy(() => import("./pages/Gallery"));

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<Registration />} />

        <Route
          path="/gallery"
          element={
            <Suspense fallback={<p>Loading gallery...</p>}>
              <Gallery />
            </Suspense>
          }
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/my-registrations"
          element={<MyRegistrations />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;