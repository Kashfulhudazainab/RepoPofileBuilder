import { Star, GitFork } from 'lucide-react';

const langColors = {
  Rust:          'text-orange-400',
  TypeScript:    'text-blue-400',
  Go:            'text-cyan-400',
  Python:        'text-yellow-400',
  'C++':         'text-pink-400',
  AssemblyScript:'text-purple-400',
  JavaScript:    'text-yellow-300',
};

const RepoToggleCard = ({ repo, isSelected, onToggle, disabled }) => {
  return (
    <div
      className={`mx-5 mb-3 bg-bg-card border rounded-xl p-4 transition-colors ${
        isSelected ? 'border-accent-blue' : 'border-border-custom'
      }`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-primary text-sm font-semibold">{repo.name}</h3>

        {/* Toggle switch */}
        {/* Toggle switch */}
<button
  onClick={() => onToggle(repo.id)}
  disabled={disabled && !isSelected}
  style={{ width: '44px', height: '24px' }}
  className={`relative rounded-full transition-colors flex-shrink-0 ${
    isSelected ? 'bg-accent-blue' : 'bg-bg-primary border border-border-custom'
  } ${disabled && !isSelected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
>
  <span
    style={{
      position: 'absolute',
      top: '3px',
      left: isSelected ? '23px' : '3px',
      width: '18px',
      height: '18px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'left 0.2s ease',
    }}
  />
</button>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed mb-3">
        {repo.description}
      </p>

      {/* Stats + language */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-text-muted text-xs">
            <Star size={11} />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1 text-text-muted text-xs">
            <GitFork size={11} />
            {repo.forks}
          </span>
        </div>
        <span className={`text-xs font-medium uppercase tracking-wide ${langColors[repo.language] || 'text-text-muted'}`}>
          {repo.language}
        </span>
      </div>
    </div>
  );
};

export default RepoToggleCard;