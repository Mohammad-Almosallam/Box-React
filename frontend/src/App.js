import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendPackage from "./pages/SendPackage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import Report from "./pages/Report";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sendPackage" element={<SendPackage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
      <ToastContainer />
      <Helmet>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width, height=device-height"
        />
      </Helmet>
    </>
  );
}

export default App;
