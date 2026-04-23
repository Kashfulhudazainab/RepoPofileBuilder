import { useState, useEffect }  from 'react';
import { FaGithub }             from 'react-icons/fa';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate }    from 'react-router-dom';
import { useAuth }              from '../context/AuthContext';
import { loginWithGithub }      from '../api/authApi';

const passwordRules = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter',  test: (p) => /[A-Z]/.test(p) },
  { label: 'One number',            test: (p) => /[0-9]/.test(p) },
];

const AuthPage = () => {
  const [tab, setTab]               = useState('login');
  const [showPassword, setShowPass] = useState(false);
  const [showConfirm, setShowConf]  = useState(false);
  const [agreed, setAgreed]         = useState(false);
  const [form, setForm]             = useState({ name: '', email: '', password: '', confirm: '' });

  const { user }   = useAuth();
  const navigate   = useNavigate();

  useEffect(() => {
    if (user) navigate('/profile');
 
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-5 py-10">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 bg-accent-blue rounded-md flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
            <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3" />
          </svg>
        </div>
        <Link to="/" className="text-text-primary font-medium text-base hover:opacity-80 transition-opacity">
          RepoProfile
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-bg-card border border-border-custom rounded-2xl p-6 shadow-xl">

        {/* Tab switcher */}
        <div className="flex bg-bg-primary rounded-xl p-1 mb-6 border border-border-custom">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-accent-blue text-white shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${
              tab === 'register'
                ? 'bg-accent-blue text-white shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-text-primary text-2xl font-bold mb-1">
          {tab === 'login' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          {tab === 'login'
            ? 'Sign in to continue to your profile'
            : 'Build your developer portfolio today'}
        </p>

        {/* GitHub OAuth */}
        <button
          onClick={loginWithGithub}
          className="w-full flex items-center justify-center gap-2 bg-bg-primary border border-border-custom hover:border-accent-blue text-text-primary text-sm font-medium py-3 rounded-xl transition-colors mb-5"
        >
          <FaGithub size={17} />
          {tab === 'login' ? 'Continue with GitHub' : 'Sign up with GitHub'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border-custom" />
          <span className="text-text-muted text-xs">
            {tab === 'login' ? 'or sign in with email' : 'or register with email'}
          </span>
          <div className="flex-1 h-px bg-border-custom" />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">

          {/* Name — register only */}
          {tab === 'register' && (
            <div>
              <label className="text-text-secondary text-xs uppercase tracking-widest mb-2 block font-semibold">Full Name</label>
              <div className="flex items-center gap-3 bg-bg-primary border border-border-custom focus-within:border-accent-blue rounded-xl px-4 py-3 transition-colors">
                <User size={15} className="text-text-muted flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  placeholder="Alex Rivera"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none w-full"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-text-secondary text-xs uppercase tracking-widest mb-2 block font-semibold">Email</label>
            <div className="flex items-center gap-3 bg-bg-primary border border-border-custom focus-within:border-accent-blue rounded-xl px-4 py-3 transition-colors">
              <Mail size={15} className="text-text-muted flex-shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-text-secondary text-xs uppercase tracking-widest mb-2 block font-semibold">Password</label>
            <div className="flex items-center gap-3 bg-bg-primary border border-border-custom focus-within:border-accent-blue rounded-xl px-4 py-3 transition-colors">
              <Lock size={15} className="text-text-muted flex-shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none w-full"
              />
              <button onClick={() => setShowPass(!showPassword)} className="text-text-muted hover:text-text-primary transition-colors">
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

        </div>

        {/* Password Footer (Forgot / Rules) */}
        <div className="mt-2 mb-5">
          {tab === 'login' ? (
            <div className="flex justify-end">
              <button className="text-accent-blue text-xs hover:opacity-80 transition-opacity font-medium">
                Forgot password?
              </button>
            </div>
          ) : (
            form.password.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-4">
                {passwordRules.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-2">
                    <CheckCircle2
                      size={13}
                      className={rule.test(form.password) ? 'text-accent-teal' : 'text-text-muted'}
                    />
                    <span className={`text-xs ${rule.test(form.password) ? 'text-accent-teal' : 'text-text-muted'}`}>
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Confirm password — register only */}
        {tab === 'register' && (
          <div className="mb-6">
            <label className="text-text-secondary text-xs uppercase tracking-widest mb-2 block font-semibold">Confirm Password</label>
            <div className={`flex items-center gap-3 bg-bg-primary border rounded-xl px-4 py-3 transition-colors ${
              form.confirm.length > 0
                ? form.confirm === form.password ? 'border-accent-teal' : 'border-red-500'
                : 'border-border-custom focus-within:border-accent-blue'
            }`}>
              <Lock size={15} className="text-text-muted flex-shrink-0" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                className="bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none w-full"
              />
              <button onClick={() => setShowConf(!showConfirm)} className="text-text-muted hover:text-text-primary transition-colors">
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {form.confirm.length > 0 && form.confirm !== form.password && (
              <p className="text-red-400 text-xs mt-1.5 font-medium">Passwords do not match</p>
            )}
          </div>
        )}

        {/* Terms and Conditions — register only */}
        {tab === 'register' && (
          <div className="flex items-start gap-3 mb-6 px-1">
            <div className="relative flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-border-custom bg-bg-primary checked:bg-accent-blue checked:border-accent-blue transition-all"
              />
              <svg
                className="absolute h-3 w-3 pointer-events-none hidden peer-checked:block text-white left-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label htmlFor="terms" className="text-xs text-text-secondary leading-tight cursor-pointer select-none">
              I agree to the{' '}
              <Link to="/terms" className="text-accent-blue hover:underline font-medium">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-accent-blue hover:underline font-medium">Privacy Policy</Link>.
            </label>
          </div>
        )}

        {/* Submit */}
        <button
          disabled={tab === 'register' && !agreed}
          className={`w-full bg-accent-blue text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-lg shadow-accent-blue/20 ${
            tab === 'register' && !agreed
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:opacity-90 hover:-translate-y-0.5'
          }`}
        >
          {tab === 'login' ? 'Sign In' : 'Create Account'}
        </button>

      </div>
    </div>
  );
};

export default AuthPage;