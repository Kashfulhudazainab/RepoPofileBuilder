import { FaGithub } from 'react-icons/fa';
import { Home, PenLine, Eye, Settings as SettingsIcon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bg-primary border-t border-border-custom">

      {/* Top footer */}
      <div className="px-5 py-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-accent-blue rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
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

        <p className="text-text-muted text-xs mb-6">Built for architects of code.</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-widest mb-3">Product</p>
            <div className="flex flex-col gap-3">
              <a href="/profile" className="text-text-muted text-sm hover:text-text-primary transition-colors">Profile</a>
              <a href="/settings" className="text-text-muted text-sm hover:text-text-primary transition-colors">Settings</a>
              <a href="/repos" className="text-text-muted text-sm hover:text-text-primary transition-colors">View Demo</a>
            </div>
          </div>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-widest mb-3">Github Auth</p>
            <div className="flex flex-col gap-3">
              <a href="/auth" className="text-text-muted text-sm hover:text-text-primary transition-colors">Sign in</a>
              <a href="/privacy" className="text-text-muted text-sm hover:text-text-primary transition-colors">Privacy</a>
              <a href="/terms" className="text-text-muted text-sm hover:text-text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border-custom pt-5">
          <p className="text-text-muted text-xs">© 2024 RepoProfile</p>
          <FaGithub size={16} className="text-text-muted" />
        </div>
      </div>

      {/* Bottom tab bar */}


// ... inside your component
<div className="border-t border-border-custom grid grid-cols-4 py-3">
  {[
    { icon: <Home size={18} />, label: 'Home', path: '/' },
    { icon: <PenLine size={18} />, label: 'Edit', path: '/edit' },
    { icon: <Eye size={18} />, label: 'Preview', path: '/repos' },
    { icon: <SettingsIcon size={18} />, label: 'Settings', path: '/settings' },
  ].map((item) => (
    <NavLink
      key={item.label}
      to={item.path}
      className={({ isActive }) => 
        `flex flex-col items-center gap-1 text-xs font-medium py-1 transition-colors ${
          isActive ? 'text-accent-blue' : 'text-text-muted hover:text-text-primary'
        }`
      }
    >
      {item.icon}
      <span>{item.label}</span>
    </NavLink>
  ))}
</div>
    </footer>
  );
};

export default Footer;