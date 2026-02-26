import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Settings,
    Shield,
    Menu,
    X,
    Activity,
} from 'lucide-react';
import { useEffect } from 'react';

const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/records', label: 'Records & Analytics', icon: FileText },
    { to: '/system', label: 'System Info', icon: Settings },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

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
                            Monitoring System
                        </p>
                    </div>
                </div>

                {/* Center — Desktop Nav (absolutely centered) */}
                <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
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

                {/* Right — Time + Status */}
                <div className="flex items-center gap-5">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-text-secondary leading-none">{formattedDate}</p>
                        <p className="text-sm font-semibold text-text-primary font-mono leading-none mt-1">
                            {formattedTime}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/25">
                        <Activity size={14} className="text-accent-green" />
                        <span className="text-xs font-semibold text-accent-green">Active</span>
                    </div>

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
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
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
                </div>
            )}
        </header>
    );
}
