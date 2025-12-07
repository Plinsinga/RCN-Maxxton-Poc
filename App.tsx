import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ParksPage } from './pages/ParksPage';
import { ParkDetailPage } from './pages/ParkDetailPage';
import { AvailabilityPage } from './pages/AvailabilityPage';
import { ReservationPage } from './pages/ReservationPage';

const App: React.FC = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col font-sans text-gray-800">
        
        {/* Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center text-white font-bold text-lg group-hover:bg-brand-700 transition-colors">R</div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">RCN<span className="text-brand-600">Boekingen</span></span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/parks" className="text-gray-600 hover:text-brand-600 font-medium">Alle Parken</Link>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-brand-600 font-medium">Inloggen</a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parks" element={<ParksPage />} />
            <Route path="/parks/:parkId" element={<ParkDetailPage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/reserve" element={<ReservationPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h4 className="font-bold mb-4 text-lg">RCN Vakantieparken</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Over ons</li>
                        <li>Duurzaamheid</li>
                        <li>Werken bij</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-lg">Klantenservice</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Contact</li>
                        <li>Veelgestelde vragen</li>
                        <li>Voorwaarden</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                <p>© 2024 RCN Headless POC. Powered by Maxxton API & React Router.</p>
            </div>
          </div>
        </footer>
      </div>
    </BookingProvider>
  );
};

export default App;