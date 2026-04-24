import { useState, useRef, useEffect } from 'react';
import { Mail, Share2, Copy, X, RefreshCw, Check } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaGlobe, FaPhone, FaEnvelope } from 'react-icons/fa';
import api from '../../api/axios';

const ProfileHero = ({ user }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  console.log("--- ProfileHero Debug ---");
  console.log("Full User Object:", user);
  console.log("Socials Object:", user?.socials);
  console.log("LinkedIn Value:", user?.socials?.linkedin);
  
  const liveLink = window.location.href;

  // Fix: Check both top-level and nested socials for the email
  const userEmail = user?.email || user?.socials?.email || '';

  const handleCopyLink = (text, id = null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg('');
    try {
      const res = await api.get('/api/repos/sync');
      setSyncMsg(res.data.message);
      setTimeout(() => setSyncMsg(''), 3000);
    } catch (err) {
      setSyncMsg('Sync failed. Try again.');
      setTimeout(() => setSyncMsg(''), 3000);
    } finally {
      setSyncing(false);
    }
  };

const socials = user?.socials || {};

const socialLinks = [
  // Check for value in socials.email OR top-level user.email
  (user?.socials?.email || user?.email) && {
    id: 'email',
    icon: <FaEnvelope size={16} className="text-red-400" />,
    label: 'Email',
    href: `mailto:${user.socials?.email || user.email}`,
    value: user.socials?.email || user.email,
    raw: user.socials?.email || user.email
  },
  // Use ?.trim() to ensure a string with just spaces doesn't count
  user?.socials?.linkedin?.trim() && {
    id: 'linkedin',
    icon: <FaLinkedin size={16} className="text-blue-400" />,
    label: 'LinkedIn',
    href: `https://linkedin.com/in/${user.socials.linkedin}`,
    value: `linkedin.com/in/${user.socials.linkedin}`,
    raw: user.socials.linkedin
  },
  user?.socials?.twitter?.trim() && {
    id: 'twitter',
    icon: <FaTwitter size={16} className="text-sky-400" />,
    label: 'Twitter / X',
    href: `https://twitter.com/${user.socials.twitter}`,
    value: `@${user.socials.twitter}`,
    raw: user.socials.twitter
  },
  user?.socials?.website?.trim() && {
    id: 'website',
    icon: <FaGlobe size={16} className="text-accent-teal" />,
    label: 'Website',
    href: user.socials.website.startsWith('http') ? user.socials.website : `https://${user.socials.website}`,
    value: user.socials.website.replace(/^https?:\/\//, ''),
    raw: user.socials.website
  }
].filter(Boolean);

  return (
    <section className="bg-bg-primary px-5 pt-8 pb-6 relative">
      <div className="flex flex-col md:flex-row md:gap-8 md:items-start">
        
        <div className="flex-1">
          <h1 className="text-text-primary text-3xl font-bold mb-1">
            {user?.name || user?.username || '—'}
          </h1>
          <p className="text-accent-blue text-sm font-medium mb-4">
            {user?.title || 'Software Developer'}
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {user?.bio || 'No bio provided yet.'}
          </p>

          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all active:scale-95 shadow-lg shadow-accent-blue/20 ${
                syncing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync Repos'}
            </button>

            {/* If socialLinks has items, the Connect button shows */}
            {socialLinks.length > 0 && (
              <button
                onClick={() => setIsSocialsOpen(true)}
                className="flex items-center gap-2 border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Mail size={15} />
                Connect
              </button>
            )}

            <button
              onClick={() => setIsShareOpen(true)}
              className="border border-border-custom text-text-secondary hover:text-text-primary p-2 rounded-lg transition-colors"
            >
              <Share2 size={16} />
            </button>
          </div>

          {syncMsg && (
            <p className={`text-xs mt-2 font-medium ${
              syncMsg.includes('failed') ? 'text-red-400' : 'text-accent-teal'
            }`}>
              ✓ {syncMsg}
            </p>
          )}
        </div>

        <div

  className="hidden md:block md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 border-4 border-bg-card shadow-xl"
  style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}
>
  <img
    src={user?.avatar || 'https://placehold.co/400x300/0f4c75/ffffff?text=Avatar'}
    alt={user?.name || user?.username || 'User'}
    className="w-full h-full object-cover"
  />
</div>
      </div>

      {/* Connect Modal */}
      {isSocialsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSocialsOpen(false)} />
          <div className="relative w-full max-w-sm bg-bg-card border border-border-custom rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-text-primary font-bold text-lg">Connect</h3>
              <button onClick={() => setIsSocialsOpen(false)} className="text-text-muted hover:text-text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {socialLinks.map(({ id, icon, label, href, value, raw }) => (
                <div key={id} className="flex items-center gap-2 group">
                  <a
                    href={href}
                    target={id === 'email-social' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center gap-3 bg-bg-primary border border-border-custom hover:border-accent-blue rounded-xl px-4 py-3 transition-colors min-w-0"
                  >
                    <div className="flex-shrink-0">{icon}</div>
                    <div className="overflow-hidden text-left">
                      <p className="text-text-muted text-[10px] uppercase tracking-widest">{label}</p>
                      <p className="text-text-primary text-sm font-medium truncate group-hover:text-accent-blue">
                        {value}
                      </p>
                    </div>
                  </a>
                  <button
                    onClick={() => handleCopyLink(raw || value, id)}
                    className={`p-3 rounded-xl border border-border-custom transition-all flex-shrink-0 ${
                      copiedId === id 
                        ? 'bg-accent-teal/10 border-accent-teal text-accent-teal' 
                        : 'bg-bg-primary hover:border-text-muted text-text-muted'
                    }`}
                  >
                    {copiedId === id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal Logic... */}
    </section>
  );
};

export default ProfileHero;