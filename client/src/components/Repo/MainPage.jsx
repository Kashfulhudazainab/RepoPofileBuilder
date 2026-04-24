import { useState, useEffect } from 'react';
import { Bell }                from 'lucide-react';
import { FaUserCircle }        from 'react-icons/fa';
import { getMyRepos, syncRepos, toggleFeatured } from '../../api/repoApi';
import CurateHero     from './RepoHero';
import SearchBar      from './Search';
import LanguageFilter from './LanguageFilter';
import RepoToggleCard from './RepoToggle';
import { Link } from 'react-router-dom';

const MAX_SLOTS = 9;

const EditPage = () => {
  const [repos, setRepos]               = useState([]);
  const [selected, setSelected]         = useState([]); // Starts empty: no auto-selection
  const [search, setSearch]             = useState('');
  const [activeLanguage, setLanguage]   = useState('All Languages');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading]           = useState(true);
  const [syncing, setSyncing]           = useState(false);

  // Fetch repos from backend on mount
 // inside EditPage component

useEffect(() => {
  const fetchRepos = async () => {
    try {
      const data = await getMyRepos();
      setRepos(data);
      
      // FIX: Find repos that are already featured and pre-fill the selected state
      const alreadyFeaturedIds = data
        .filter(r => r.featured === true)
        .map(r => r._id);
      
      setSelected(alreadyFeaturedIds); 
      
    } catch (err) {
      console.error('Failed to fetch repos:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchRepos();
}, []);

  // Sync fresh repos from GitHub
 const handleSync = async () => {
  setSyncing(true);
  try {
    await syncRepos();
    const data = await getMyRepos();
    setRepos(data);
    
    // Maintain current featured status after sync
    const currentFeatured = data.filter(r => r.featured).map(r => r._id);
    setSelected(currentFeatured); 
    
    console.log('Sync success');
  } catch (err) {
    console.error('Sync failed:', err);
  } finally {
    setSyncing(false);
  }
};

  // Toggle selection logic
  const toggle = async (id) => {
    const isCurrentlySelected = selected.includes(id);

    // Guard: Prevent selection if limit reached (unless we are unselecting)
    if (!isCurrentlySelected && selected.length >= MAX_SLOTS) {
      return;
    }

    try {
      // Update backend
      await toggleFeatured(id);
      
      // Update local selection state
      setSelected((prev) =>
        isCurrentlySelected
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );

      // Synchronize the 'featured' flag in our local repos list
      setRepos((prev) =>
        prev.map((r) => (r._id === id ? { ...r, featured: !r.featured } : r))
      );
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  // Filter Logic
  const filteredRepos = repos.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesLang = activeLanguage === 'All Languages' || r.language === activeLanguage;
    return matchesSearch && matchesLang;
  });

  const languages = [
    'All Languages',
    ...new Set(repos.map((r) => r.language).filter(Boolean))
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-3">
        <p className="text-text-muted text-sm">Loading repositories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          {/* <div className="w-6 h-6 bg-accent-blue rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div> */}
          <span className="text-text-primary text-lg font-medium">Profile Repositories</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="text-accent-blue text-xs border border-accent-blue px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {syncing ? 'Syncing...' : '⟳ Sync GitHub'}
          </button>
          <Bell size={18} className="text-text-muted" />
          <FaUserCircle size={22} className="text-text-muted" />
        </div>
      </div>

      <CurateHero selected={selected.length} max={MAX_SLOTS} />
      
      <SearchBar value={search} onChange={setSearch} />
      
      <LanguageFilter 
        active={activeLanguage} 
        onChange={setLanguage} 
        languages={languages} 
      />

      {/* Main Content */}
      {repos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-5 gap-4">
          <p className="text-text-muted text-sm text-center">
            No repositories found. Sync your GitHub repos first.
          </p>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="bg-accent-blue text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            {syncing ? 'Syncing...' : 'Sync from GitHub'}
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            {filteredRepos.slice(0, visibleCount).map((repo) => (
              <RepoToggleCard
                key={repo._id}
                repo={repo}
                isSelected={selected.includes(repo._id)}
                onToggle={() => toggle(repo._id)}
                disabled={selected.length >= MAX_SLOTS && !selected.includes(repo._id)}
              />
            ))}
          </div>

          {visibleCount < filteredRepos.length && (
            <div className="px-5 mt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="w-full border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium py-3 rounded-xl transition-colors"
              >
                Load More Repositories
              </button>
            </div>
          )}
        </>
      )}

      {/* Sticky Save Button */}
      {selected.length > 0 && (
  <div className="fixed bottom-20 left-0 right-0 px-5 animate-in slide-in-from-bottom-4 z-50">
    <Link to="/profile" className="block w-full">
      <button 
        className="w-full bg-accent-blue hover:bg-blue-600 text-white font-semibold text-sm py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
      >
        <span>Update Public Profile</span>
        <span className="bg-white/20 px-2.5 py-0.5 rounded-lg text-xs border border-white/10">
          {selected.length} Repo{selected.length !== 1 ? 's' : ''}
        </span>
      </button>
    </Link>
  </div>
)}
    </div>
  );
};

export default EditPage;