import { CloudUpload, Palette, Zap, Link } from 'lucide-react';

const features = [
  {
    icon: <CloudUpload size={22} className="text-accent-blue" />,
    title: 'Import repositories',
    desc: 'One-click sync with your GitHub account. Select the repos you want to showcase and we\'ll handle the rest.',
  },
  {
    icon: <Palette size={22} className="text-accent-teal" />,
    title: 'Custom Themes',
    desc: 'Choose from 12+ meticulously designed developer themes from minimalist to high-tech.',
  },
  {
    icon: <Zap size={22} className="text-accent-blue" />,
    title: 'Live Preview',
    desc: 'See your changes in real-time. Instantly visualize how recruiters see your work.',
  },
  {
    icon: <Link size={22} className="text-accent-teal" />,
    title: 'Shareable URL',
    desc: 'Get a custom repo.profile/username link that\'s clean, professional, and ready for your CV.',
  },
];

const Features = () => {
  return (
    <section className="bg-bg-primary px-5 py-10">

      <h2 className="text-text-primary text-2xl font-bold text-center mb-10">
        Built for Architects of Code
      </h2>

      <div className="flex flex-col gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-bg-card border border-border-custom rounded-xl p-5"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="text-text-primary text-base font-semibold mb-2">{f.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Features;