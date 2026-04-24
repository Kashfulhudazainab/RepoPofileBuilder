import { useState, useEffect }  from 'react';
import { getFeaturedRepos }      from '../../api/repoApi';
import RepoCard                  from './RepoCard';
import { Link } from 'react-router-dom';

const FeaturedRepositories = () => {
  const [repos, setRepos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getFeaturedRepos();
        setRepos(data);
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
      <div className="flex items-center justify-between mb-5">
      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
        Featured Repositories from github
      </p>
       <Link 
          to="/repos" 
          className="text-accent-blue text-xs font-semibold hover:underline bg-accent-blue/5 px-3 py-1.5 rounded-lg border border-accent-blue/10"
        >
          Manage All
        </Link>
</div>

      {error ? (
        <p className="text-red-400 text-sm">Failed to load repositories.</p>
      ) : loading ? (
        // Skeleton cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-custom rounded-xl overflow-hidden"
            >
              <div className="w-full h-40 bg-border-custom animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-32 bg-border-custom rounded animate-pulse" />
                <div className="h-3 w-full bg-border-custom rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-border-custom rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : repos.length === 0 ? (
        <p className="text-text-muted text-sm">
          No featured repos yet. Mark some repos as featured to show them here.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo._id} {...repo} />
          ))}

          {/* Ghost cards to keep grid consistent */}
          {repos.length < 3 &&
            Array.from({ length: 3 - repos.length }).map((_, i) => (
              <div
                key={`ghost-${i}`}
                className="bg-bg-card border border-border-custom rounded-xl overflow-hidden invisible"
              />
            ))
          }
        </div>
      )}
    </section>
  );
};

export default FeaturedRepositories;