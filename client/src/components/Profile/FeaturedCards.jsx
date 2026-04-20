import RepoCard from './RepoCard';

const repos = [
  {
    name: 'Skyline Framework',
    description: 'A high-performance microservices framework for Go, optimized for...',
    stars: '1.2k',
    image: 'https://placehold.co/400x160/0d1117/2d9cdb?text=Skyline+Framework',
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    name: 'NeuralGraph DB',
    description: 'Real-time graph analysis engine built on top of Rust with native support...',
    stars: '840',
    image: 'https://placehold.co/400x160/0d1117/1abc9c?text=NeuralGraph+DB',
    githubUrl: '#',
    demoUrl: '#',
  },
];

const FeaturedRepositories = () => {
  const visible = repos.slice(0, 3);

  return (
    <section className="bg-bg-primary px-5 py-6">

      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
        Featured Repositories
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Actual cards */}
        {visible.map((repo) => (
          <RepoCard key={repo.name} {...repo} />
        ))}

        {/* Ghost cards to keep size consistent when less than 3 */}
        {visible.length < 3 &&
          Array.from({ length: 3 - visible.length }).map((_, i) => (
            <div
              key={`ghost-${i}`}
              className="bg-bg-card border border-border-custom rounded-xl overflow-hidden invisible"
            />
          ))
        }

      </div>

    </section>
  );
};

export default FeaturedRepositories;