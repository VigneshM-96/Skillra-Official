import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Pages/NavBar";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./AnalyticsTracker";
import { PromoBannerController } from "./components/PromoBanner";
import { HelmetProvider } from "react-helmet-async";

// Lazy-load every page — each becomes its own JS chunk,
// only downloaded when the user actually visits that route.
const HomePage      = lazy(() => import("./Pages/HomePage"));
const AboutUsPage   = lazy(() => import("./Pages/AboutUsPage"));
const CoursesPage   = lazy(() => import("./Pages/CoursesPage"));
const ContactPage   = lazy(() => import("./Pages/ContactPage"));
const CampusPage    = lazy(() => import("./Pages/CampusPage"));
const PlacementPage = lazy(() => import("./Pages/PlacementPage"));
const CareerPage    = lazy(() => import("./Pages/CareerPage"));
const BooksPage     = lazy(() => import("./Pages/BooksPage"));
const BlogPage      = lazy(() => import("./Pages/BlogPage"));
const GalleryPage   = lazy(() => import("./Pages/GalleryPage"));
const OurProductsPage = lazy(() => import("./Pages/OurProducts"));

// Simple fallback shown while a page chunk is downloading.
// Keep this lightweight — no heavy CSS/images — since it
// affects perceived load time too.
function PageLoader() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      Loading...
    </div>
  );
}

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
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/our-products" element={<OurProductsPage />} /> 
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
      <ChatBot />

      {/* Promo popup — shows on all pages */}
      <PromoBannerController />
    </BrowserRouter>
    </HelmetProvider>
  );
}