import { Star }        from 'lucide-react';
import { FaGithub }    from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

const RepoCard = ({ name, description, stars, url, homepage }) => {
  return (
    <div className="bg-bg-card border border-border-custom rounded-xl overflow-hidden mb-4">

      {/* Colour banner instead of image (GitHub doesn't provide preview images) */}
      <div
        className="w-full h-40 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f4c75, #1abc9c)' }}
      >
        <span className="text-white text-lg font-bold opacity-60">{name}</span>
      </div>

      <div className="p-4">
        {/* Name + stars */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-text-primary text-base font-semibold">{name}</h3>
          <span className="flex items-center gap-1 text-text-muted text-xs">
            <Star size={12} className="text-accent-blue" />
            {stars?.toLocaleString() ?? 0}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {description || 'No description provided.'}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          {url && (
            
            <a  href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-border-custom text-text-secondary hover:text-text-primary text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <FaGithub size={13} />
              GitHub
            </a>
          )}
          {homepage && (
            
            <a  href={homepage}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-accent-blue hover:opacity-90 text-white text-xs font-medium px-4 py-2 rounded-lg transition-opacity"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;