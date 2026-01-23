import React from "react";
import { Mail, Phone, Share2, MapPin, Heart } from "lucide-react";

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  link?: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}

const Contact: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: "Phone",
      content: "+234 903 685 4354",
      link: "tel:+2349036854354",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/50",
    },
    {
      icon: Mail,
      title: "Email",
      content: "Giversgenerous@gmail.com",
      link: "mailto:Giversgenerous@gmail.com",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
    },
    {
      icon: Share2,
      title: "Social Media",
      content: "@GenerousHelpingHands",
      link: "https://instagram.com/generoushelpinghands",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/50",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Lagos, Nigeria",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      hoverColor: "hover:bg-orange-100 dark:hover:bg-orange-900/50",
    },
  ];

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-3 sm:mb-4">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Together, we can create a brighter future for women and girls everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 relative rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="relative aspect-[4/3] w-full">
              <img
                src="/contact.png"
                alt="Generous Helping Hands community outreach"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 dark:from-black/70 via-transparent to-transparent" />

            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8 text-white">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                We're Here to Help
              </h3>
              <p className="text-white/90 text-xs sm:text-sm lg:text-base">
                Connect with us to learn more about our programs and initiatives.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="order-1 lg:order-2 space-y-5 sm:space-y-6">
            {/* Contact Cards */}
            <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">
                Contact Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 ${info.bgColor} ${info.hoverColor} rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-md`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${info.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
                            {info.title}
                          </h4>
                          {info.link ? (
                            <a
                              href={info.link}
                              className={`${info.color} hover:underline block text-xs sm:text-sm lg:text-base font-medium mt-0.5 sm:mt-1 break-words`}
                              target={info.link.startsWith("http") ? "_blank" : undefined}
                              rel="noopener noreferrer"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm lg:text-base mt-0.5 sm:mt-1">
                              {info.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl text-white transition-all duration-300">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                Ready to Make a Difference?
              </h3>
              <p className="mb-4 sm:mb-5 text-blue-50 text-xs sm:text-sm lg:text-base">
                Join us in empowering women and girls. Your support creates lasting change.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#donation"
                  className="flex-1 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-center shadow-md transition-colors text-sm sm:text-base"
                >
                  Donate Now
                </a>
                <a
                  href="#volunteer"
                  className="flex-1 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-700/50 dark:bg-blue-800/50 text-white rounded-lg hover:bg-blue-800/70 dark:hover:bg-blue-700/70 font-semibold text-center shadow-md transition-colors text-sm sm:text-base border border-white/20"
                >
                  Volunteer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;