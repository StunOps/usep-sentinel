import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import RecordsAnalytics from './pages/RecordsAnalytics';
import SystemInfo from './pages/SystemInfo';

export default function App() {
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Navbar />
            <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/records" element={<RecordsAnalytics />} />
                    <Route path="/system" element={<SystemInfo />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
