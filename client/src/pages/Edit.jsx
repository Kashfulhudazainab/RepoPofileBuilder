import { useState } from 'react';
import { Eye, Pencil } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import TechStack from '../components/Edit/TechStack';
import FeaturedProjects from '../components/Edit/FeaturedProjects';
import SocialConnections from '../components/Edit/SocialConnections';
import MobilePreview from '../components/Edit/MobilePreview';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Edit = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="px-5 pt-8 pb-6">

        {/* Page heading */}
        <h1 className="text-text-primary text-3xl font-bold mb-1">Portfolio Editor</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          Craft your professional narrative and showcase your finest work.
        </p>

        {/* Edit / Live Preview tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'edit'
                ? 'bg-accent-blue text-white'
                : 'border border-border-custom text-text-secondary hover:text-text-primary'
            }`}
          >
            <Pencil size={14} />
            Edit
          </button>
          <Link to='/profile'>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'preview'
                ? 'bg-accent-blue text-white'
                : 'border border-border-custom text-text-secondary hover:text-text-primary'
            }`}
          >
            <Eye size={14} />
            Live Preview
          </button>
          </Link>
        </div>

        {/* Sections */}
        <TechStack />
        <FeaturedProjects />
        <SocialConnections user={user} />
        {/* <MobilePreview /> */}

      </div>

      <Footer />
    </div>
  );
};

export default Edit;