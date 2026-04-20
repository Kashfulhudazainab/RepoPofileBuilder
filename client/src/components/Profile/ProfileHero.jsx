import { Mail, Code, Share2 } from 'lucide-react';

const ProfileHero = () => {
  return (
    <section className="bg-bg-primary px-5 pt-8 pb-6">

      <div className="flex flex-col md:flex-row md:gap-8 md:items-start">

        {/* Left — text content */}
        <div className="flex-1">
          <h1 className="text-text-primary text-3xl font-bold mb-1">Alex Rivera</h1>
          <p className="text-accent-blue text-sm font-medium mb-4">Senior Software Engineer</p>

          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            Architecting scalable cloud infrastructure and crafting high-performance
            user interfaces. Specialized in TypeScript, Go, and distributed systems.
          </p>

          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-opacity">
              <Mail size={14} />
              Contact Me
            </button>
            <button className="border border-border-custom text-text-secondary hover:text-text-primary p-2 rounded-lg transition-colors">
              <Code size={16} />
            </button>
            <button className="border border-border-custom text-text-secondary hover:text-text-primary p-2 rounded-lg transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Right — avatar */}
        <div className="w-full md:w-56 h-64 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}>
          <img
            src="https://placehold.co/400x300/0f4c75/ffffff?text=Avatar"
            alt="Alex Rivera"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

    </section>
  );
};

export default ProfileHero;