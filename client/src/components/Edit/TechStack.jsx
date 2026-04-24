import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import { getMyLanguages, saveCustomStack } from '../../api/repoApi'; // ← add saveCustomStack

const TechStack = () => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getMyLanguages();
        const languages = Array.isArray(data) ? data : Object.keys(data);
        setSkills(languages);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const addSkill = async () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const newList = [...skills, trimmed];
      setSkills(newList);
      setInput('');
      await saveCustomStack(newList); // ← now correctly imported
    }
  };

  const removeSkill = async (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    await saveCustomStack(updatedSkills); // ← use same saveCustomStack
  };

  if (loading) {
    return (
      <div className="bg-bg-card border border-border-custom rounded-xl p-6 flex justify-center">
        <Loader2 className="animate-spin text-accent-blue" size={20} />
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="text-accent-teal" size={18} />
          <h2 className="text-text-primary text-base font-bold">Tech Stack</h2>
        </div>
        <span className="text-accent-blue text-[10px] font-bold uppercase tracking-widest bg-accent-blue/5 px-2 py-1 rounded-md border border-accent-blue/10">
          {skills.length} Languages
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {skills.length === 0 ? (
          <p className="text-text-muted text-xs italic py-2">No languages detected. Add some manually below.</p>
        ) : (
          skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-2 bg-bg-primary border border-border-custom text-text-primary text-xs font-medium px-3 py-1.5 rounded-xl hover:border-accent-blue/50 transition-colors group"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-text-muted hover:text-red-400 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add extra (e.g. Docker)"
          className="flex-1 bg-bg-primary border border-border-custom border-r-0 rounded-l-xl px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors"
        />
        <button
          onClick={addSkill}
          className="bg-accent-blue hover:bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-r-xl transition-all active:scale-95"
        >
          Add
        </button>
      </div>

      <p className="text-[10px] text-text-muted mt-3 italic">
        * Initial stack generated automatically from your GitHub activity.
      </p>
    </div>
  );
};

export default TechStack;