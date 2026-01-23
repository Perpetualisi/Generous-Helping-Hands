import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Programs from "./Components/Programs";
import GetInvolved from "./Components/GetInvolved";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import "./index.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-500">
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md hover:opacity-90 transition"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Your Components */}
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <GetInvolved />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
