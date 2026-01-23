import React from "react";
import { Quote, Star } from "lucide-react";

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

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const { message, name, role, rating = 5 } = testimonial;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8 bg-blue-600 dark:bg-blue-500 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mt-4 mb-6">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base italic">
        "{message}"
      </p>

      {/* Author Info */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
        <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{name}</p>
        {role && (
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">{role}</p>
        )}
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-50 dark:from-gray-700 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-14">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      {title}
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {subtitle}
    </p>
    <div className="mt-6 mx-auto w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-gray-50 dark:from-gray-900 to-white dark:to-gray-800 py-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Header */}
        <SectionHeader
          title="Testimonials"
          subtitle="What Are People Saying?"
        />

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700">
            <Quote className="w-4 h-4" />
            <p className="text-sm font-medium">
              Want to share your experience? Contact us today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
