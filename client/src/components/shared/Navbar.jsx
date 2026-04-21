import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <Link 
  to="/" 
  className="text-text-primary font-medium text-base hover:opacity-80 transition-opacity"
>
  RepoProfile
</Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/"         className="text-text-secondary text-sm hover:text-text-primary transition-colors">Home</a>
          <a href="/profile"  className="text-text-secondary text-sm hover:text-text-primary transition-colors">Profile</a>
          <a href="/settings" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Settings</a>
          <a href="/edit"     className="text-text-secondary text-sm hover:text-text-primary transition-colors">Edit</a>
          <a href="/repos"    className="text-text-secondary text-sm hover:text-text-primary transition-colors">Repositories</a>
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-2">

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* <button
              onClick={() => navigate('/auth')}
              className="text-text-secondary hover:text-text-primary text-sm font-medium px-4 py-2 rounded-lg border border-border-custom hover:border-accent-blue transition-colors"
            >
              Log In
            </button> */}
            <button
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-opacity"
            >
              <FaGithub size={14} />
              Sign Up
            </button>
          </div>

          {/* Mobile: show login button + hamburger */}
          <button
            onClick={() => navigate('/auth')}
            className="md:hidden text-text-secondary hover:text-text-primary text-sm border border-border-custom px-3 py-1.5 rounded-lg transition-colors"
          >
            Log In
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
          <a href="/"         className="text-text-secondary text-sm hover:text-text-primary transition-colors">Home</a>
          <a href="/profile"  className="text-text-secondary text-sm hover:text-text-primary transition-colors">Profile</a>
          <a href="/settings" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Settings</a>
          <a href="/edit"     className="text-text-secondary text-sm hover:text-text-primary transition-colors">Edit</a>
          <a href="/repos"    className="text-text-secondary text-sm hover:text-text-primary transition-colors">Repositories</a>
          <button
            onClick={() => navigate('/auth')}
            className="flex items-center justify-center gap-2 bg-accent-blue text-white text-sm font-medium py-2.5 rounded-lg"
          >
            <FaGithub size={14} />
            Sign Up with GitHub
          </button>
        </div>
      )}

    </nav>
  );
};

export default Navbar;