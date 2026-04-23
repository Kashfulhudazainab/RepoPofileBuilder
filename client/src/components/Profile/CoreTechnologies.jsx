import { useState, useEffect }  from 'react';
import { getMyLanguages }        from '../../api/repoApi';

const CoreTechnologies = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyLanguages();
        setLanguages(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section className="bg-bg-primary px-5 py-6">
      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
        Core Technologies
      </p>

      {error ? (
        <p className="text-red-400 text-sm">Failed to load languages.</p>
      ) : loading ? (
        // Skeleton
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-20 bg-bg-card border border-border-custom rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : languages.length === 0 ? (
        <p className="text-text-muted text-sm">
          No languages found. Sync your repos first.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="bg-bg-card border border-border-custom text-text-secondary text-xs px-3 py-1.5 rounded-lg hover:text-text-primary hover:border-accent-blue transition-colors cursor-default"
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