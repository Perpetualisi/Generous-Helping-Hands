import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";

type Testimonial = {
  message: string;
  name: string;
  role?: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    message:
      "Volunteering with GHHF has been one of the most rewarding experiences of my life. I've seen firsthand the positive impact this organization has on women and girls.",
    name: "Tolu Alvaro",
    role: "Volunteer",
    rating: 5,
  },
  {
    message:
      "From advocacy to education, the work they do is comprehensive and transformative. It's amazing to be part of a team that's genuinely making a difference.",
    name: "Aisha Yuhui",
    role: "Community Partner",
    rating: 5,
  },
  {
    message:
      "Supporting GHHF is an investment in a better future for women and girls. I've been consistently impressed with the transparency and effectiveness of their programs.",
    name: "Kunbi Ola",
    role: "Donor",
    rating: 5,
  },
];

// ─── PREMIUM 3D CARD COMPONENT ───────────────────────────────────────────────

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative h-full bg-[#141412] rounded-[2.5rem] p-10 border border-white/5 flex flex-col transition-all duration-500 group-hover:border-[#C9A96E]/40 shadow-2xl">
        
        {/* Quote Icon Accent */}
        <div className="absolute -top-4 right-10 bg-[#C9A96E] p-3 rounded-2xl shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
          <Quote className="w-5 h-5 text-[#0A0908]" />
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-6" style={{ transform: "translateZ(30px)" }}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#C9A96E] text-[#C9A96E]" />
          ))}
        </div>

        {/* Message */}
        <div className="flex-1" style={{ transform: "translateZ(40px)" }}>
          <p className="text-gray-400 font-light leading-relaxed italic text-lg mb-8">
            "{testimonial.message}"
          </p>
        </div>

        {/* Author Info */}
        <div className="pt-6 border-t border-white/5" style={{ transform: "translateZ(20px)" }}>
          <p className="font-['Playfair_Display'] text-xl font-bold text-white leading-tight">
            {testimonial.name}
          </p>
          <p className="text-[#C9A96E] text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN SECTION ────────────────────────────────────────────────────────────

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative bg-[#0A0908] py-40 overflow-hidden text-white font-['DM_Sans',sans-serif]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
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
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Voice of the Community</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-['Playfair_Display'] leading-tight mb-6">
            Trusted <span className="italic text-[#C9A96E]">Testimonials.</span>
          </h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Real stories from those who have walked beside us in our journey to empower women and girls across Nigeria.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-2000">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9A96E] opacity-60">
            Impact in Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;