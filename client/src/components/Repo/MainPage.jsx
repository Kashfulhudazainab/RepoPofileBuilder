import { useState } from 'react';
import { Bell } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import CurateHero     from './RepoHero';
import SearchBar      from './Search';
import LanguageFilter from './LanguageFilter';
import RepoToggleCard from './RepoToggle';

const MAX_SLOTS = 5;

const allRepos = [
  { id: 1, name: 'nebula-engine',       description: 'A high-performance physics engine for spatial simulations and orbital mechanics...', stars: '1.2k', forks: '84',  language: 'Rust'           },
  { id: 2, name: 'react-obsidian-ui',   description: 'Design system focused on brutalist aesthetics and hyper-legibility for...',          stars: '432',  forks: '21',  language: 'TypeScript'     },
  { id: 3, name: 'go-raft-consensus',   description: 'Production-ready implementation of the Raft consensus algorithm for distributed systems.', stars: '880', forks: '156', language: 'Go'        },
  { id: 4, name: 'py-llm-orchestrator', description: 'Autonomous agent framework for multi-model reasoning and tool execution...',          stars: '2.4k', forks: '340', language: 'Python'         },
  { id: 5, name: 'hyperion-db',         description: 'Log-structured merge-tree database implementation for fast write-heavy...',           stars: '612',  forks: '45',  language: 'C++'            },
  { id: 6, name: 'wasm-image-filter',   description: 'Real-time image processing filters powered by WebAssembly for near-native browser...', stars: '219', forks: '12',  language: 'AssemblyScript' },
];

const EditPage = () => {
  const [selected, setSelected]         = useState([1, 3, 5]);
  const [search, setSearch]             = useState('');
  const [activeLanguage, setLanguage]   = useState('All Languages');
  const [visibleCount, setVisibleCount] = useState(6);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < MAX_SLOTS
        ? [...prev, id]
        : prev
    );
  };

  const filtered = allRepos
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .filter((r) => activeLanguage === 'All Languages' || r.language === activeLanguage)
    .slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-bg-primary pb-24">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent-blue rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-text-primary text-sm font-medium">RepoProfile</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={18} className="text-text-muted" />
          <FaUserCircle size={22} className="text-text-muted" />
        </div>
      </div>

      <CurateHero selected={selected.length} max={MAX_SLOTS} />
      <SearchBar value={search} onChange={setSearch} />
      <LanguageFilter active={activeLanguage} onChange={setLanguage} />

      {/* Repo list */}
      {filtered.map((repo) => (
        <RepoToggleCard
          key={repo.id}
          repo={repo}
          isSelected={selected.includes(repo.id)}
          onToggle={toggle}
          disabled={selected.length >= MAX_SLOTS}
        />
      ))}

      {/* Load more */}
      {visibleCount < allRepos.length && (
        <div className="px-5 mt-4">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="w-full border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium py-3 rounded-xl transition-colors"
          >
            Load More Repositories
          </button>
        </div>
      )}

      {/* Save to profile sticky button */}
      {selected.length > 0 && (
        <div className="bottom-20 left-0 right-0 px-5">
          <button className="w-full bg-accent-blue hover:opacity-90 text-white font-medium text-sm py-3 rounded-xl transition-opacity shadow-lg">
            Add {selected.length} Repo{selected.length > 1 ? 's' : ''} to Public Profile
          </button>
        </div>
      )}

    </div>
  );
};

export default EditPage;