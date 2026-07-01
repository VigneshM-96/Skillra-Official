import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage      from "./Pages/HomePage";
import AboutUsPage   from "./Pages/AboutUsPage";
import CoursesPage   from "./Pages/CoursesPage";
import ContactPage    from "./Pages/ContactPage";
import CampusPage     from "./Pages/CampusPage";
import PlacementPage  from "./Pages/PlacementPage";
import CareerPage     from "./Pages/CareerPage";
import BooksPage     from "./Pages/BooksPage";
import BlogPage     from "./Pages/BlogPage";
import GalleryPage     from "./Pages/GalleryPage";
import NavBar from "./Pages/NavBar";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./AnalyticsTracker";
import { PromoBannerController } from "./components/PromoBanner";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  const [showPromo, setShowPromo] = useState(false);
  const [hasShownFirst, setHasShownFirst] = useState(false);

  useEffect(() => {
    if (showPromo) return;

    // First time = 7s, after that = 40s
    const delay = hasShownFirst ? 40000 : 7000;

    const timer = setTimeout(() => {
      setShowPromo(true);
      setHasShownFirst(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [showPromo, hasShownFirst]);

  return (
    <HelmetProvider>
    <BrowserRouter>
      <AnalyticsTracker />
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/about-us"     element={<AboutUsPage />} />
        <Route path="/courses/:courseId" element={<CoursesPage />} />
        <Route path="/courses"           element={<CoursesPage />} />
        <Route path="/contact-us"    element={<ContactPage />} />
        <Route path="/campus"     element={<CampusPage />} />
        <Route path="/placement"  element={<PlacementPage />} />
        <Route path="/career"     element={<CareerPage />} />
        <Route path="/books"     element={<BooksPage />} />
        <Route path="/blog/:slug?" element={<BlogPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <ChatBot />

      {/* Promo popup — shows on all pages */}
      <PromoBannerController />
    </BrowserRouter>
    </HelmetProvider>
  );
}