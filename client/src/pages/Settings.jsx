import { useState } from 'react';
import { Link2, Copy, Trash2, Bell, Shield, BarChart2, Wrench } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const Settings = () => {
  const [subdomain, setSubdomain] = useState('alexrivera');
  const [copied, setCopied] = useState(false);
  const [visibilityOn, setVisibilityOn] = useState(true);
  const [notifications, setNotifications] = useState({
    analytics: true,
    integration: true,
    marketing: false,
    security: true,
  });

  const liveLink = `https://${subdomain}.repoprofile.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleNotif = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="px-5 pt-8 pb-6">
        <h1 className="text-text-primary text-3xl font-bold mb-1">Settings</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          Configure your portfolio identity, visibility preferences, and platform
          integrations from a single control center.
        </p>

        {/* Profile Card */}
        <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                 style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}>
              <img
                src="https://placehold.co/56x56/0f4c75/ffffff?text=AR"
                alt="Alex Rivera"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-text-primary text-base font-semibold">Alex Rivera</p>
              <p className="text-text-secondary text-xs mb-1">alex.rivera@devstudio.com</p>
              <span className="bg-accent-blue bg-opacity-20 text-accent-blue text-xs px-2 py-0.5 rounded-md font-medium">
                PRO ARCHITECT
              </span>
            </div>
          </div>
          <button className="w-full bg-bg-primary border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium py-2.5 rounded-lg transition-colors">
            Update Profile
          </button>
        </div>

        {/* Portfolio URL Management */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Link2 size={16} className="text-accent-blue" />
            <h2 className="text-text-primary text-lg font-bold">Portfolio URL Management</h2>
          </div>

          <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Custom Subdomain</p>
          <div className="flex items-center mb-1">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              className="flex-1 bg-bg-card border border-border-custom rounded-l-lg px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent-blue transition-colors"
            />
            <span className="bg-bg-card border border-l-0 border-border-custom rounded-r-lg px-3 py-2.5 text-text-muted text-sm">
              .repoprofile.com
            </span>
          </div>
          <p className="text-text-muted text-xs mb-4">
            Your public portfolio will be accessible at this address.
          </p>

          <div className="bg-bg-card border border-border-custom rounded-xl p-4">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Live Share Link</p>
            <p className="text-accent-blue text-sm font-medium mb-3 break-all">{liveLink}</p>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-accent-blue hover:opacity-90 text-white text-sm font-medium py-2.5 rounded-lg transition-opacity"
            >
              <Copy size={14} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full border-2 border-accent-blue flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent-blue" />
            </div>
            <h2 className="text-text-primary text-lg font-bold">Account Settings</h2>
          </div>

          <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-text-primary text-sm font-semibold mb-1">Profile Visibility</p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Make your portfolio visible to recruiters and the public.
                </p>
              </div>
              <button
                onClick={() => setVisibilityOn(!visibilityOn)}
                style={{ width: '44px', height: '24px', flexShrink: 0 }}
                className={`relative rounded-full transition-colors ${visibilityOn ? 'bg-accent-blue' : 'bg-bg-primary border border-border-custom'}`}
              >
                <span style={{
                  position: 'absolute', top: '3px',
                  left: visibilityOn ? '23px' : '3px',
                  width: '18px', height: '18px',
                  backgroundColor: 'white', borderRadius: '50%',
                  transition: 'left 0.2s ease',
                }} />
              </button>
            </div>
          </div>

          <div className="bg-bg-card border border-border-custom rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaGithub size={18} className="text-text-secondary" />
                <div>
                  <p className="text-text-primary text-sm font-semibold">GitHub Connection</p>
                  <p className="text-accent-blue text-xs">Connected as @arivera-dev</p>
                </div>
              </div>
              <button className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                DISCONNECT
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-accent-blue" />
            <h2 className="text-text-primary text-lg font-bold">Notification Preferences</h2>
          </div>

          <div className="bg-bg-card border border-border-custom rounded-xl overflow-hidden">
            {[
              { key: 'analytics',   icon: <BarChart2 size={15} className="text-accent-blue" />, title: 'Portfolio Analytics',  desc: 'Weekly digest of page views and repository clicks.' },
              { key: 'integration', icon: <Wrench size={15} className="text-accent-blue" />,    title: 'Integration Status',   desc: 'Alerts when repo syncs fail or need re-auth.' },
              { key: 'marketing',   icon: <Bell size={15} className="text-text-muted" />,        title: 'Marketing & Tips',     desc: 'Occasional updates on new themes and features.' },
              { key: 'security',    icon: <Shield size={15} className="text-accent-blue" />,     title: 'Security Alerts',      desc: 'Critical notifications about your account access.' },
            ].map((item, i, arr) => (
              <div
                key={item.key}
                className={`flex items-start gap-3 p-4 ${i < arr.length - 1 ? 'border-b border-border-custom' : ''}`}
              >
                <button
                  onClick={() => toggleNotif(item.key)}
                  className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center transition-colors ${
                    notifications[item.key]
                      ? 'bg-accent-blue border-accent-blue'
                      : 'bg-transparent border-border-custom'
                  }`}
                >
                  {notifications[item.key] && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {item.icon}
                    <p className="text-text-primary text-sm font-semibold">{item.title}</p>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-bg-card border border-red-900 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 size={16} className="text-red-400" />
            <h2 className="text-red-400 text-base font-bold">Danger Zone</h2>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed mb-4">
            Permanently delete your profile and all associated data. This action is
            irreversible and will immediately take down your portfolio URL.
          </p>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;