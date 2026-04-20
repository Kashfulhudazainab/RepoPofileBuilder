import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mx-5 mb-4">
      <div className="flex items-center gap-3 bg-bg-card border border-border-custom rounded-xl px-4 py-3">
        <Search size={16} className="text-text-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by repository name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;