import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Sun, Moon, ChevronDown, Heart } from "lucide-react";

// ------------------ TYPES ------------------
interface SubLink {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href?: string;
  subLinks?: SubLink[];
}

// ------------------ DATA ------------------
const MENU_ITEMS: MenuItem[] = [
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

// Optimized heights for mobile and desktop
const NAVBAR_HEIGHTS = {
  scrolled: 64, // h-16
  mobileDefault: 64, 
  desktopDefault: 80,
};

// ------------------ HOOKS ------------------
const useTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  }, []);

  return { darkMode, toggleDarkMode };
};

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
};

// ------------------ REUSABLE COMPONENTS ------------------

const Logo: React.FC<{ darkMode: boolean; onClick: () => void }> = ({ darkMode, onClick }) => (
  <button 
    onClick={onClick} 
    className="relative h-10 w-32 md:h-12 md:w-40 flex-shrink-0 focus:outline-none"
    aria-label="Go to home"
  >
    <img
      src="/logo_light.jpg"
      alt="Logo"
      className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-300 ${
        darkMode ? "opacity-0" : "opacity-100"
      }`}
    />
    <img
      src="/logodark.png"
      alt="Logo"
      className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-300 ${
        darkMode ? "opacity-100" : "opacity-0"
      }`}
    />
  </button>
);

const DesktopMenuItem: React.FC<{
  item: MenuItem;
  onNavigate: (href: string) => void;
}> = ({ item, onNavigate }) => {
  if (item.subLinks) {
    return (
      <div className="relative group">
        <button 
          className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold flex items-center gap-1 transition-colors"
        >
          {item.name}
          <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
        </button>
        <div className="absolute left-0 mt-0 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => onNavigate(sub.href)}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onNavigate(item.href!)}
      className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 font-semibold transition-colors"
    >
      {item.name}
    </button>
  );
};

const MobileMenuItem: React.FC<{
  item: MenuItem;
  openDropdown: string | null;
  onToggleDropdown: (name: string) => void;
  onNavigate: (href: string) => void;
}> = ({ item, openDropdown, onToggleDropdown, onNavigate }) => {
  if (item.subLinks) {
    const isOpen = openDropdown === item.name;

    return (
      <div className="border-b border-gray-50 dark:border-gray-800/50 last:border-none">
        <button
          onClick={() => onToggleDropdown(item.name)}
          className="w-full flex justify-between items-center py-4 font-semibold text-gray-900 dark:text-white"
        >
          {item.name}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64 pb-4" : "max-h-0"}`}>
          {item.subLinks.map((sub) => (
            <button
              key={sub.href}
              onClick={() => onNavigate(sub.href)}
              className="block w-full text-left py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onNavigate(item.href!)}
      className="block w-full text-left py-4 font-semibold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-800/50 last:border-none"
    >
      {item.name}
    </button>
  );
};

const ThemeToggle: React.FC<{ darkMode: boolean; onClick: () => void; variant?: "desktop" | "mobile" }> = ({ darkMode, onClick, variant = "desktop" }) => {
  if (variant === "mobile") {
    return (
      <button onClick={onClick} className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium">
        {darkMode ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
      </button>
    );
  }
  return (
    <button onClick={onClick} className="mx-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const DonateButton: React.FC<{ onClick: () => void; variant?: "desktop" | "mobile" }> = ({ onClick, variant = "desktop" }) => {
  if (variant === "mobile") {
    return (
      <button onClick={onClick} className="w-full px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
        <Heart size={18} fill="currentColor" /> Donate Now
      </button>
    );
  }
  return (
    <button onClick={onClick} className="ml-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-sm flex items-center gap-2 shadow-md">
      <Heart size={14} fill="currentColor" /> Donate
    </button>
  );
};

// ------------------ MAIN COMPONENT ------------------
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
  const { darkMode, toggleDarkMode } = useTheme();
  const scrolled = useScrolled();

  const handleScrollTo = useCallback((id: string) => {
    setIsOpen(false);
    setOpenDropdown(null);

    // Give the menu time to close before calculating position
    setTimeout(() => {
      const section = document.getElementById(id);
      if (!section) return;

      const navbarHeight = navRef.current?.offsetHeight || 64;
      // We subtract the navbar height to ensure the section starts right below the nav
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }, 300);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (darkMode === null) return <div className="h-16 w-full bg-white dark:bg-gray-900 fixed top-0 z-50 shadow-sm" />;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md h-16" : "bg-white dark:bg-gray-900 shadow-md h-16 lg:h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
        <Logo darkMode={darkMode} onClick={() => handleScrollTo("home")} />

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {MENU_ITEMS.map((item) => (
            <DesktopMenuItem key={item.name} item={item} onNavigate={handleScrollTo} />
          ))}
          <ThemeToggle darkMode={darkMode} onClick={toggleDarkMode} />
          <DonateButton onClick={() => handleScrollTo("donation")} />
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-600 dark:text-gray-300 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Improved with better z-index and spacing */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ height: isOpen ? 'calc(100vh - 64px)' : '0' }}
      >
        <div className="px-6 py-4 flex flex-col h-full overflow-y-auto">
          <div className="flex-1">
            {MENU_ITEMS.map((item) => (
              <MobileMenuItem
                key={item.name}
                item={item}
                openDropdown={openDropdown}
                onToggleDropdown={(name) => setOpenDropdown(openDropdown === name ? null : name)}
                onNavigate={handleScrollTo}
              />
            ))}
          </div>
          
          <div className="py-6 space-y-4 border-t dark:border-gray-800 mt-auto">
            <ThemeToggle darkMode={darkMode} onClick={toggleDarkMode} variant="mobile" />
            <DonateButton onClick={() => handleScrollTo("donation")} variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;