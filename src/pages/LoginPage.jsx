import { useState } from 'react';
import { Shield, User, Lock, LogIn } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => onLogin(), 800);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-accent-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-blue shadow-lg shadow-accent-blue/25 mb-6">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-2">
            Sentinel
          </h1>
          <p className="text-text-secondary text-sm uppercase tracking-[0.25em] font-medium">
            Classroom Monitoring System
          </p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit}>
          <div className="glass-card p-8 space-y-6">
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-text-primary">Sign In</h2>
              <p className="text-xs text-text-secondary mt-1">Enter your credentials to continue</p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <User size={14} className="text-accent-blue" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium placeholder-text-secondary/50 outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} className="text-accent-cyan" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium placeholder-text-secondary/50 outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                isLoading
                  ? 'bg-accent-blue/50 cursor-wait'
                  : 'gradient-blue shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] text-text-secondary/50 mt-8">
          Sentinel v1.0 — UI Prototype for Research Demonstration
        </p>
      </div>
    </div>
  );
}
