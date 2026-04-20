const tags = [
  'TypeScript', 'GoLang', 'React/Next.js',
  'PostgreSQL', 'Kubernetes', 'GraphQL',
  'Rust', 'AWS', 'Docker',
];

const CoreTechnologies = () => {
  return (
    <section className="bg-bg-primary px-5 py-6">

      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
        Core Technologies
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-bg-card border border-border-custom text-text-secondary text-xs px-3 py-1.5 rounded-lg hover:text-text-primary hover:border-accent-blue transition-colors cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

    </section>
  );
};

export default CoreTechnologies;