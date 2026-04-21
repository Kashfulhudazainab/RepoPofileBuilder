import { useState } from 'react';
import { Trash2, Pencil, GripVertical } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const initialRepos = [
  { id: 1, name: 'nebula-core-engine',      desc: 'A high-performance physics engine...' },
  { id: 2, name: 'quantum-auth-provider',   desc: 'Passwordless authentication...' },
  { id: 3, name: 'flux-data-visualizer',    desc: 'Real-time D3.js...' },
];

const FeaturedProjects = () => {
  const [repos, setRepos] = useState(initialRepos);

  const removeRepo = (id) => {
    setRepos(repos.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-base">★</span>
          <h2 className="text-text-primary text-base font-bold">Featured Projects</h2>
        </div>
        <button className="flex items-center gap-1.5 bg-accent-teal bg-opacity-20 text-accent-teal text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-opacity-30 transition-colors">
          <FaGithub size={12} />
          Import from GitHub
        </button>
      </div>

      {/* Repo list */}
      <div className="flex flex-col gap-2">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="flex items-center gap-3 bg-bg-primary border border-border-custom rounded-xl p-3"
          >
            <GripVertical size={16} className="text-text-muted flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-semibold truncate">{repo.name}</p>
              <p className="text-text-secondary text-xs truncate">{repo.desc}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="text-text-muted hover:text-red-400 transition-colors"
                      onClick={() => removeRepo(repo.id)}>
                <Trash2 size={15} />
              </button>
              <button className="text-text-muted hover:text-accent-blue transition-colors">
                <Pencil size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FeaturedProjects;