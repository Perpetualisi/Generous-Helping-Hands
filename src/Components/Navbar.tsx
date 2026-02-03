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

const NAVBAR_HEIGHTS = {
  scrolled: 64, // h-16 = 64px
  default: 80,  // h-20 = 80px (reduced from 96px for mobile)
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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
};

// ------------------ REUSABLE COMPONENTS ------------------

// Logo Component
const Logo: React.FC<{ darkMode: boolean; onClick: () => void }> = ({ darkMode, onClick }) => (
  <button 
    onClick={onClick} 
    className="relative h-10 w-36 md:h-14 md:w-48 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
    aria-label="Go to home"
  >
    <img
      src="/logo_light.jpg"
      alt="Generous Helping Hands Foundation Logo"
      className={`absolute inset-0 h-10 md:h-14 w-auto object-contain transition-opacity duration-300 ${
        darkMode ? "opacity-0" : "opacity-100"
      }`}
    />
    <img
      src="/logodark.png"
      alt="Generous Helping Hands Foundation Logo"
      className={`absolute inset-0 h-10 md:h-14 w-auto object-contain transition-opacity duration-300 ${
        darkMode ? "opacity-100" : "opacity-0"
      }`}
    />
  </button>
);

// Desktop Menu Item Component
const DesktopMenuItem: React.FC<{
  item: MenuItem;
  onNavigate: (href: string) => void;
}> = ({ item, onNavigate }) => {
  if (item.subLinks) {
    return (
      <div className="relative group">
        <button 
          className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold flex items-center gap-1 transition-colors focus:outline-none focus:text-blue-600"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {item.name}
          <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" aria-hidden="true" />
        </button>
        <div 
          className="absolute left-0 mt-0 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          role="menu"
        >
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => onNavigate(sub.href)}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:bg-blue-50"
                role="menuitem"
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
      className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors focus:outline-none focus:text-blue-600"
    >
      {item.name}
    </button>
  );
};

// Mobile Menu Item Component
const MobileMenuItem: React.FC<{
  item: MenuItem;
  openDropdown: string | null;
  onToggleDropdown: (name: string) => void;
  onNavigate: (href: string) => void;
}> = ({ item, openDropdown, onToggleDropdown, onNavigate }) => {
  if (item.subLinks) {
    const isOpen = openDropdown === item.name;

    return (
      <div>
        <button
          onClick={() => onToggleDropdown(item.name)}
          className="w-full flex justify-between items-center py-3 font-semibold text-gray-900 dark:text-white focus:outline-none focus:text-blue-600"
          aria-expanded={isOpen}
          aria-controls={`mobile-submenu-${item.name}`}
        >
          {item.name}
          <ChevronDown 
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} 
            aria-hidden="true"
          />
        </button>
        <div 
          id={`mobile-submenu-${item.name}`}
          className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-64 pb-2" : "max-h-0"
          }`}
        >
          {item.subLinks.map((sub) => (
            <button
              key={sub.href}
              onClick={() => onNavigate(sub.href)}
              className="block w-full text-left py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600"
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
      className="block w-full text-left py-3 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600"
    >
      {item.name}
    </button>
  );
};

// Theme Toggle Button Component
const ThemeToggle: React.FC<{
  darkMode: boolean;
  onClick: () => void;
  variant?: "desktop" | "mobile";
}> = ({ darkMode, onClick, variant = "desktop" }) => {
  if (variant === "mobile") {
    return (
      <button 
        onClick={onClick} 
        className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <>
            <Sun size={18} aria-hidden="true" /> Light Mode
          </>
        ) : (
          <>
            <Moon size={18} aria-hidden="true" /> Dark Mode
          </>
        )}
      </button>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className="mx-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// Donate Button Component
const DonateButton: React.FC<{
  onClick: () => void;
  variant?: "desktop" | "mobile";
}> = ({ onClick, variant = "desktop" }) => {
  const baseClasses = "font-bold transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  
  if (variant === "mobile") {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-lg shadow-blue-500/30 justify-center`}
      >
        <Heart size={20} fill="currentColor" aria-hidden="true" />
        Donate Now
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ml-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full text-sm shadow-md hover:shadow-blue-500/40`}
    >
      <Heart size={16} fill="currentColor" aria-hidden="true" />
      Donate
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
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

  const handleScrollTo = useCallback((id: string) => {
    setIsOpen(false);
    setOpenDropdown(null);

    setTimeout(() => {
      const section = document.getElementById(id);
      if (!section) return;

      // Get actual navbar height, add extra padding for mobile
      const navbarHeight = navRef.current?.offsetHeight || NAVBAR_HEIGHTS.scrolled;
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const extraOffset = isMobile ? 80 : 0; // Extra space on mobile to account for menu animation
      
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight - extraOffset;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }, isOpen ? 350 : 100); // Longer delay if menu is open
  }, [isOpen]);

  const handleToggleDropdown = useCallback((name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  }, []);

  if (darkMode === null) {
    // Render placeholder to prevent layout shift
    return (
      <nav className="fixed top-0 w-full z-50 h-20 md:h-24 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
          <div className="h-10 w-36 md:h-14 md:w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md"
          : "bg-white dark:bg-gray-900 shadow-md"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div 
          className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? "h-16" : "h-20 md:h-24"
          }`}
        >
          {/* LOGO */}
          <Logo darkMode={darkMode} onClick={() => handleScrollTo("home")} />

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1">
            {MENU_ITEMS.map((item) => (
              <DesktopMenuItem 
                key={item.name} 
                item={item} 
                onNavigate={handleScrollTo} 
              />
            ))}

            <ThemeToggle darkMode={darkMode} onClick={toggleDarkMode} />
            <DonateButton onClick={() => handleScrollTo("donation")} />
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div 
        id="mobile-menu"
        className={`lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {MENU_ITEMS.map((item) => (
            <MobileMenuItem
              key={item.name}
              item={item}
              openDropdown={openDropdown}
              onToggleDropdown={handleToggleDropdown}
              onNavigate={handleScrollTo}
            />
          ))}
          
          <div className="pt-6 border-t dark:border-gray-800 space-y-4">
            <ThemeToggle darkMode={darkMode} onClick={toggleDarkMode} variant="mobile" />
            <DonateButton onClick={() => handleScrollTo("donation")} variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;