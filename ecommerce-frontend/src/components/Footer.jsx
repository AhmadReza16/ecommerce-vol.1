import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-primary/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">LuxeLane</h3>
            <p className="text-sm">
              Your destination for modern, high-quality fashion and accessories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Social Icons would go here */}
              <p className="text-sm">Instagram, Facebook, Twitter</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} LuxeLane. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
