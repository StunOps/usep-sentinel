import {
  Camera,
  HardDrive,
  Server,
  Wifi,
} from 'lucide-react';
import { systemInfo } from '../data/mockData';

export default function SystemInfo() {
  return (
    <div className="space-y-6">
      {/* Camera Status */}
      <div className="glass-card overflow-hidden animate-fade-in-up">
        <div className="px-7 py-5 border-b border-dark-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-blue flex items-center justify-center">
            <Camera size={16} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Camera Status
          </h3>
        </div>
        <div className="p-7 space-y-4">
          {systemInfo.cameras.map((cam) => (
            <div
              key={cam.name}
              className="flex items-center justify-between p-5 rounded-xl bg-dark-card/50 border border-dark-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg gradient-blue flex items-center justify-center">
                  <Camera size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{cam.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">HD 1080p • 30 FPS</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Wifi size={14} className="text-accent-green" />
                <span className="text-sm font-semibold text-accent-green">{cam.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div className="glass-card p-7 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg gradient-purple flex items-center justify-center">
            <HardDrive size={16} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Storage
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Storage Used</span>
            <span className="font-bold text-text-primary">{systemInfo.storageUsed}</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-dark-border overflow-hidden">
            <div
              className="h-full rounded-full gradient-blue transition-all duration-1000"
              style={{ width: systemInfo.storageUsed }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary">
            <span>0 GB</span>
            <span>500 GB</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-7 border-l-4 border-l-accent-yellow animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg gradient-yellow flex items-center justify-center shrink-0 mt-0.5">
            <Server size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-accent-yellow uppercase tracking-wider mb-2">
              Notice
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              This system info panel displays simulated data for UI demonstration
              purposes. No real system connection, AI model, or camera feed is
              active. All values shown are hardcoded mock data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
