import { FaGithub } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="bg-bg-primary px-5 py-14 flex flex-col items-center text-center">

      <h2 className="text-text-primary text-3xl font-bold leading-tight mb-8">
        Ready to level up your portfolio?
      </h2>

      <button className="flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white font-medium text-sm px-8 py-3 rounded-lg transition-opacity mb-4">
        Get Started for Free
        <span>→</span>
      </button>

      <p className="text-text-muted text-xs tracking-widest uppercase">
        No credit card required • GitHub auth required
      </p>

    </section>
  );
};

export default CTA;