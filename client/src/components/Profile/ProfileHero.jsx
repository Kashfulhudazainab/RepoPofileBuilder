import { useState }              from 'react';
import { Mail, Share2, Copy, X, RefreshCw } from 'lucide-react';
import api                       from '../../api/axios';

const ProfileHero = ({ user }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied]           = useState(false);
  const [syncing, setSyncing]         = useState(false);
  const [syncMsg, setSyncMsg]         = useState('');

  const liveLink = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg('');
    try {
      const res = await api.get('/api/repos/sync');
      setSyncMsg(res.data.message); // "25 repos synced, top 3 featured"
      setTimeout(() => setSyncMsg(''), 3000);
    } catch {
      setSyncMsg('Sync failed. Try again.');
      setTimeout(() => setSyncMsg(''), 3000);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <section className="bg-bg-primary px-5 pt-8 pb-6 relative">
      <div className="flex flex-col md:flex-row md:gap-8 md:items-start">

        {/* Left — text content */}
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
            {/* Contact Me */}
            
              <a href={user?.email ? `mailto:${user.email}` : '#'}
              className="flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-opacity"
            >
              <Mail size={14} />
              Contact Me
            </a>

            {/* Sync Repos button — side by side with Contact Me */}
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`flex items-center gap-2 border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                syncing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync Repos'}
            </button>

            {/* Share button */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="border border-border-custom text-text-secondary hover:text-text-primary p-2 rounded-lg transition-colors"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Sync status message */}
          {syncMsg && (
            <p className={`text-xs mt-2 font-medium ${
              syncMsg.includes('failed') ? 'text-red-400' : 'text-accent-teal'
            }`}>
              ✓ {syncMsg}
            </p>
          )}
        </div>

        {/* Right — avatar */}
        <div
          className="w-full md:w-56 h-64 rounded-xl overflow-hidden flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}
        >
          <img
            src={user?.avatar || 'https://placehold.co/400x300/0f4c75/ffffff?text=Avatar'}
            alt={user?.name || user?.username || 'User'}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsShareOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-bg-card border border-border-custom rounded-2xl p-6 shadow-2xl animate-in zoom-in fade-in duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-text-primary font-bold text-lg">Share Profile</h3>
              <button
                onClick={() => setIsShareOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-bg-primary border border-border-custom rounded-xl p-4">
                <p className="text-text-muted text-[10px] uppercase tracking-[0.15em] mb-2 font-bold">
                  Profile Link
                </p>
                <p className="text-accent-blue text-sm font-medium mb-4 break-all font-mono">
                  {liveLink}
                </p>
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2.5 rounded-lg transition-all ${
                    copied ? 'bg-accent-teal' : 'bg-accent-blue hover:opacity-90'
                  }`}
                >
                  {copied ? <>Copied to clipboard!</> : <><Copy size={14} />Copy Link</>}
                </button>
              </div>

              <p className="text-text-muted text-[11px] text-center leading-relaxed px-4">
                Share your RepoProfile across social platforms or in your resume.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileHero;