import { useState } from 'react';
import { X } from 'lucide-react';

const TechStack = () => {
  const [skills, setSkills] = useState([
    'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'AWS'
  ]);
  const [input, setInput] = useState('');

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInput('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-accent-teal text-lg">⬡</span>
          <h2 className="text-text-primary text-base font-bold">Tech Stack</h2>
        </div>
        <span className="text-accent-blue text-xs font-medium uppercase tracking-wide">
          {skills.length} Skills Added
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1.5 bg-bg-primary border border-border-custom text-text-secondary text-xs px-3 py-1.5 rounded-lg"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={11} />
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add a skill (e.g. Kubernetes"
          className="flex-1 bg-bg-primary border border-border-custom rounded-l-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors"
        />
        <button
          onClick={addSkill}
          className="bg-accent-blue hover:opacity-90 text-white text-sm font-medium px-4 py-2.5 rounded-r-lg transition-opacity"
        >
          Add
        </button>
      </div>

    </div>
  );
};

export default TechStack;