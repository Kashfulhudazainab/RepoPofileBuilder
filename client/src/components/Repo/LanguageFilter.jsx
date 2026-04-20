const languages = ['All Languages', 'JavaScript', 'TypeScript', 'Rust', 'Go', 'Python', 'C++'];

const LanguageFilter = ({ active, onChange }) => {
  return (
    <div className="mx-5 mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors flex-shrink-0 ${
            active === lang
              ? 'bg-bg-card border-accent-blue text-text-primary'
              : 'bg-bg-primary border-border-custom text-text-muted hover:text-text-primary'
          }`}
        >
          {lang !== 'All Languages' && (
            <span className="w-2 h-2 rounded-full bg-accent-blue" />
          )}
          {lang === 'All Languages' && (
            <span className="text-text-muted">⊟</span>
          )}
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageFilter;