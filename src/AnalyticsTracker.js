import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const AnalyticsTracker = () => {
  const location = useLocation();

  // 1. Initialize Meta Pixel once the browser is idle, not on first render
  useEffect(() => {
    const options = {
      autoConfig: true,
      debug: false,
    };
    const init = () => ReactPixel.init("979035701444404", null, options);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(init, 2000);
      return () => clearTimeout(t);
    }
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
