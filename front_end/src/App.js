import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
import { useSelector } from "react-redux";
import VerificationPage from "scenes/loginPage/VerificationPage";


function App() {

  return (
    <div className="app">
        <BrowserRouter>     
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/verification" element={<VerificationPage />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
