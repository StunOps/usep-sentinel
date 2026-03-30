import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

export default function NoiseLevel() {
  const [level, setLevel] = useState(35);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((prev) => {
        const delta = (Math.random() - 0.5) * 12;
        return Math.min(100, Math.max(5, prev + delta));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const rounded = Math.round(level);

  const getStatus = () => {
    if (rounded >= 75) return { label: 'Loud', color: 'text-accent-red', bg: 'bg-accent-red', barColor: 'from-accent-yellow to-accent-red' };
    if (rounded >= 50) return { label: 'Moderate', color: 'text-accent-yellow', bg: 'bg-accent-yellow', barColor: 'from-accent-green to-accent-yellow' };
    return { label: 'Quiet', color: 'text-accent-green', bg: 'bg-accent-green', barColor: 'from-accent-blue to-accent-green' };
  };

  const status = getStatus();

  const VolumeIcon = rounded >= 75 ? Volume2 : rounded >= 50 ? Volume1 : VolumeX;

  return (
    <div className="glass-card p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            rounded >= 75 ? 'gradient-red' : rounded >= 50 ? 'gradient-yellow' : 'gradient-green'
          }`}>
            <VolumeIcon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Noise Level
            </p>
            <p className={`text-sm font-bold ${status.color} mt-0.5`}>
              {status.label}
            </p>
          </div>
        </div>
        <span className={`text-2xl font-extrabold ${status.color}`}>
          {rounded}<span className="text-sm font-medium ml-0.5">dB</span>
        </span>
      </div>

      {/* Level bar */}
      <div className="w-full h-3 rounded-full bg-dark-border overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${status.barColor} transition-all duration-700 ease-out`}
          style={{ width: `${rounded}%` }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-2 text-[10px] text-text-secondary/60 font-medium">
        <span>Quiet</span>
        <span>Moderate</span>
        <span>Loud</span>
      </div>
    </div>
  );
}
