import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Settings,
    Shield,
    Menu,
    X,
} from 'lucide-react';

const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/records', label: 'Records & Analytics', icon: FileText },
    { to: '/system', label: 'System Info', icon: Settings },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-dark-card border border-dark-border text-text-primary lg:hidden"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-dark-surface border-r border-dark-border z-40 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-dark-border">
                    <div className="w-10 h-10 rounded-lg gradient-blue flex items-center justify-center">
                        <Shield size={22} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-text-primary tracking-tight">
                            Sentinel
                        </h1>
                        <p className="text-[11px] text-text-secondary tracking-wider uppercase">
                            Monitoring System
                        </p>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'sidebar-active bg-accent-blue/10 text-accent-blue'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-card'
                                }`
                            }
                            end={item.to === '/'}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-dark-border">
                    <p className="text-[10px] text-text-secondary text-center leading-relaxed">
                        Sentinel © 2026
                        <br />
                        UI Prototype for Research
                    </p>
                </div>
            </aside>
        </>
    );
}
