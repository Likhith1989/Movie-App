import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchResults from "./components/SearchResults";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/SearchResults/:term" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
