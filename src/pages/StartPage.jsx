import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  BookOpen,
  User,
  Calendar,
  Clock,
  ArrowRight,
  Scan,
  Camera,
  Volume2,
} from 'lucide-react';

export default function StartPage({ onStart }) {
  const navigate = useNavigate();
  const [subjectCode, setSubjectCode] = useState('');
  const [professor, setProfessor] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [isHovered, setIsHovered] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (!subjectCode.trim() || !professor.trim() || !date || !startTime || !endTime) return;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const durationMs = ((endH * 60 + endM) - (startH * 60 + startM)) * 60 * 1000;

    onStart({
      subjectCode: subjectCode.trim(),
      professor: professor.trim(),
      date,
      startTime,
      endTime,
      startedAt: Date.now(),
      durationMs: Math.max(durationMs, 0),
    });
    navigate('/');
  };

  const canStart = subjectCode.trim() && professor.trim() && date && startTime && endTime;

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo & Title */}
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

        {/* Form Card */}
        <form onSubmit={handleStart}>
          <div className="glass-card p-8 space-y-6">
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-text-primary">Session Setup</h2>
              <p className="text-xs text-text-secondary mt-1">Enter details before starting monitoring</p>
            </div>

            {/* Subject Code */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={14} className="text-accent-blue" />
                Subject Code
              </label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="e.g. CS 321"
                className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium placeholder-text-secondary/50 outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
              />
            </div>

            {/* Professor */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <User size={14} className="text-accent-cyan" />
                Professor
              </label>
              <input
                type="text"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="e.g. Dr. Juan Dela Cruz"
                className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium placeholder-text-secondary/50 outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-accent-green" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
              />
            </div>

            {/* Start Time & End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} className="text-accent-yellow" />
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} className="text-accent-red" />
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-text-primary text-sm font-medium outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/25 transition-all"
                />
              </div>
            </div>

            {/* Feature indicators */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Camera size={14} className="text-accent-blue" />
                <span>Video Feed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Scan size={14} className="text-accent-cyan" />
                <span>AI Detection</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Volume2 size={14} className="text-accent-green" />
                <span>Audio Monitor</span>
              </div>
            </div>

            {/* Start Button */}
            <button
              type="submit"
              disabled={!canStart}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                canStart
                  ? 'gradient-blue shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:scale-[1.02]'
                  : 'bg-dark-card border border-dark-border text-text-secondary cursor-not-allowed'
              }`}
            >
              Start Monitoring
              <ArrowRight size={18} className={`transition-transform duration-300 ${isHovered && canStart ? 'translate-x-1' : ''}`} />
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
