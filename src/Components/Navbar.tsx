import React, { useState, useEffect, useRef } from "react";

interface MenuItem {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean | null>(null); // null until theme detected
  const navRef = useRef<HTMLElement>(null);

  const menu: MenuItem[] = [
    { name: "Home", href: "home" },
    {
      name: "About",
      subLinks: [
        { name: "Mission Statement", href: "missionstatement" },
        { name: "Vision Statement", href: "visionstatement" },
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
        { name: "Donation", href: "donation" },
      ],
    },
    { name: "Testimonials", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ];

  // Detect and apply saved theme or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setDarkMode(isDark);

    // Preload logos
    ["/logo_light.jpg", "/logodark.png"].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Navbar scroll shrink effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    setIsOpen(false);
    setOpenDropdown(null);
    setTimeout(() => {
      const navbarHeight = navRef.current?.getBoundingClientRect().height || 80;
      window.scrollTo({
        top: section.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }, 300);
  };

  // Prevent rendering until theme is determined
  if (darkMode === null) return null;

  const DesktopMenuItem = ({ item }: { item: MenuItem }) => (
    <div className="relative group">
      {item.subLinks ? (
        <>
          <button className="px-3 lg:px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center gap-1 text-sm lg:text-base">
            {item.name}
            <svg
              className="w-3 h-3 lg:w-4 lg:h-4 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute left-0 mt-2 w-52 lg:w-56 bg-white dark:bg-gray-800 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border border-gray-100 dark:border-gray-700 z-50">
            <div className="py-2">
              {item.subLinks.map((sub, index) => (
                <button
                  key={sub.name}
                  onClick={() => handleScrollTo(sub.href!)}
                  className={`block px-4 py-2.5 lg:py-3 text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 w-full text-left transition-colors ${
                    index !== 0 ? "border-t border-gray-100 dark:border-gray-700" : ""
                  }`}
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
          className="px-3 lg:px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 text-sm lg:text-base"
        >
          {item.name}
        </button>
      )}
    </div>
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm" : "bg-white dark:bg-gray-900 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? "min-h-[4rem] sm:min-h-[4.5rem]" : "min-h-[5rem] sm:min-h-[6rem] lg:min-h-[7rem]"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("home");
            }}
            className="relative flex items-center flex-shrink-0"
          >
            <div
              className={`relative transition-all duration-500 ${
                scrolled ? "h-12 sm:h-14 lg:h-16" : "h-14 sm:h-16 lg:h-20 xl:h-24"
              }`}
            >
              <img
                src="/logo_light.jpg"
                alt="Generous Helping Hands"
                className={`h-full w-auto transition-opacity duration-500 ${darkMode ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src="/logodark.png"
                alt="Generous Helping Hands"
                className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-500 ${darkMode ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menu.map((item) => (
              <DesktopMenuItem key={item.name} item={item} />
            ))}
            <button
              onClick={() => handleScrollTo("donation")}
              className="ml-4 px-5 lg:px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm lg:text-base"
            >
              Donate
            </button>
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-all duration-500"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/30" style={{ top: navRef.current?.getBoundingClientRect().height || 80 }} onClick={() => setIsOpen(false)} />}

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl transition-all duration-500 overflow-y-auto ${
          isOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ top: navRef.current?.getBoundingClientRect().height || 80 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          {menu.map((item) => (
            <div key={item.name}>
              {item.subLinks ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className="w-full flex justify-between items-center px-4 py-3 font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
                  >
                    <span>{item.name}</span>
                    <svg className={`w-5 h-5 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openDropdown === item.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 mt-1 space-y-1">
                      {item.subLinks.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => handleScrollTo(sub.href!)}
                          className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 w-full text-left transition-colors rounded-lg"
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
                  className="block px-4 py-3 font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 w-full text-left rounded-lg transition-colors"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}

          {/* Mobile buttons */}
          <div className="pt-4 space-y-2">
            <button onClick={() => handleScrollTo("donation")} className="block w-full px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-semibold text-center">
              Donate Now
            </button>
            <button onClick={toggleDarkMode} className="block w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg transition-all duration-500 text-center font-semibold">
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
