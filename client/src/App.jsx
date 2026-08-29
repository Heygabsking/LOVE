import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Preview from "./pages/Preview";
import PublicSurprise from "./pages/PublicSurprise";
import OfflineBanner from "./components/OfflineBanner";

import "./App.css";

function PageLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let startTimer;
    let endTimer;

    // Defer state update to next tick to avoid synchronous cascading renders warning
    startTimer = setTimeout(() => {
      setLoading(true);
      endTimer = setTimeout(() => {
        setLoading(false);
      }, 550); // Simulated "thinking" delay to show tab-like loader
    }, 0);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="page-loader-overlay">
          <div className="page-loader-spinner">
            <div className="loader-heart-icon">
              <Heart size={36} fill="currentColor" />
            </div>
            <div className="loader-ring"></div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <OfflineBanner />
      <PageLoader>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/create"
            element={<Create />}
          />

          <Route
            path="/preview"
            element={<Preview />}
          />
          <Route
            path="/surprise/:id"
            element={<PublicSurprise />}
          />

        </Routes>
      </PageLoader>
    </BrowserRouter>
  );
}

export default App;