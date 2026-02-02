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
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* ================= MENU STRUCTURE ================= */
  const menu: MenuItem[] = [
    { name: "Home", href: "home" },

    {
      name: "About",
      subLinks: [
        { name: "Why Our Work Matters", href: "whyitmatters" },
        { name: "Our Mission", href: "missionstatement" },
        { name: "Our Vision", href: "visionstatement" },
        { name: "Our Story", href: "ourstory" },
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

  /* ================= THEME DETECTION ================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setDarkMode(isDark);

    ["/logo_light.jpg", "/logodark.png"].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ESCAPE KEY & BODY LOCK ================= */
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

  /* ================= SCROLL TO SECTION ================= */
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
    }, 250);
  };

  if (darkMode === null) return null;

  /* ================= DESKTOP ITEM ================= */
  const DesktopMenuItem = ({ item }: { item: MenuItem }) => (
    <div className="relative group">
      {item.subLinks ? (
        <>
          <button className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center gap-1 transition-colors">
            {item.name}
            <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border dark:border-gray-700">
            {item.subLinks.map((sub) => (
              <button
                key={sub.name}
                onClick={() => handleScrollTo(sub.href)}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {sub.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button
          onClick={() => handleScrollTo(item.href!)}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
        >
          {item.name}
        </button>
      )}
    </div>
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur"
          : "bg-white dark:bg-gray-900 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "min-h-[4.5rem]" : "min-h-[6rem]"}`}>
          
          {/* LOGO */}
          <button onClick={() => handleScrollTo("home")} className="relative">
            <img
              src="/logo_light.jpg"
              alt="Generous Helping Hands"
              className={`h-14 transition-opacity ${darkMode ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src="/logodark.png"
              alt="Generous Helping Hands"
              className={`absolute top-0 left-0 h-14 transition-opacity ${darkMode ? "opacity-100" : "opacity-0"}`}
            />
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1">
            {menu.map((item) => (
              <DesktopMenuItem key={item.name} item={item} />
            ))}

            <button
              onClick={() => handleScrollTo("donation")}
              className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Donate Now
            </button>

            <button onClick={toggleDarkMode} className="ml-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-xl">
          <div className="px-4 py-4 space-y-2">
            {menu.map((item) => (
              <div key={item.name}>
                {item.subLinks ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full flex justify-between py-3 font-medium"
                    >
                      {item.name}
                    </button>
                    {openDropdown === item.name &&
                      item.subLinks.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => handleScrollTo(sub.href)}
                          className="block w-full text-left pl-4 py-2 text-sm"
                        >
                          {sub.name}
                        </button>
                      ))}
                  </>
                ) : (
                  <button onClick={() => handleScrollTo(item.href!)} className="block w-full text-left py-3 font-medium">
                    {item.name}
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => handleScrollTo("donation")}
              className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
            >
              Donate Now
            </button>

            <button onClick={toggleDarkMode} className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
