import { useState } from 'react';
import {  Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-bg-primary border-b border-border-custom w-full">

     

      {/* Main navbar */}
      <div className="flex items-center justify-between px-5 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent-blue rounded-md flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-text-primary font-medium text-base">
            RepoProfile
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Features</a>
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Pricing</a>
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Docs</a>
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-opacity">
            <FaGithub size={14} />
            Sign in with GitHub
          </button>
          <button
            className="md:hidden text-text-secondary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-custom px-5 py-4 flex flex-col gap-4">
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Features</a>
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Pricing</a>
          <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Docs</a>
        </div>
      )}

    </nav>
  );
};

export default Navbar;