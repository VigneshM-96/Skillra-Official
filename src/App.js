import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage      from "./Pages/HomePage";
import AboutUsPage   from "./Pages/AboutUsPage";
import CoursesPage   from "./Pages/CoursesPage";
import ContactPage    from "./Pages/ContactPage";
import CampusPage     from "./Pages/CampusPage";
import PlacementPage  from "./Pages/PlacementPage";
import CareerPage     from "./Pages/CareerPage";
import BooksPage     from "./Pages/BooksPage";
import NavBar from "./Pages/NavBar";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
// Add more page imports here as you build them:

// import ELearningsPage from "./ELearningsPage";


export default function App() {
  return (
    <BrowserRouter basename="/Skillra-Official">
      <ScrollToTop />
       <NavBar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/about"     element={<AboutUsPage />} />
        <Route path="/courses/:courseId" element={<CoursesPage />} />
        <Route path="/courses"           element={<CoursesPage />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="/campus"     element={<CampusPage />} />
        <Route path="/placement"  element={<PlacementPage />} />
        <Route path="/career"     element={<CareerPage />} />
        <Route path="/books"     element={<BooksPage />} />
        {/* Uncomment each route as you build the page:
        
        <Route path="/elearnings" element={<ELearningsPage />} />
        */}
        {/*Hello*/}
        {/* Catch-all — redirects unknown URLs back to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
       <ChatBot />
    </BrowserRouter>
  );
}