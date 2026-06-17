import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    console.log("Current URL:", window.location.href);

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Token:", token);
    if (token) {
      login(null, token);
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  }, []);
  return (
    <div
      className="min-h-screen flex
      items-center justify-center"
    >
      <p className="text-gray-500">Logging you in...</p>
    </div>
  );
};

export default GoogleSuccess;
