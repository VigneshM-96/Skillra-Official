import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage      from "./Pages/HomePage";
import AboutUsPage   from "./Pages/AboutUsPage";
import CoursesPage   from "./Pages/CoursesPage";
import ServicesPage  from "./Pages/ServicesPage";
import ContactPage    from "./Pages/ContactPage";
import CampusPage     from "./Pages/CampusPage";
import PlacementPage  from "./Pages/PlacementPage";
import CareerPage     from "./Pages/CareerPage";
// Add more page imports here as you build them:

// import ELearningsPage from "./ELearningsPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/about"     element={<AboutUsPage />} />
        <Route path="/courses"   element={<CoursesPage />} />
        <Route path="/services"  element={<ServicesPage />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="/campus"     element={<CampusPage />} />
        <Route path="/placement"  element={<PlacementPage />} />
        <Route path="/career"     element={<CareerPage />} />
        {/* Uncomment each route as you build the page:
        
        <Route path="/elearnings" element={<ELearningsPage />} />
        */}

        {/* Catch-all — redirects unknown URLs back to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}