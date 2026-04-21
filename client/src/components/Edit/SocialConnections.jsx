import { Link2 } from 'lucide-react';

const SocialConnections = () => {
  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Link2 size={16} className="text-accent-blue" />
        <h2 className="text-text-primary text-base font-bold">Social Connections</h2>
      </div>

      {/* LinkedIn */}
      <div className="mb-3">
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2">LinkedIn Profile</p>
        <div className="flex items-center bg-bg-primary border border-border-custom rounded-lg overflow-hidden">
          <span className="text-text-muted text-xs px-3 py-2.5 border-r border-border-custom whitespace-nowrap">
            linkedin.com/in/
          </span>
          <input
            type="text"
            defaultValue="devname-official"
            className="flex-1 bg-transparent px-3 py-2.5 text-text-primary text-sm outline-none placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Twitter */}
      <div className="mb-3">
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Twitter / X</p>
        <div className="flex items-center bg-bg-primary border border-border-custom rounded-lg overflow-hidden">
          <span className="text-text-muted text-sm px-3 py-2.5 border-r border-border-custom">
            @
          </span>
          <input
            type="text"
            placeholder="username"
            className="flex-1 bg-transparent px-3 py-2.5 text-text-primary text-sm outline-none placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Personal Website */}
      <div>
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Personal Website</p>
        <div className="flex items-center bg-bg-primary border border-border-custom rounded-lg overflow-hidden">
          <span className="text-text-muted text-xs px-3 py-2.5 border-r border-border-custom">
            https://
          </span>
          <input
            type="text"
            defaultValue="portfolio.devname.io"
            className="flex-1 bg-transparent px-3 py-2.5 text-text-primary text-sm outline-none placeholder:text-text-muted"
          />
        </div>
      </div>

    </div>
  );
};

export default SocialConnections;