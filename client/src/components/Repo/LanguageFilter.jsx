import React from 'react';

const LanguageFilter = ({ active, onChange, languages }) => {
  // If the parent hasn't loaded languages yet, return a skeleton or null
  if (!languages || languages.length === 0) return null;

  return (
    <div className="mx-5 mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-lg border transition-all flex-shrink-0 ${
            active === lang
              ? 'bg-bg-card border-accent-blue text-text-primary shadow-sm'
              : 'bg-bg-primary border-border-custom text-text-muted hover:text-text-primary hover:border-text-muted'
          }`}
        >
          {/* Visual indicator for specific languages */}
          {lang !== 'All Languages' ? (
            <span className="w-2 h-2 rounded-full bg-accent-blue" />
          ) : (
            <span className="text-text-muted text-[10px]">⬚</span>
          )}
          
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageFilter;