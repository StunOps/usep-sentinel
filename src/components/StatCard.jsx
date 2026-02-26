import { useEffect, useState } from 'react';
import {
    AlertTriangle,
    Eye,
    Armchair,
    Target,
} from 'lucide-react';

const iconMap = {
    AlertTriangle,
    Eye,
    Armchair,
    Target,
};

export default function StatCard({ label, value, icon, gradient, delay = 0 }) {
    const [visible, setVisible] = useState(false);
    const Icon = iconMap[icon] || AlertTriangle;

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const isNumber = typeof value === 'number';

    return (
        <div
            className={`glass-card p-6 sm:p-7 lg:p-8 transition-all duration-500 hover:scale-[1.02] hover:border-accent-blue/30 ${visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
        >
            <div className="flex items-start justify-between mb-5">
                <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider leading-tight max-w-[70%]">
                    {label}
                </p>
                <div
                    className={`w-11 h-11 rounded-xl ${gradient} flex items-center justify-center shrink-0 shadow-lg`}
                >
                    <Icon size={18} className="text-white" />
                </div>
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-none">
                {isNumber ? <CountUp target={value} /> : value}
            </p>
        </div>
    );
}

function CountUp({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (target === 0) return;
        const duration = 1000;
        const steps = 30;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
}
