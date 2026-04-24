import { useState, useEffect } from 'react';
import { Trash2, GripVertical, Loader2, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMyRepos, toggleFeatured } from '../../api/repoApi';

const FeaturedProjects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch only the repos you manually selected on the "Edit Page"
  const fetchFeatured = async () => {
    try {
      const data = await getMyRepos();
      // Filter logic: Only show projects where featured is true
      const selectedRepos = data.filter((r) => r.featured === true);
      setRepos(selectedRepos);
    } catch (err) {
      console.error("Failed to load featured projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  // 2. Remove Repo (Updates DB and local state)
  const removeRepo = async (id) => {
    try {
      await toggleFeatured(id); // Turns featured: false in backend
      setRepos((prev) => prev.filter((r) => (r._id || r.id) !== id));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-bg-card border border-border-custom rounded-xl p-8 flex justify-center items-center">
        <Loader2 className="animate-spin text-accent-blue" size={20} />
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-lg">★</span>
          <h2 className="text-text-primary text-base font-bold tracking-tight">Featured Projects</h2>
        </div>
        <Link 
          to="/repos" 
          className="text-accent-blue text-xs font-semibold hover:underline bg-accent-blue/5 px-3 py-1.5 rounded-lg border border-accent-blue/10"
        >
          Manage All
        </Link>
      </div>

      {/* Repo list */}
      <div className="flex flex-col gap-2.5">
        {repos.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border-custom rounded-xl bg-bg-primary/30">
            <FolderKanban className="mx-auto text-text-muted mb-2" size={24} />
            <p className="text-text-muted text-xs">No projects featured yet.</p>
            <Link to="/repos" className="text-accent-blue text-[10px] uppercase font-bold mt-2 block">
              Add Projects +
            </Link>
          </div>
        ) : (
          repos.map((repo) => (
            <div
              key={repo._id || repo.id}
              className="flex items-center gap-3 bg-bg-primary border border-border-custom rounded-xl p-3.5 group hover:border-text-muted/50 transition-all"
            >
              <GripVertical size={16} className="text-text-muted flex-shrink-0 cursor-grab" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-text-primary text-sm font-bold truncate">{repo.name}</p>
                  {repo.language && (
                    <span className="text-[10px] text-accent-blue font-medium px-1.5 py-0.5 bg-accent-blue/5 rounded border border-accent-blue/10">
                      {repo.language}
                    </span>
                  )}
                </div>
                <p className="text-text-secondary text-xs truncate mt-0.5 font-medium">
                  {repo.description || "No description provided."}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  onClick={() => removeRepo(repo._id || repo.id)}
                  title="Remove from featured"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProjects;