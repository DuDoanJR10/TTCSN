import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const DefaultLayout = React.lazy(() => import('./layouts/views/DefaultLayout'));

function App() {
  return (
    <div className="App min-h-screen overflow-hidden">
      <Router>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
          <Route path="*" element={<h1>Page 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
