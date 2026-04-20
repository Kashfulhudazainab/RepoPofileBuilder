import { Share2 } from 'lucide-react';

const tags = ['TypeScript', 'React', 'Tailwind'];

const RepoCard = () => {
  return (
    <section className="bg-bg-primary px-5 py-6">
      <div className="bg-bg-card border border-border-custom rounded-xl p-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-blue rounded-md flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3" />
              </svg>
            </div>
            <div>
              <p className="text-text-primary text-sm font-medium">RepoProfile-Core</p>
              <p className="text-text-muted text-xs">Updated 2h ago</p>
            </div>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
            <span className="w-2 h-2 rounded-full bg-accent-blue opacity-60"></span>
            <span className="w-2 h-2 rounded-full bg-accent-blue opacity-30"></span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-xs leading-relaxed mb-4">
          The core engine powering the portfolio generation system. Built with performance...
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-4">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Stars</p>
            <p className="text-text-primary text-lg font-semibold">1.2k</p>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Forks</p>
            <p className="text-text-primary text-lg font-semibold">248</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-tag-bg text-tag-text text-xs px-3 py-1 rounded-full border border-border-custom"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="flex justify-end">
          <Share2 size={16} className="text-text-muted" />
        </div>

      </div>
    </section>
  );
};

export default RepoCard;