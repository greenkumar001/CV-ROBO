import { useEffect, useState } from "react";
import "../../styles/Splash.css";

const SplashScreen = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show the text after a delay
    const timer = setTimeout(() => {
      setShowText(true);
    }, 9000); // Delay before showing the text

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className="splash-screen relative flex h-screen items-center justify-center overflow-hidden bg-black">
      {/* Smoke Effect */}
      <div className="smoke"></div>

      {/* CVROBO Text */}
      {showText && (
        <h1 className="typewriter text text-green-400">
          Welcome to <span>CVROBO</span>
        </h1>
      )}
    </div>
  );
};

export default SplashScreen;
