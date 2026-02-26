import { X, AlertTriangle, Video, XCircle } from 'lucide-react';

export default function AlertPopup({ alert, onDismiss, onViewVideo }) {
    if (!alert) return null;

    return (
        <div className="fixed top-20 right-6 z-50 w-96 animate-slide-in-right">
            <div className="glass-card border-l-4 border-l-accent-red overflow-hidden">
                <div className="h-1 w-full gradient-red" />

                <div className="p-7">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg gradient-red flex items-center justify-center animate-pulse-rec">
                                <AlertTriangle size={18} className="text-white" />
                            </div>
                            <span className="text-sm font-bold text-accent-red uppercase tracking-wider">
                                Cheating Detected
                            </span>
                        </div>
                        <button
                            onClick={onDismiss}
                            className="text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Seat No:</span>
                            <span className="text-text-primary font-semibold">{alert.seat}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Type:</span>
                            <span className="text-text-primary font-semibold">{alert.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Camera:</span>
                            <span className="text-text-primary font-semibold">{alert.camera}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Time:</span>
                            <span className="text-text-primary font-semibold">{alert.time}</span>
                        </div>
                        {alert.confidence && (
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Confidence:</span>
                                <span className="text-accent-blue font-semibold">{alert.confidence}%</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onViewVideo}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            <Video size={16} />
                            View Video
                        </button>
                        <button
                            onClick={onDismiss}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-text-secondary text-sm font-semibold hover:text-text-primary transition-colors"
                        >
                            <XCircle size={16} />
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
