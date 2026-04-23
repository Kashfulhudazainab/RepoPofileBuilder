import { useState, useEffect }                        from 'react';
import { GitCommit, Star, GitPullRequest, Users }     from 'lucide-react';
import { getStats }                                   from '../../api/statsApi';

const PerformanceMetrics = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Build metrics array from live data
  const metrics = [
    {
      icon:  <GitCommit size={20} className="text-accent-blue" />,
      value: stats?.commits      ?? '—',
      label: 'Total Commits',
    },
    {
      icon:  <Star size={20} className="text-accent-blue" />,
      value: stats?.stars        ?? '—',
      label: 'Stars Earned',
    },
    {
      icon:  <GitPullRequest size={20} className="text-accent-blue" />,
      value: stats?.pullRequests ?? '—',
      label: 'Pull Requests',
    },
    {
      icon:  <Users size={20} className="text-accent-blue" />,
      value: stats?.oss          ?? '—',
      label: 'OSS Contributions',
    },
  ];

  return (
    <section className="bg-bg-primary px-5 py-6">
      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
        Performance Metrics
      </p>

      {error ? (
        <p className="text-red-400 text-sm">Failed to load stats.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-bg-card border border-border-custom rounded-xl p-4"
            >
              <div className="mb-3">{m.icon}</div>

              {/* Loading skeleton */}
              {loading ? (
                <div className="h-8 w-16 bg-border-custom rounded animate-pulse mb-1" />
              ) : (
                <p className="text-text-primary text-2xl font-bold mb-1">
                  {typeof m.value === 'number'
                    ? m.value.toLocaleString()  // formats 1284 → "1,284"
                    : m.value}
                </p>
              )}

              <p className="text-text-muted text-xs uppercase tracking-wide">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PerformanceMetrics;