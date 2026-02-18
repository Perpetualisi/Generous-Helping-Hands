import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Heart, ArrowUpRight, Sparkles } from "lucide-react";

interface QuickLink {
  id: string;
  label: string;
}

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const navbarHeight = 80;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const quickLinks: QuickLink[] = [
    { id: "home", label: "Home" },
    { id: "ourprograms", label: "Our Programs" },
    { id: "volunteer", label: "Volunteer" },
    { id: "donation", label: "Donation" },
    { id: "testimonials", label: "Testimonials" },
  ];

  return (
    <footer className="relative bg-[#0A0908] text-white pt-24 pb-12 overflow-hidden border-t border-white/5 font-['DM_Sans',sans-serif]">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* 01. Typographic Brand Identity */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-3xl font-['Playfair_Display'] font-bold leading-none">
                Generous <span className="italic text-[#C9A96E]">Hands</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mt-2">
                Foundation
              </span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Crafting a future where every woman and girl in Nigeria has the tools to lead, learn, and thrive.
            </p>
            
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://instagram.com/generoushelpinghands"
                target="_blank"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all duration-500"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="mailto:Giversgenerous@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all duration-500"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          {/* 02. Navigation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A96E] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-light flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#C9A96E] transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 03. Headquarters */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A96E] mb-8">Headquarters</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#C9A96E] shrink-0" />
                <span className="text-gray-400 text-sm font-light leading-relaxed">
                  Lagos, Nigeria <br />
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest mt-1 block">West Africa Operations</span>
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-[#C9A96E] shrink-0" />
                <a href="tel:+2349036854354" className="text-gray-400 hover:text-white text-sm font-light transition-colors">
                  +234 903 685 4354
                </a>
              </li>
            </ul>
          </div>

          {/* 04. Support CTA */}
          <div className="relative p-8 rounded-[2rem] bg-white/5 border border-white/5 overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform duration-700">
               <Sparkles className="text-[#C9A96E]" size={40} />
            </div>
            <h3 className="text-white font-['Playfair_Display'] text-xl italic mb-4">Support the Mission</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
              Your contribution goes 100% to field operations and community empowerment.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("donation")}
              className="w-full py-4 bg-[#C9A96E] text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
            >
              Donate Now <ArrowUpRight size={14} />
            </motion.button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} Generous Helping Hands Foundation. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              <span>Legacy of</span>
              <Heart className="w-3 h-3 text-[#C9A96E] fill-[#C9A96E]" />
              <span>Compassion</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">RC: 123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;