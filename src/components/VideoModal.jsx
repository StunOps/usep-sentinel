import { X, Camera, Clock, Armchair, AlertTriangle } from 'lucide-react';

export default function VideoModal({ record, onClose }) {
    if (!record) return null;

    const cameraImage =
        record.camera === 'Camera 1' || record.camera === 'Cam 1'
            ? '/images/Front.png'
            : '/images/Mid.png';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-overlay"
            onClick={onClose}
        >
            <div
                className="glass-card w-full max-w-2xl overflow-hidden animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-dark-border">
                    <h3 className="text-base font-bold text-text-primary uppercase tracking-wider">
                        Incident Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Image */}
                <div className="relative">
                    <img src={cameraImage} alt={`${record.camera} feed`} className="w-full h-72 object-cover" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600/80 text-white text-[10px] font-bold uppercase">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse-rec" />
                        REC
                    </div>
                    <div className="absolute bottom-4 right-4 glass-card px-4 py-3 text-sm">
                        <span className="text-accent-red font-bold">⚠ Detected:</span>{' '}
                        <span className="text-text-primary font-semibold">{record.type}</span>
                    </div>
                </div>

                {/* Metadata */}
                <div className="p-8 grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl gradient-purple flex items-center justify-center">
                            <Armchair size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] text-text-secondary uppercase tracking-wider">Seat No</p>
                            <p className="text-base font-bold text-text-primary mt-0.5">{record.seat}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl gradient-red flex items-center justify-center">
                            <AlertTriangle size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] text-text-secondary uppercase tracking-wider">Type</p>
                            <p className="text-base font-bold text-text-primary mt-0.5">{record.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl gradient-blue flex items-center justify-center">
                            <Camera size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] text-text-secondary uppercase tracking-wider">Camera</p>
                            <p className="text-base font-bold text-text-primary mt-0.5">{record.camera}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl gradient-green flex items-center justify-center">
                            <Clock size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] text-text-secondary uppercase tracking-wider">Timestamp</p>
                            <p className="text-base font-bold text-text-primary mt-0.5">{record.time}</p>
                        </div>
                    </div>
                </div>

                {/* Close button */}
                <div className="px-8 pb-7">
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-dark-card border border-dark-border text-text-secondary text-sm font-semibold hover:text-text-primary hover:border-accent-blue transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
