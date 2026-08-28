import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Preview from "./pages/Preview";
import PublicSurprise from "./pages/PublicSurprise";


import "./App.css";

function App() {
  return (
    <BrowserRouter>

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

    </BrowserRouter>
  );
}

export default App;