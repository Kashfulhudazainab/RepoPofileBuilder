import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-text-muted hover:text-text-primary mb-8 text-sm transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back
        </button>
        
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-text-muted text-sm mb-10">Last updated: April 21, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-text-muted leading-relaxed">
              We collect your GitHub username, email, and public repository data via the GitHub API to generate your profile. We do not store your private repository code or sensitive auth tokens.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. How We Use Data</h2>
            <p className="text-text-muted leading-relaxed">
              Your data is used strictly to display your portfolio. We do not share or sell your information to third parties or use it for advertisement targeting.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Security</h2>
            <p className="text-text-muted leading-relaxed">
              We use industry-standard encryption to protect your account data. You can delete your profile and all associated data at any time through your dashboard settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}