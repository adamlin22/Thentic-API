import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MintPage from "./pages/Mint";
import HomePage from "./pages/Home";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mint" element={<MintPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
