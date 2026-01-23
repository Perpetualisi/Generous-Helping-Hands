import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Share2, Heart } from "lucide-react";

interface QuickLink {
  id: string;
  label: string;
}

const Footer: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Watch for dark class changes on <html>
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode(); // initial check

    // Optional: listen to storage changes if user toggles dark mode from another tab
    const listener = () => checkDarkMode();
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const navbarHeight = 90;
    window.scrollTo({
      top: section.offsetTop - navbarHeight,
      behavior: "smooth",
    });
  };

  const quickLinks: QuickLink[] = [
    { id: "home", label: "Home" },
    { id: "ourprograms", label: "Our Programs" },
    { id: "events", label: "Events" },
    { id: "volunteer", label: "Volunteer" },
    { id: "donation", label: "Donation" },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 pt-12 sm:pt-16 pb-6 sm:pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={isDark ? "/logodark.png" : "/logo_light.jpg"}
              alt="Generous Helping Hands"
              className="h-16 sm:h-20 mb-3 sm:mb-4 transition-all duration-300"
            />
            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-xs">
              Empowering women and girls through education, health, and opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+2349036854354"
                  className="hover:text-green-600 dark:hover:text-green-300 transition-colors break-all"
                >
                  +234 903 685 4354
                </a>
              </li>

              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:Giversgenerous@gmail.com"
                  className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors break-all"
                >
                  Giversgenerous@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2 sm:gap-3">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://instagram.com/generoushelpinghands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors break-all"
                >
                  @GenerousHelpingHands
                </a>
              </li>

              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Support Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">
              Your support helps us create lasting impact for women and girls.
            </p>

            <button
              onClick={() => scrollToSection("donation")}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold shadow-md text-sm sm:text-base"
            >
              Donate Now
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} Generous Helping Hands. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 dark:text-red-400 fill-current" />
            <span>for humanity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
