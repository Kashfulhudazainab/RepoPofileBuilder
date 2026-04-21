import { Link,useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
        
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-text-muted text-sm mb-10">Last updated: April 21, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-text-muted leading-relaxed">
              By using RepoProfile, you agree to follow these terms. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. User Content</h2>
            <p className="text-text-muted leading-relaxed">
              You retain ownership of the content you import from GitHub. You grant RepoProfile a license to display this data on your public-facing portfolio page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Service Limitations</h2>
            <p className="text-text-muted leading-relaxed">
              RepoProfile is provided "as is." We are not liable for any service interruptions, data loss from GitHub API changes, or unauthorized access to your account.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}