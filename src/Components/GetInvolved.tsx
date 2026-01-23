import React from "react";
import { Mail, Heart, Users, Gift } from "lucide-react";

// ------------------ TYPES ------------------
type IconComponent = React.ComponentType<{ className?: string }>;

interface ContactMethodData {
  icon: IconComponent;
  text: string;
  link?: string;
  linkText?: string;
}

interface DonationMethodData {
  title: string;
  description: string;
  icon: IconComponent;
}

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  reverse?: boolean;
}

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

// ------------------ DATA ------------------
const contactMethods: ContactMethodData[] = [
  {
    icon: Mail,
    text: "Email us at",
    link: "mailto:Giversgenerous@gmail.com",
    linkText: "Giversgenerous@gmail.com",
  },
  {
    icon: Users,
    text: "Send us a message on Instagram or Facebook",
  },
];

const donationMethods: DonationMethodData[] = [
  {
    title: "Online Donation",
    description: "First Bank - Make secure donations directly to our account",
    icon: Heart,
  },
  {
    title: "In-Kind Donations",
    description: "Donate goods or services that support our programs and operations",
    icon: Gift,
  },
];

// ------------------ COMPONENTS ------------------
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="space-y-3 sm:space-y-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className="w-16 sm:w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
  </div>
);

const ContactMethod: React.FC<ContactMethodData> = ({ icon: Icon, text, link, linkText }) => (
  <div className="flex items-start gap-2 sm:gap-3 group">
    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors flex-shrink-0">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300" />
    </div>
    <p className="text-gray-600 dark:text-gray-300 pt-0.5 sm:pt-1 text-sm sm:text-base">
      {text}{" "}
      {link && linkText && (
        <a
          href={link}
          className="text-blue-600 dark:text-blue-300 font-medium hover:text-blue-700 dark:hover:text-blue-400 hover:underline transition-colors break-all block sm:inline mt-1 sm:mt-0"
        >
          {linkText}
        </a>
      )}
    </p>
  </div>
);

const DonationCard: React.FC<DonationMethodData> = ({ title, description, icon: Icon }) => (
  <div className="group bg-gradient-to-br from-blue-50 dark:from-gray-800 to-white dark:to-gray-900 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="bg-blue-600 dark:bg-blue-500 p-2.5 sm:p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2 text-base sm:text-lg">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const SectionContainer: React.FC<SectionContainerProps> = ({ id, children, reverse = false }) => (
  <div
    id={id}
    className={`scroll-mt-20 sm:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center ${
      reverse ? "lg:grid-flow-dense" : ""
    }`}
  >
    {children}
  </div>
);

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, className = "" }) => (
  <div className={`relative group overflow-hidden rounded-xl sm:rounded-2xl ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
    <img
      src={src}
      alt={alt}
      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
  </div>
);

const InfoCard: React.FC<{ children: React.ReactNode; title?: string; icon?: IconComponent }> = ({ children, title, icon: Icon }) => (
  <div className="bg-blue-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-100 dark:border-gray-700 space-y-3 sm:space-y-4">
    {title && (
      <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />}
        <span>{title}</span>
      </h3>
    )}
    {children}
  </div>
);

const CTABanner: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gradient-to-r from-blue-600 dark:from-blue-700 to-blue-700 dark:to-blue-800 p-5 sm:p-6 rounded-lg sm:rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
    {children}
  </div>
);

// ------------------ MAIN COMPONENT ------------------
const GetInvolved: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 lg:py-20 space-y-16 sm:space-y-20 lg:space-y-28">
        {/* ================= VOLUNTEER SECTION ================= */}
        <SectionContainer id="volunteer">
          <div className="order-2 lg:order-1">
            <ImageCard src="/volut.jpg" alt="Volunteer with us" />
          </div>

          <div className="space-y-5 sm:space-y-6 order-1 lg:order-2">
            <SectionHeader title="Volunteer With Us!" />

            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                Are you passionate about empowering women and girls and making a
                positive impact in your community? Join our team at Generous
                Helping Hands Foundation as a volunteer!
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                By volunteering with us, you will have the opportunity to
                contribute to meaningful projects that promote economic
                sustainability, social equity, and access to fundamental rights.
                Your efforts will help create a world where women and girls can
                thrive and reach their full potential.
              </p>
            </div>

            <InfoCard title="How to Get Involved" icon={Users}>
              <div className="space-y-3 sm:space-y-4">
                {contactMethods.map((method, index) => (
                  <ContactMethod key={index} {...method} />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm pt-2 sm:pt-3 border-t border-blue-200 dark:border-gray-700">
                Stay connected by following us on social media and subscribing
                to our newsletter.
              </p>
            </InfoCard>
          </div>
        </SectionContainer>

        {/* ================= DONATION SECTION ================= */}
        <SectionContainer id="donation" reverse>
          <div className="space-y-5 sm:space-y-6 lg:col-start-1 order-1">
            <SectionHeader
              title="Support Our Cause"
              subtitle="Your donation can significantly impact women's and girls' empowerment, economic sustainability, social equity advocacy, and access to fundamental rights."
            />

            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                <span>Ways to Donate</span>
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {donationMethods.map((method, index) => (
                  <DonationCard key={index} {...method} />
                ))}
              </div>
            </div>

            <CTABanner>
              <p className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 opacity-90">
                Every contribution matters
              </p>
              <p className="text-xl sm:text-2xl font-bold">
                Together, we can make a difference
              </p>
            </CTABanner>
          </div>

          <div className="lg:col-start-2 order-2">
            <ImageCard src="/donations.jpg" alt="Support our cause" />
          </div>
        </SectionContainer>
      </div>
    </section>
  );
};

export default GetInvolved;
