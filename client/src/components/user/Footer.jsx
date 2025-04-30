import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and Social Media Section */}
          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white tracking-tighter">
                <span className="text-amber-400">FOOD</span>
                <span className="text-white">EAT</span>
              </span>
            </div>
            <p className="mt-4 text-gray-300 text-sm">
              Discover the best restaurants and food experiences near you.
            </p>
            <div className="mt-6 flex gap-4">
              {["Facebook", "Instagram", "Twitter", "YouTube"].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                    aria-label={platform}
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="h-6 w-6">
                      {/* Replace with actual icons or SVG */}
                      {platform.charAt(0)}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: (
                    <svg
                      className="h-5 w-5 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  ),
                  text: "+91 1800123444",
                  subtext: "Support Number",
                },
                {
                  icon: (
                    <svg
                      className="h-5 w-5 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  text: "help@foodeat.com",
                  subtext: "Support Email",
                },
                {
                  icon: (
                    <svg
                      className="h-5 w-5 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  text: "Edappally, Kochi, India, 682001",
                  subtext: "Our Location",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div className="ml-3">
                    <p className="text-white text-sm">{item.text}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.subtext}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links and App Download */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Restaurants", href: "/managerdashboard" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-amber-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {/* <h3 className="text-lg font-medium text-white mb-4">
                Download App
              </h3> */}
              <div className="space-y-4">
                {/* <a href="#" className="block">
                  <img
                    src="https://via.placeholder.com/150x50?text=App+Store"
                    alt="Download on App Store"
                    className="h-10 w-auto"
                  />
                </a>
                <a href="#" className="block">
                  <img
                    src="https://via.placeholder.com/150x50?text=Google+Play"
                    alt="Get it on Google Play"
                    className="h-10 w-auto"
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} FOOD EAT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
