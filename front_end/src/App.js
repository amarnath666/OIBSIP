import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {

  return (
    <div className="app">
        <BrowserRouter>     
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
