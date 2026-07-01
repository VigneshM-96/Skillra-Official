import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const AnalyticsTracker = () => {
  const location = useLocation();

  // 1. Initialize Meta Pixel once when the app starts
  useEffect(() => {
    const options = {
      autoConfig: true, // Automatically track pixel configurations
      debug: false,     // Set to true to see logs in the browser console
    };
    
    // Initializes your specific Pixel ID
    ReactPixel.init("979035701444404", null, options);
  }, []);

  // 2. Track page views for BOTH GA4 and Meta Pixel on every route change
  useEffect(() => {
    // Google Analytics 4
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });

    // Meta Pixel
    ReactPixel.pageView();
  }, [location]);

  return null;
};

export default AnalyticsTracker;
