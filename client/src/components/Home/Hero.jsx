import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-bg-primary px-5 pt-10 pb-8">

      <h1 className="text-text-primary text-4xl font-bold leading-tight mb-3">
        Your Repo, <br />
        <span className="text-accent-blue">Your Story.</span>
      </h1>

      <p className="text-text-secondary text-sm leading-relaxed mb-8">
        Automatically turn your GitHub profile into a recruiter-ready
        portfolio in minutes. Stop manually updating static sites and let
        your code speak for itself.
      </p>
 <Link to='/auth'>
      <button className="w-full flex items-center justify-center gap-2 bg-accent-blue hover:opacity-90 text-white font-medium text-sm py-3 rounded-lg transition-opacity mb-3">
        <FaGithub size={16} />
       Sign in with GitHub
      </button>
</Link>

<Link to='/profile'>
      <button className="w-full border border-border-custom text-text-secondary hover:text-text-primary text-sm font-medium py-3 rounded-lg transition-colors">
        View Demo
      </button>
      </Link>

    </section>
  );
};

export default Hero;