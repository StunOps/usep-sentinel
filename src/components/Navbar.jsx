import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Settings,
    Shield,
    Clock,
    Menu,
    X,
    Activity,
    LogOut,
    History,
} from 'lucide-react';

const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/records', label: 'Records & Analytics', icon: FileText },
    { to: '/history', label: 'History', icon: History },
    { to: '/system', label: 'System Info', icon: Settings },
];

export default function Navbar({ session, onLogout }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [remaining, setRemaining] = useState('');

    useEffect(() => {
        if (!session?.startedAt || !session?.durationMs) return;

        const calcRemaining = () => {
            const elapsed = Date.now() - session.startedAt;
            const diff = session.durationMs - elapsed;

            if (diff <= 0) {
                setRemaining('00:00:00');
                return;
            }
            const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
            const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
            const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
            setRemaining(`${h}:${m}:${s}`);
        };

        calcRemaining();
        const timer = setInterval(calcRemaining, 1000);
        return () => clearInterval(timer);
    }, [session]);

    const formatTime12 = (time24) => {
        if (!time24) return '';
        const [h, m] = time24.split(':').map(Number);
        const suffix = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-dark-surface/90 backdrop-blur-xl border-b border-dark-border">
            <div className="relative flex items-center justify-between h-16 px-6 lg:px-8">
                {/* Left — Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-lg gradient-blue flex items-center justify-center">
                        <Shield size={18} className="text-white" />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-sm font-bold text-text-primary leading-none tracking-tight">
                            Sentinel
                        </h1>
                        <p className="text-[10px] text-text-secondary tracking-widest uppercase leading-none mt-1">
                            {session ? `${session.subjectCode} — ${session.professor}` : 'Monitoring System'}
                        </p>
                    </div>
                </div>

                {/* Center — Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive: active }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                                    ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/25'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-card/80'
                                }`
                            }
                            end={item.to === '/'}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right — Time Info + Status + Logout */}
                <div className="flex items-center gap-4">
                    {/* Start / End / Remaining */}
                    {session?.startTime && (
                        <div className="hidden lg:flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5 text-text-secondary">
                                <Clock size={12} className="text-accent-green" />
                                <span>{formatTime12(session.startTime)}</span>
                                <span className="text-text-secondary/40">→</span>
                                <span>{formatTime12(session.endTime)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-card border border-dark-border">
                                <Clock size={12} className="text-accent-yellow" />
                                <span className="font-mono font-bold text-text-primary">{remaining}</span>
                            </div>
                        </div>
                    )}

                    {/* Active/Inactive Toggle */}
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border cursor-pointer transition-all duration-300 ${
                            isActive
                                ? 'bg-accent-green/10 border-accent-green/25 hover:bg-accent-green/20'
                                : 'bg-accent-red/10 border-accent-red/25 hover:bg-accent-red/20'
                        }`}
                    >
                        <Activity size={14} className={isActive ? 'text-accent-green' : 'text-accent-red'} />
                        <span className={`text-xs font-semibold ${isActive ? 'text-accent-green' : 'text-accent-red'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                    </button>

                    {/* Logout */}
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-dark-card border border-dark-border text-text-secondary hover:text-accent-red hover:border-accent-red/30 transition-all"
                        title="Logout"
                    >
                        <LogOut size={14} />
                        <span className="text-xs font-semibold hidden sm:inline">Logout</span>
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg bg-dark-card border border-dark-border text-text-secondary"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t border-dark-border bg-dark-surface/95 backdrop-blur-xl px-5 py-4 space-y-1.5">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive: active }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                                    ? 'bg-accent-blue/15 text-accent-blue'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-card'
                                }`
                            }
                            end={item.to === '/'}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-accent-red hover:bg-accent-red/10 transition-all w-full"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}
