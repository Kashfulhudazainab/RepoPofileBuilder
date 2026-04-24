import { useState, useEffect } from 'react';
import { getMyLanguages } from '../../api/repoApi';


const CoreTechnologies = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyLanguages();
        
        // Handle both Array and Object formats from API
        const languageList = Array.isArray(data) ? data : Object.keys(data);
        
        setLanguages(languageList);
      } catch (err) {
        console.error("Core Tech Load Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section className="bg-bg-primary px-5 py-6">
      <div className="flex items-center gap-2 mb-4">
       
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
          Core Technologies
        </p>
      </div>

      {error ? (
        <p className="text-red-400 text-xs">Failed to load languages.</p>
      ) : loading ? (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 bg-bg-card border border-border-custom rounded-xl animate-pulse" />
          ))}
        </div>
      ) : languages.length === 0 ? (
        <p className="text-text-muted text-xs italic">No technologies listed yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="bg-bg-card border border-border-custom text-text-secondary text-xs px-4 py-2 rounded-xl hover:text-text-primary hover:border-accent-blue/50 transition-all cursor-default font-medium shadow-sm"
            >
              {lang}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default CoreTechnologies;