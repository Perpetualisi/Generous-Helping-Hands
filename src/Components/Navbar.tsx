import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Sun, Moon, ChevronDown, Heart } from "lucide-react";

interface SubLink {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href?: string;
  subLinks?: SubLink[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const menu: MenuItem[] = [
    { name: "Home", href: "home" },
    {
      name: "About",
      subLinks: [
        { name: "Why Our Work Matters", href: "whyitmatters" },
        { name: "Our Story", href: "ourstory" },
        { name: "Our Mission", href: "missionstatement" },
        { name: "Our Vision", href: "visionstatement" },
        { name: "Meet the Team", href: "meettheteam" },
      ],
    },
    {
      name: "Programs",
      subLinks: [
        { name: "Our Programs", href: "ourprograms" },
        { name: "Events", href: "events" },
      ],
    },
    {
      name: "Get Involved",
      subLinks: [
        { name: "Volunteer", href: "volunteer" },
        { name: "Donate", href: "donation" },
      ],
    },
    { name: "Testimonials", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ];

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const isDark = !prev;
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
      return isDark;
    });
  }, []);

  // Scroll listener with throttling
  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth scroll to section
  const handleScrollTo = useCallback((id: string) => {
    // Close mobile menu
    setIsOpen(false);
    setOpenDropdown(null);

    const section = document.getElementById(id);
    if (!section) {
      console.warn(`Section with id "${id}" not found`);
      return;
    }

    // Use setTimeout to allow menu close animation
    setTimeout(() => {
      const navbarHeight = navRef.current?.offsetHeight || 80;
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = sectionPosition - navbarHeight - 20; // Extra 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Loading state
  if (darkMode === null) {
    return (
      <nav className="fixed top-0 w-full z-50 h-24 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center">
          <div className="h-14 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm"
          : "bg-white dark:bg-gray-900 shadow-md"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? "h-16" : "h-24"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleScrollTo("home")}
            className="relative h-14 w-48 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg"
            aria-label="Go to home"
          >
            <img
              src="/logo_light.jpg"
              alt="Organization Logo"
              className={`absolute inset-0 h-14 w-auto object-contain transition-opacity duration-300 ${
                darkMode ? "opacity-0" : "opacity-100"
              }`}
              loading="eager"
            />
            <img
              src="/logodark.png"
              alt="Organization Logo"
              className={`absolute inset-0 h-14 w-auto object-contain transition-opacity duration-300 ${
                darkMode ? "opacity-100" : "opacity-0"
              }`}
              loading="eager"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menu.map((item) => (
              <div key={item.name} className="relative group">
                {item.subLinks ? (
                  <>
                    <button
                      className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.name}
                      <ChevronDown
                        className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </button>
                    <div className="absolute left-0 mt-0 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-focus-within:opacity-100 group-focus-within:visible">
                      <div
                        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                        role="menu"
                      >
                        {item.subLinks.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={() => handleScrollTo(sub.href)}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700"
                            role="menuitem"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleScrollTo(item.href!)}
                    className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={toggleDarkMode}
              className="mx-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => handleScrollTo("donation")}
              className="ml-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:shadow-blue-500/40 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <Heart size={16} fill="currentColor" />
              Donate
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {menu.map((item) => (
            <div key={item.name}>
              {item.subLinks ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className="w-full flex justify-between items-center py-3 font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2"
                    aria-expanded={openDropdown === item.name}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name ? "max-h-64 pb-2" : "max-h-0"
                    }`}
                  >
                    {item.subLinks.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => handleScrollTo(sub.href)}
                        className="block w-full text-left py-2.5 px-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => handleScrollTo(item.href!)}
                  className="block w-full text-left py-3 px-2 font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
          <div className="pt-6 border-t dark:border-gray-800 space-y-4">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <>
                  <Sun size={18} /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} /> Dark Mode
                </>
              )}
            </button>
            <button
              onClick={() => handleScrollTo("donation")}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex justify-center items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <Heart size={20} fill="currentColor" />
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;