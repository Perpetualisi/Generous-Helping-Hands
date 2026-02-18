import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, Share2, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  link?: string;
}

const Contact: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: "Phone",
      content: "+234 903 685 4354",
      link: "tel:+2349036854354",
    },
    {
      icon: Mail,
      title: "Email",
      content: "Giversgenerous@gmail.com",
      link: "mailto:Giversgenerous@gmail.com",
    },
    {
      icon: Share2,
      title: "Social Media",
      content: "@GenerousHelpingHands",
      link: "https://instagram.com/generoushelpinghands",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Lagos, Nigeria",
    },
  ];

  // ─── 3D TILT EFFECT LOGIC ──────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section id="contact" className="relative bg-[#0A0908] py-40 overflow-hidden text-white font-['DM_Sans',sans-serif]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full mb-8"
          >
            <Heart className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Connect With Us</span>
          </motion.div>
          <h2 className="text-6xl md:text-7xl font-['Playfair_Display'] leading-tight mb-6">
            Get in <span className="italic text-[#C9A96E]">Touch.</span>
          </h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-8">
            Together, we can create a brighter future for women and girls everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Premium Image Card with 3D Tilt */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group hidden lg:block"
          >
            <div className="absolute inset-0 bg-[#C9A96E]/15 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#141412] p-2">
              <img
                src="/contact.png"
                alt="Community outreach"
                className="w-full aspect-[4/5] object-cover rounded-[2.8rem] transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 right-12" style={{ transform: "translateZ(50px)" }}>
                <h3 className="text-3xl font-['Playfair_Display'] font-bold mb-3 italic text-[#C9A96E]">We're Here to Help</h3>
                <p className="text-gray-200 font-light leading-relaxed">Connect with us to learn more about our local programs and international initiatives.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Info & CTA */}
          <div className="space-y-12">
            
            {/* Info Grid */}
            <div className="bg-[#141412] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-['Playfair_Display'] font-bold text-white mb-8">Contact Information</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                      <div className="w-14 h-14 rounded-2xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-black transition-all duration-500">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="text-white hover:text-[#C9A96E] font-medium transition-colors break-words">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative overflow-hidden bg-[#C9A96E] p-10 rounded-[2.5rem] text-black">
              <div className="absolute top-[-20%] right-[-10%] opacity-10 rotate-12">
                <Sparkles size={200} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-['Playfair_Display'] font-bold mb-4 italic leading-tight">
                  Ready to Make a Difference?
                </h3>
                <p className="font-medium mb-8 opacity-80 max-w-sm">
                  Join us in empowering women and girls. Your support creates lasting change in our community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#donation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-8 py-4 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest text-center shadow-xl flex items-center justify-center gap-2"
                  >
                    Donate Now <ArrowRight size={14} />
                  </motion.a>
                  <motion.a
                    href="#volunteer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-8 py-4 bg-white/20 backdrop-blur-md border border-black/10 rounded-full font-black text-[10px] uppercase tracking-widest text-center"
                  >
                    Volunteer
                  </motion.a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;