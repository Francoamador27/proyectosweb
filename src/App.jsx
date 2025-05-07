import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import FeatureSection from "../components/FeatureSection.jsx";
import Workflow from "../components/Workflow.jsx";
import Pricing from "../components/Pricing.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";
import ProjectDetail from "../components/ProjectDetail.jsx";
import ScrollToTop from "../components/ScrollTop.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <ScrollToTop />
        <Routes>

          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeatureSection />
                <Workflow />
                <Pricing />
                <Testimonials />
              </>
            }
          />
          <Route path="/proyectos/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
