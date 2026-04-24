import { useEffect, useState } from 'react';
import { Link2, Copy, Trash2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMe, disconnectGithub, deleteAccount } from '../api/authApi';


const Settings = () => {
  const { user, setUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [subdomain, setSubdomain] = useState('');
  const [isSubdomainEdited, setIsSubdomainEdited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [disconnecting, setDisconnecting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [visibilityOn, setVisibilityOn] = useState(true);

  const liveLink = `https://${subdomain}.repoprofile.com`;

  useEffect(() => {
    if (!isSubdomainEdited && user?.username) {
      setSubdomain(user.username);
    }
  }, [user, isSubdomainEdited]);

  useEffect(() => {
    let isMounted = true;

    const refreshUser = async () => {
      setRefreshing(true);
      setError('');
      try {
        const data = await getMe();
        if (isMounted) setUser(data);
      } catch {
        if (isMounted) setError('Unable to refresh your settings data right now.');
      } finally {
        if (isMounted) setRefreshing(false);
      }
    };

    refreshUser();
    window.addEventListener('focus', refreshUser);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', refreshUser);
    };
  }, [setUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary text-sm">Loading settings...</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(liveLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnectGithub = async () => {
    const confirmed = window.confirm(
      'Disconnect GitHub from your account? Repo sync and GitHub-powered features will stop until you reconnect.'
    );
    if (!confirmed) return;

    setDisconnecting(true);
    setActionError('');
    try {
      await disconnectGithub();
      await logout();
      setUser(null);
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {
        // Storage access can fail in restricted environments.
      }
      navigate('/auth', { replace: true });
    } catch (err) {
      setActionError(err?.response?.data?.message || 'Failed to disconnect GitHub.');
    } finally {
      setDisconnecting(false);
    }
  };

  const handleDeleteAccount = async () => {
    const typed = window.prompt('This action is permanent. Type DELETE to confirm account deletion.');
    if (typed !== 'DELETE') return;

    setDeleting(true);
    setActionError('');
    try {
      await deleteAccount();
      setUser(null);
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {
        // Storage access can fail in restricted environments.
      }
      navigate('/auth');
    } catch (err) {
      setActionError(err?.response?.data?.message || 'Failed to delete account.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="px-5 pt-8 pb-6">
        <h1 className="text-text-primary text-3xl font-bold mb-1">Settings</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          Configure your portfolio identity, visibility preferences, and platform
          integrations from a single control center.
        </p>
        {error && (
          <p className="text-red-400 text-xs mb-4">{error}</p>
        )}
        {refreshing && (
          <p className="text-text-muted text-xs mb-4">Refreshing account data...</p>
        )}
        {actionError && (
          <p className="text-red-400 text-xs mb-4">{actionError}</p>
        )}

        {/* Profile Card */}
        <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                 style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}>
              <img
                src={user?.avatar || 'https://placehold.co/56x56/0f4c75/ffffff?text=U'}
                alt={user?.name || user?.username || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-text-primary text-base font-semibold">
                {user?.name || user?.username || 'User'}
              </p>
              <p className="text-text-secondary text-xs mb-1">
                {user?.email || 'No public email set'}
              </p>
              <span className="bg-accent-blue bg-opacity-20 text-accent-blue text-xs px-2 py-0.5 rounded-md font-medium">
                {user?.title || 'DEVELOPER'}
              </span>
            </div>
          </div>
          <Link to='/edit'>
          <button className="w-full bg-bg-primary border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium py-2.5 rounded-lg transition-colors">
            Update Profile
          </button>
          </Link>
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
                onChange={(e) => {
                  setIsSubdomainEdited(true);
                  setSubdomain(e.target.value);
                }}
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
                  <p className="text-accent-blue text-xs">
                    {user?.githubToken
                      ? `Connected as @${user?.username || 'unknown-user'}`
                      : 'Not connected'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDisconnectGithub}
                disabled={disconnecting || !user?.githubToken}
                className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {disconnecting ? 'DISCONNECTING...' : 'DISCONNECT'}
              </button>
            </div>
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
          <button
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? 'Deleting Account...' : 'Delete Account'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;