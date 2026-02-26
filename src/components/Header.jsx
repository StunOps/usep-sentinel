import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export default function Header() {
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
        <header className="h-16 bg-dark-surface/80 backdrop-blur-md border-b border-dark-border flex items-center justify-between px-6 lg:px-8">
            <div className="lg:hidden w-10" />
            <h2 className="text-sm font-medium text-text-secondary hidden md:block">
                Classroom Monitoring Dashboard
            </h2>
            <div className="flex items-center gap-5">
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-text-secondary">{formattedDate}</p>
                    <p className="text-sm font-semibold text-text-primary font-mono">
                        {formattedTime}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/30">
                    <Activity size={14} className="text-accent-green" />
                    <span className="text-xs font-semibold text-accent-green">Active</span>
                </div>
            </div>
        </header>
    );
}
