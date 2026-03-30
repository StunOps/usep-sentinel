import { useState } from 'react';
import {
  Download,
  BookOpen,
  User,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

const mockHistory = [
  { id: 1, subjectCode: 'CS 321', professor: 'Dr. Juan Dela Cruz', date: '2026-02-20', cheatsDetected: 5 },
  { id: 2, subjectCode: 'IT 214', professor: 'Prof. Maria Santos', date: '2026-02-18', cheatsDetected: 3 },
  { id: 3, subjectCode: 'CS 321', professor: 'Dr. Juan Dela Cruz', date: '2026-02-15', cheatsDetected: 8 },
  { id: 4, subjectCode: 'MATH 101', professor: 'Dr. Pedro Reyes', date: '2026-02-12', cheatsDetected: 2 },
  { id: 5, subjectCode: 'IT 214', professor: 'Prof. Maria Santos', date: '2026-02-10', cheatsDetected: 6 },
  { id: 6, subjectCode: 'ENG 111', professor: 'Prof. Ana Garcia', date: '2026-02-08', cheatsDetected: 1 },
  { id: 7, subjectCode: 'CS 321', professor: 'Dr. Juan Dela Cruz', date: '2026-02-05', cheatsDetected: 4 },
  { id: 8, subjectCode: 'MATH 101', professor: 'Dr. Pedro Reyes', date: '2026-02-03', cheatsDetected: 7 },
];

export default function History() {
  const [selectedId, setSelectedId] = useState(null);

  const handleExport = () => {
    const entry = mockHistory.find((h) => h.id === selectedId);
    if (!entry) return;
    const headers = ['Subject Code', 'Professor', 'Date', 'Cheats Detected'];
    const row = [entry.subjectCode, entry.professor, entry.date, entry.cheatsDetected];
    const csv = [headers, row].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session_${entry.subjectCode.replace(/\s/g, '_')}_${entry.date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-7 py-5 border-b border-dark-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Session History
          </h3>
          <button
            onClick={handleExport}
            disabled={!selectedId}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-md ${
              selectedId
                ? 'gradient-blue text-white hover:opacity-90 shadow-accent-blue/20'
                : 'bg-dark-card border border-dark-border text-text-secondary/40 cursor-not-allowed shadow-none'
            }`}
          >
            <Download size={14} />
            Export Selected
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Subject Code
                </th>
                <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Professor
                </th>
                <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-7 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Cheats Detected
                </th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((entry, i) => (
                <tr
                  key={entry.id}
                  onClick={() => setSelectedId(selectedId === entry.id ? null : entry.id)}
                  className={`border-b border-dark-border/50 cursor-pointer transition-all ${
                    selectedId === entry.id
                      ? 'bg-accent-blue/10 border-l-4 border-l-accent-blue'
                      : 'hover:bg-dark-card/50'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <td className="px-7 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-blue/10 text-sm font-semibold text-accent-blue">
                      <BookOpen size={12} />
                      {entry.subjectCode}
                    </span>
                  </td>
                  <td className="px-7 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-text-primary">
                      <User size={12} className="text-accent-cyan" />
                      {entry.professor}
                    </span>
                  </td>
                  <td className="px-7 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                      <Calendar size={12} className="text-accent-green" />
                      {entry.date}
                    </span>
                  </td>
                  <td className="px-7 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold ${
                      entry.cheatsDetected >= 5
                        ? 'bg-accent-red/10 text-accent-red'
                        : entry.cheatsDetected >= 3
                        ? 'bg-accent-yellow/10 text-accent-yellow'
                        : 'bg-accent-green/10 text-accent-green'
                    }`}>
                      <AlertTriangle size={12} />
                      {entry.cheatsDetected}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
