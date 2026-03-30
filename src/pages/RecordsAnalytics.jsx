import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
    Eye,
    Search,
    ChevronDown,
    Armchair,
    AlertTriangle,
    X,
    Check,
    XCircle,
    Filter,
    Download,
} from 'lucide-react';
import VideoModal from '../components/VideoModal';
import {
    cheatingLogs,
    seatData,
    cheatingTypesChartData,
    incidentsPerHourChartData,
    barChartOptions,
    lineChartOptions,
} from '../data/mockData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Tooltip
);

export default function RecordsAnalytics() {
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [activeTab, setActiveTab] = useState('records');
    const [verifiedMap, setVerifiedMap] = useState(() => {
        const map = {};
        cheatingLogs.forEach((log) => { map[log.id] = true; });
        return map;
    });
    const [verifiedFilter, setVerifiedFilter] = useState('all');

    const toggleVerified = (id) => {
        setVerifiedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredLogs = cheatingLogs.filter((log) => {
        if (verifiedFilter === 'verified') return verifiedMap[log.id];
        if (verifiedFilter === 'unverified') return !verifiedMap[log.id];
        return true;
    });

    const tabs = [
        { id: 'records', label: 'Records' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'seatmap', label: 'Seat Map' },
    ];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-1.5 p-1.5 glass-card w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                                ? 'gradient-blue text-white shadow-lg'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Records Tab */}
            {activeTab === 'records' && (
                <div className="glass-card overflow-hidden animate-fade-in-up">
                    <div className="px-7 py-5 border-b border-dark-border flex items-center justify-between">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                            Cheating Records
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-card border border-dark-border">
                                <Filter size={14} className="text-text-secondary" />
                                <select
                                    value={verifiedFilter}
                                    onChange={(e) => setVerifiedFilter(e.target.value)}
                                    className="bg-transparent text-sm text-text-primary outline-none cursor-pointer"
                                >
                                    <option value="all" className="bg-dark-card">All Records</option>
                                    <option value="verified" className="bg-dark-card">Verified Only</option>
                                    <option value="unverified" className="bg-dark-card">Unverified Only</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-dark-card border border-dark-border">
                                <Search size={14} className="text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Search records..."
                                    className="bg-transparent text-sm text-text-primary outline-none w-40 placeholder-text-secondary"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    const headers = ['Timestamp', 'Seat No.', 'Cheating Type', 'Camera', 'Confidence', 'Verified'];
                                    const rows = filteredLogs.map((log) => [
                                        log.time,
                                        log.seat,
                                        log.type,
                                        log.camera,
                                        `${log.confidence}%`,
                                        verifiedMap[log.id] ? 'Verified' : 'Unverified',
                                    ]);
                                    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
                                    const blob = new Blob([csv], { type: 'text/csv' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'cheating_records.csv';
                                    a.click();
                                    URL.revokeObjectURL(url);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-blue text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md shadow-accent-blue/20"
                            >
                                <Download size={14} />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Timestamp
                                    </th>
                                    <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Seat No.
                                    </th>
                                    <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Cheating Type
                                    </th>
                                    <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Camera
                                    </th>
                                    <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Confidence
                                    </th>
                                    <th className="text-center px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Action
                                    </th>
                                    <th className="text-center px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        Verified
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log, i) => (
                                    <tr
                                        key={log.id}
                                        className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors"
                                        style={{ animationDelay: `${i * 60}ms` }}
                                    >
                                        <td className="px-7 py-4 text-sm text-text-primary font-mono">
                                            {log.time}
                                        </td>
                                        <td className="px-7 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-dark-card text-sm font-semibold text-text-primary">
                                                <Armchair size={12} className="text-accent-blue" />
                                                {log.seat}
                                            </span>
                                        </td>
                                        <td className="px-7 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                    log.type === 'Using Phone'
                                                        ? 'bg-accent-red/10 text-accent-red'
                                                        : log.type === 'Head Tilting'
                                                            ? 'bg-accent-yellow/10 text-accent-yellow'
                                                            : log.type === 'Hands Under Table'
                                                                ? 'bg-accent-cyan/10 text-accent-cyan'
                                                                : 'bg-accent-blue/10 text-accent-blue'
                                                }`}
                                            >
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="px-7 py-4 text-sm text-text-secondary">
                                            {log.camera}
                                        </td>
                                        <td className="px-7 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 h-2 rounded-full bg-dark-border overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full gradient-blue"
                                                        style={{ width: `${log.confidence}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-accent-blue">
                                                    {log.confidence}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-7 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedRecord(log)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold hover:bg-accent-blue/20 transition-colors"
                                            >
                                                <Eye size={12} />
                                                View
                                            </button>
                                        </td>
                                        <td className="px-7 py-4 text-center">
                                            <button
                                                onClick={() => toggleVerified(log.id)}
                                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                                                    verifiedMap[log.id]
                                                        ? 'bg-accent-green/10 border border-accent-green/20 text-accent-green hover:bg-accent-green/20'
                                                        : 'bg-dark-card border border-dark-border text-text-secondary hover:text-text-primary'
                                                }`}
                                            >
                                                {verifiedMap[log.id] ? (
                                                    <><Check size={12} /> Verified</>
                                                ) : (
                                                    <><XCircle size={12} /> Unverified</>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
                <div className="space-y-5 animate-fade-in-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Bar Chart */}
                        <div className="glass-card p-7">
                            <h3 className="text-sm font-bold text-text-primary mb-5 uppercase tracking-wider">
                                Cheating Types Distribution
                            </h3>
                            <div className="h-72">
                                <Bar data={cheatingTypesChartData} options={barChartOptions} />
                            </div>
                        </div>
                        {/* Line Chart */}
                        <div className="glass-card p-7">
                            <h3 className="text-sm font-bold text-text-primary mb-5 uppercase tracking-wider">
                                Incidents During Exam Duration
                            </h3>
                            <div className="h-72">
                                <Line data={incidentsPerHourChartData} options={lineChartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Seat Map Tab */}
            {activeTab === 'seatmap' && (
                <div className="animate-fade-in-up">
                    <div className="glass-card p-7 lg:p-8">
                        <div className="flex items-center justify-between mb-7">
                            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                                Classroom Seat Map
                            </h3>
                            <div className="flex items-center gap-5 text-xs">
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-sm bg-accent-green" /> Normal
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-sm bg-accent-yellow" /> Warning
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-sm bg-accent-red" /> Flagged
                                </span>
                            </div>
                        </div>

                        {/* Whiteboard */}
                        <div className="mb-7 py-3 rounded-xl bg-dark-card border border-dark-border text-center">
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
                                ▬▬ Whiteboard / Teacher Area ▬▬
                            </span>
                        </div>

                        {/* Seat Grid */}
                        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                            {seatData.map((seat) => {
                                const statusColors = {
                                    green: 'bg-accent-green/15 border-accent-green/30 hover:bg-accent-green/25',
                                    yellow: 'bg-accent-yellow/15 border-accent-yellow/30 hover:bg-accent-yellow/25 animate-pulse-seat-yellow',
                                    red: 'bg-accent-red/15 border-accent-red/30 hover:bg-accent-red/25 animate-pulse-seat-red',
                                };

                                return (
                                    <button
                                        key={seat.id}
                                        onClick={() => setSelectedSeat(selectedSeat?.id === seat.id ? null : seat)}
                                        className={`relative p-4 rounded-xl border transition-all duration-200 ${statusColors[seat.status]} ${selectedSeat?.id === seat.id ? 'ring-2 ring-accent-blue scale-105' : ''
                                            }`}
                                    >
                                        <div className="flex flex-col items-center gap-1.5">
                                            <Armchair
                                                size={20}
                                                className={`${seat.status === 'red' ? 'text-accent-red'
                                                        : seat.status === 'yellow' ? 'text-accent-yellow'
                                                            : 'text-accent-green'
                                                    }`}
                                            />
                                            <span className="text-xs font-bold text-text-primary">
                                                {seat.label}
                                            </span>
                                        </div>
                                        {seat.incidents > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full gradient-red flex items-center justify-center text-[9px] font-bold text-white">
                                                {seat.incidents}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Seat Detail Popup */}
                        {selectedSeat && (
                            <div className="mt-7 glass-card p-7 max-w-sm mx-auto animate-fade-in-up border-l-4 border-l-accent-blue">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <Armchair size={18} className="text-accent-blue" />
                                        <span className="text-base font-bold text-text-primary">
                                            Seat {selectedSeat.label}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedSeat(null)}
                                        className="text-text-secondary hover:text-text-primary"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Status:</span>
                                        <span
                                            className={`font-semibold capitalize ${selectedSeat.status === 'red' ? 'text-accent-red'
                                                    : selectedSeat.status === 'yellow' ? 'text-accent-yellow'
                                                        : 'text-accent-green'
                                                }`}
                                        >
                                            {selectedSeat.status === 'red' ? 'Flagged'
                                                : selectedSeat.status === 'yellow' ? 'Warning'
                                                    : 'Normal'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Incidents:</span>
                                        <span className="font-semibold text-text-primary">{selectedSeat.incidents}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Most Common:</span>
                                        <span className="font-semibold text-text-primary">{selectedSeat.mostCommon}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {selectedRecord && (
                <VideoModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
            )}
        </div>
    );
}
