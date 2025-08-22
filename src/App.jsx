import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import GymEquipment from "./components/GymEquipment";
import DietSection from "./components/DietSection";
import Contact from "./components/Contact";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  // initial Route بيتبدل حسب حاله ال توكن
  const [initialRoute, setInitialRoute] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const authTokens = localStorage.getItem("authTokens");
    const accessToken = authTokens ? JSON.parse(authTokens).access : null;

    if (!accessToken) {
      setInitialRoute("/login");
      setIsCheckingToken(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const isExpired = decodedToken.exp < Date.now() / 1000;
      if (isExpired) {
        console.log("Token is expired, Redirecting to login.");
        localStorage.removeItem("authTokens");
        setInitialRoute("/login"); // التوكن منتهي، الوجهة هي /login
      } else {
        console.log("Token is valid, Redirecting to Landing.");
        setInitialRoute("/Landing"); // التوكن فعال، الوجهة هي /Landing
      }
    } catch (error) {
      console.error(
        "Token is invalid or corrupted, Redirecting to login.",
        error
      );
      localStorage.removeItem("authTokens");
      setInitialRoute("/login");
    } finally {
      setIsCheckingToken(false);
    }
  }, []);

  // إذا كانت الحالة لا تزال تتحقق من التوكن، لا تعرض أي شيء أو اعرض شاشة تحميل
  if (isCheckingToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2em",
        }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* توجيه المسار الرئيسي بناءً على initialRoute */}
          {/* replace تقوم باستبدال الإدخال الحالي في سجل المتصفح (browser history stack) بالمسار الجديد الذي يتم التوجيه إليه، بدلاً من إضافة إدخال جديد. */}
          {initialRoute && (
            <Route path="/" element={<Navigate to={initialRoute} replace />} />
          )}

          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/Landing" element={<Landing />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/GymEquipment" element={<GymEquipment />} />
            <Route path="/DietSection" element={<DietSection />} />
            <Route path="/Contact" element={<Contact />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
