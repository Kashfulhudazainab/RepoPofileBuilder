const CurateHero = ({ selected, max = 5 }) => {
  const percentage = (selected / max) * 100;

  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-5 mx-5 mt-6 mb-4">

      <h1 className="text-text-primary text-2xl font-bold leading-tight mb-3">
        Curate Your Showcase
      </h1>

      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        Select up to {max} repositories to feature on your public profile.
        These will be highlighted as your primary technical achievements.
      </p>

      {/* Slot utilization */}
      <div className="flex flex-col items-center">
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
          Slot Utilization
        </p>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-text-primary text-4xl font-bold">{selected}</span>
          <span className="text-text-muted text-lg mb-1">/ {max}</span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-bg-primary rounded-full h-1.5">
          <div
            className="bg-accent-blue h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default CurateHero;