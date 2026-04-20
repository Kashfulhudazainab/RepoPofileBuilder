import { GitCommit, Star, GitPullRequest, Users } from 'lucide-react';

const metrics = [
  { icon: <GitCommit size={20} className="text-accent-blue" />, value: '1,284', label: 'Total Commits' },
  { icon: <Star size={20} className="text-accent-blue" />,      value: '452',   label: 'Stars Earned' },
  { icon: <GitPullRequest size={20} className="text-accent-blue" />, value: '312', label: 'Pull Requests' },
  { icon: <Users size={20} className="text-accent-blue" />,     value: '84',    label: 'OSS Contributions' },
];

const PerformanceMetrics = () => {
  return (
    <section className="bg-bg-primary px-5 py-6">

      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
        Performance Metrics
      </p>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-bg-card border border-border-custom rounded-xl p-4"
          >
            <div className="mb-3">{m.icon}</div>
            <p className="text-text-primary text-2xl font-bold mb-1">{m.value}</p>
            <p className="text-text-muted text-xs uppercase tracking-wide">{m.label}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default PerformanceMetrics;