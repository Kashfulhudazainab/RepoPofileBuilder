const MobilePreview = () => {
  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <h2 className="text-text-primary text-base font-bold">Live Mobile Preview</h2>
        </div>
        <div className="flex gap-1">
          <button className="w-6 h-6 bg-bg-primary border border-border-custom rounded flex items-center justify-center">
            <span className="w-3 h-3 border border-text-muted rounded-sm" />
          </button>
          <button className="w-6 h-6 bg-bg-primary border border-border-custom rounded flex items-center justify-center">
            <span className="w-2 h-3 border border-text-muted rounded-sm" />
          </button>
        </div>
      </div>

      {/* Phone mockup */}
      <div className="bg-bg-primary border border-border-custom rounded-2xl p-4 mx-2">

        {/* Avatar + name */}
        <div className="flex flex-col items-center mb-4">
          <div
            className="w-14 h-14 rounded-full mb-2 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}
          >
            <img
              src="https://placehold.co/56x56/0f4c75/ffffff?text=D"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-text-primary text-base font-bold">Developer Name</p>
          <p className="text-accent-blue text-xs font-medium uppercase tracking-wide">
            Full Stack Engineer
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { value: '142', label: 'Repos' },
            { value: '12k', label: 'Commits' },
            { value: '890', label: 'Stars' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="text-text-primary text-sm font-bold">{stat.value}</p>
              <p className="text-text-muted text-xs uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured */}
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Featured</p>
        <div className="flex flex-col gap-2 mb-4">
          {[
            { name: 'nebula-core-...', tag: 'Core',    desc: 'Asynchronous rendering engine for distributed systems...' },
            { name: 'quantum-auth-...', tag: null,     desc: 'Passwordless authentication framework using biometrics...' },
          ].map((repo) => (
            <div key={repo.name} className="bg-bg-card border border-border-custom rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-text-primary text-xs font-semibold">{repo.name}</p>
                {repo.tag && (
                  <span className="bg-accent-blue bg-opacity-20 text-accent-blue text-xs px-1.5 py-0.5 rounded">
                    {repo.tag}
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">{repo.desc}</p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {['TypeScript', 'React', 'AWS', 'Rails'].map((tag) => (
            <span
              key={tag}
              className="bg-bg-card border border-border-custom text-text-secondary text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MobilePreview;