import { useState, useEffect, useRef } from 'react';
import {
    Zap,
    MessageSquare,
    Clock,
    Armchair,
    AlertTriangle,
    Camera,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AlertPopup from '../components/AlertPopup';
import VideoModal from '../components/VideoModal';
import { dashboardStats, cheatingLogs, cheatingTypes } from '../data/mockData';

export default function Dashboard() {
    const [alert, setAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [liveFeed, setLiveFeed] = useState([...cheatingLogs]);
    const feedRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            const seatNum = String(Math.floor(Math.random() * 30) + 1).padStart(2, '0');
            const type = cheatingTypes[Math.floor(Math.random() * cheatingTypes.length)];
            const cam = Math.random() > 0.5 ? 'Camera 1' : 'Camera 2';
            const confidence = Math.floor(Math.random() * 20) + 78;
            const newEntry = { id: Date.now(), time: timeStr, seat: seatNum, type, camera: cam, confidence };
            setLiveFeed((prev) => [newEntry, ...prev].slice(0, 50));
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (feedRef.current) feedRef.current.scrollTop = 0;
    }, [liveFeed]);

    const handleSimulate = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const seatNum = String(Math.floor(Math.random() * 30) + 1).padStart(2, '0');
        const type = cheatingTypes[Math.floor(Math.random() * cheatingTypes.length)];
        const cam = Math.random() > 0.5 ? 'Camera 1' : 'Camera 2';
        const confidence = Math.floor(Math.random() * 20) + 78;
        const newAlert = { id: Date.now(), time: timeStr, seat: seatNum, type, camera: cam, confidence };
        setAlert(newAlert);
        setLiveFeed((prev) => [newAlert, ...prev].slice(0, 50));
    };

    return (
        <div className="space-y-6">
            {/* ─── ROW 1: Stat Cards ─── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {dashboardStats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} delay={i * 80} />
                ))}
            </div>

            {/* ─── ROW 2: Camera Feeds ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Camera 1 */}
                <div className="glass-card overflow-hidden">
                    <div className="relative">
                        <img
                            src="/images/Front.png"
                            alt="Camera 1 — Front View"
                            className="w-full h-56 sm:h-64 lg:h-80 object-cover"
                        />
                        <div className="absolute inset-0 scan-line overflow-hidden pointer-events-none" />
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600/80 text-white text-[10px] font-bold uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse-rec" />
                            REC
                        </div>

                    </div>
                    <div className="px-6 py-4 flex items-center gap-3 border-t border-dark-border">
                        <div className="w-9 h-9 rounded-lg gradient-blue flex items-center justify-center shrink-0">
                            <Camera size={16} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-text-primary">Camera 1 — Front View</span>
                    </div>
                </div>

                {/* Camera 2 */}
                <div className="glass-card overflow-hidden">
                    <div className="relative">
                        <img
                            src="/images/Mid.png"
                            alt="Camera 2 — Rear View"
                            className="w-full h-56 sm:h-64 lg:h-80 object-cover"
                        />
                        <div className="absolute inset-0 scan-line overflow-hidden pointer-events-none" />
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600/80 text-white text-[10px] font-bold uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse-rec" />
                            REC
                        </div>

                    </div>
                    <div className="px-6 py-4 flex items-center gap-3 border-t border-dark-border">
                        <div className="w-9 h-9 rounded-lg gradient-blue flex items-center justify-center shrink-0">
                            <Camera size={16} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-text-primary">Camera 2 — Rear View</span>
                    </div>
                </div>
            </div>

            {/* ─── ROW 3: Live Detection Feed ─── */}
            <div className="glass-card overflow-hidden">
                <div className="px-6 lg:px-8 py-5 border-b border-dark-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center">
                            <MessageSquare size={18} className="text-accent-cyan" />
                        </div>
                        <span className="text-sm font-bold text-text-primary uppercase tracking-wider">
                            Live Detection Feed
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSimulate}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-blue text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md shadow-accent-blue/20"
                        >
                            <Zap size={14} />
                            Simulate Cheating
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse-rec" />
                            <span className="text-xs text-accent-green font-bold uppercase tracking-wide">Live</span>
                        </div>
                    </div>
                </div>

                <div className="live-feed-container p-5 lg:p-6 space-y-3" ref={feedRef}>
                    {liveFeed.map((entry, i) => (
                        <div
                            key={entry.id || i}
                            className={`flex items-center gap-4 px-5 py-4 rounded-xl bg-dark-surface/80 border border-dark-border/50 hover:bg-dark-card/80 hover:border-dark-border transition-all ${i === 0 ? 'animate-fade-in-up' : ''
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${entry.type === 'Phone Usage' ? 'gradient-red'
                                    : entry.type === 'Head Turning' ? 'gradient-yellow'
                                        : entry.type === 'Passing Notes' ? 'gradient-blue'
                                            : 'gradient-purple'
                                    }`}
                            >
                                <AlertTriangle size={16} className="text-white" />
                            </div>
                            <span className="text-sm font-semibold text-text-primary w-40 sm:w-48 shrink-0 truncate">
                                {entry.type}
                            </span>
                            <div className="flex items-center gap-6 text-xs text-text-secondary flex-1 min-w-0">
                                <span className="flex items-center gap-1.5 shrink-0">
                                    <Armchair size={14} className="text-accent-blue" /> Seat {entry.seat}
                                </span>
                                <span className="flex items-center gap-1.5 shrink-0">
                                    <Camera size={14} className="text-accent-cyan" /> {entry.camera}
                                </span>
                                <span className="flex items-center gap-1.5 shrink-0">
                                    <Clock size={14} className="text-accent-green" /> {entry.time}
                                </span>
                            </div>
                            {entry.confidence && (
                                <div className="flex items-center gap-2.5 shrink-0">
                                    <div className="w-16 h-1.5 rounded-full bg-dark-border overflow-hidden hidden sm:block">
                                        <div className="h-full rounded-full gradient-blue" style={{ width: `${entry.confidence}%` }} />
                                    </div>
                                    <span className="text-xs font-bold text-accent-blue min-w-[32px] text-right">
                                        {entry.confidence}%
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AlertPopup alert={alert} onDismiss={() => setAlert(null)} onViewVideo={() => setShowModal(true)} />
            {showModal && alert && (
                <VideoModal record={alert} onClose={() => { setShowModal(false); setAlert(null); }} />
            )}
        </div>
    );
}
