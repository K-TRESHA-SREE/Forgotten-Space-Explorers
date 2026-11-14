import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Starfield } from "./components/Starfield";
import { Footer, Navbar } from "./components/Layout";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Story from "./pages/Story";
import GalleryPage from "./pages/GalleryPage";
import About from "./pages/About";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:id" element={<Destination />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Starfield />
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  );
}
