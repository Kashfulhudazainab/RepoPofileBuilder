import { useState } from 'react';
import { Link2, Save, CheckCircle2 } from 'lucide-react';
import { saveSocials } from '../../api/authApi';

const SocialConnections = ({ user }) => {
  // Initialize state to match the user object structure
  const [form, setForm] = useState({
    email: user?.email || '',
    linkedin: user?.socials?.linkedin || '',
    twitter: user?.socials?.twitter || '',
    website: user?.socials?.website || '',
    phone: user?.socials?.phone || '',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// inside SocialConnections.jsx

const handleSave = async () => {
  setSaving(true);
  
  // Create the exact structure your Mongoose Schema expects
  const payload = {
    email: form.email, // Top level email
    socials: {
      email: form.email,
      twitter: form.twitter,
      linkedin: form.linkedin,
      website: form.website,
      phone: form.phone,
    }
  };

  console.log("Sending to Backend:", payload); // Check your console for this!

  try {
    const res = await saveSocials(payload);
    console.log("Backend Saved Successfully:", res.data);
    setSaved(true);
    // Reload the page to force the ProfileHero to get the new data
    setTimeout(() => window.location.reload(), 1500); 
  } catch (err) {
    console.error('Save failed:', err);
  } finally {
    setSaving(false);
  }
};

  const fields = [
    {
      key: 'email',
      label: 'Public Contact Email',
      prefix: 'mailto:',
      placeholder: 'yourname@example.com',
      type: 'email',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      prefix: 'linkedin.com/in/',
      placeholder: 'username',
      type: 'text',
    },
    {
      key: 'twitter',
      label: 'Twitter / X',
      prefix: '@',
      placeholder: 'username',
      type: 'text',
    },
    {
      key: 'website',
      label: 'Personal Website',
      prefix: 'https://',
      placeholder: 'portfolio.com',
      type: 'text',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      prefix: '+',
      placeholder: '1 234 567 8900',
      type: 'tel',
    },
  ];

  return (
    <div className="bg-bg-card border border-border-custom rounded-xl p-4 mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Link2 size={16} className="text-accent-blue" />
        <h2 className="text-text-primary text-base font-bold">Social Connections</h2>
      </div>

      {/* Fields */}
      <div className="space-y-4 mb-5">
        {fields.map(({ key, label, prefix, placeholder, type }) => (
          <div key={key}>
            <p className="text-text-muted text-[10px] uppercase tracking-widest mb-2 font-semibold">
              {label}
            </p>
            <div className="flex items-center bg-bg-primary border border-border-custom rounded-lg overflow-hidden focus-within:border-accent-blue transition-colors group">
              {prefix && (
                <span className="text-text-muted text-xs px-3 py-2.5 border-r border-border-custom bg-bg-card/50 whitespace-nowrap group-focus-within:text-accent-blue transition-colors">
                  {prefix}
                </span>
              )}
              <input
                type={type}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 bg-transparent px-3 py-2.5 text-text-primary text-sm outline-none placeholder:text-text-muted"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-95 ${
          saved
            ? 'bg-accent-teal'
            : 'bg-accent-blue hover:opacity-90 shadow-lg shadow-accent-blue/20'
        } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {saved ? (
          <>
            <CheckCircle2 size={15} /> Saved Successfully!
          </>
        ) : (
          <>
            <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
          </>
        )}
      </button>
    </div>
  );
};

export default SocialConnections;