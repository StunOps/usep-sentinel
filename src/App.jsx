import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import RecordsAnalytics from './pages/RecordsAnalytics';
import SystemInfo from './pages/SystemInfo';
import History from './pages/History';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [session, setSession] = useState(null);

    const handleLogout = () => {
        setSession(null);
        setIsLoggedIn(false);
    };

    // Step 1: Login
    if (!isLoggedIn) {
        return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
    }

    // Step 2: Session setup
    if (!session) {
        return <StartPage onStart={setSession} />;
    }

    // Step 3: Main app
    return (
        <div className="flex flex-col min-h-screen bg-dark-bg">
            <Navbar session={session} onLogout={handleLogout} />
            <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Dashboard session={session} />} />
                    <Route path="/records" element={<RecordsAnalytics />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/system" element={<SystemInfo />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
