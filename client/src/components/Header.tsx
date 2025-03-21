import { useState } from "react";
import { Link } from "wouter";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <img
              src="/attached_assets/image_1742521753459.png"
              alt="UAB Blaze Mascot"
              className="h-12"
            />
            <img
              src="/attached_assets/image_1742522510444.png"
              alt="UAB Logo"
              className="h-10 ml-2"
            />
          </div>
          <h1 className="hidden md:block text-xl font-['Merriweather'] font-bold text-[#2A774B]">
            Graduation Celebration
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors">
            Home
          </a>
          <a href="#journey" className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors">
            Our Journey
          </a>
          <a href="#graduates" className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors">
            Graduates
          </a>
          <a href="#gallery" className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors">
            Gallery
          </a>
          <a href="#rsvp" className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors">
            RSVP
          </a>
          <a href="#directions" className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors">
            Directions
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-[#2A774B]"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-2xl">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white px-4 py-2 shadow-md`}>
        <div className="flex flex-col space-y-3 pb-3">
          <a 
            href="#home" 
            className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors"
            onClick={closeMobileMenu}
          >
            Home
          </a>
          <a 
            href="#journey" 
            className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors"
            onClick={closeMobileMenu}
          >
            Our Journey
          </a>
          <a 
            href="#graduates" 
            className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors"
            onClick={closeMobileMenu}
          >
            Graduates
          </a>
          <a 
            href="#gallery" 
            className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors"
            onClick={closeMobileMenu}
          >
            Gallery
          </a>
          <a 
            href="#rsvp" 
            className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors"
            onClick={closeMobileMenu}
          >
            RSVP
          </a>
          <a 
            href="#directions" 
            className="font-medium text-[#2A774B] hover:text-[#D4AF37] transition-colors"
            onClick={closeMobileMenu}
          >
            Directions
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
