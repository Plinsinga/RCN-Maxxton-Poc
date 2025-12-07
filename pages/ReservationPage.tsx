import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { GuestDetails, BookingStep } from '../types';
import { createReservation } from '../api/reservations';
import { StepIndicator } from '../components/StepIndicator';

export const ReservationPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPark, selectedAccommodation, startDate, endDate, setDates, setPark, setAccommodation } = useBooking();
  const [guest, setGuest] = useState<GuestDetails>({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Extra validatie check
    if (!selectedPark || !selectedAccommodation || !startDate || !endDate) {
      setError('Je boeking is onvolledig. Kies eerst een park, accommodatie en geldige data.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check: Vertrek moet later zijn dan aankomst (dus niet gelijk of eerder)
    if (start >= end) {
        setError('De vertrekdatum moet minimaal 1 dag na de aankomstdatum liggen.');
        return;
    }

    setIsSubmitting(true);
    try {
      const response = await createReservation({
        resortId: selectedPark.maxxtonData.resortId,
        accommodationCode: selectedAccommodation.maxxtonData.code,
        startDate,
        endDate,
        guest
      });
      setReservationId(response.reservationId);
      setSubmitted(true);
    } catch (error) {
      console.error("Fout bij reserveren:", error);
      setError("Er ging iets mis bij het communiceren met het reserveringssysteem. Probeer het later opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setDates('','');
    setPark(null);
    setAccommodation(null);
    navigate('/');
  };

  if (!selectedPark || !selectedAccommodation || !startDate || !endDate) {
    return (
        <div className="max-w-xl mx-auto mt-20 p-8 text-center bg-white rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sessie verlopen</h3>
            <p className="text-gray-600 mb-6">Je boeking sessie lijkt verlopen of de gegevens zijn incompleet.</p>
            <a href="/" className="inline-block bg-brand-600 text-white px-6 py-2 rounded-lg font-medium">Opnieuw zoeken</a>
        </div>
    );
  }

  if (submitted) {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <StepIndicator currentStep={BookingStep.CONFIRMATION} />
            <div className="bg-white rounded-xl shadow-xl p-12 border border-brand-100 text-center animate-in zoom-in duration-300">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-600 text-white rounded-full mb-6 shadow-lg">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Bedankt, {guest.firstName}!</h1>
                <p className="text-lg text-gray-600 mb-4">Je reserveringsaanvraag voor <strong>{selectedPark.cmsData.parkNaam}</strong> is succesvol ontvangen.</p>
                
                {reservationId && (
                    <div className="bg-gray-50 inline-block px-6 py-3 rounded-lg mb-8 border border-gray-200">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide">Reserveringsnummer</span>
                        <span className="font-mono text-xl font-bold text-gray-900">{reservationId}</span>
                    </div>
                )}
                
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Er is een bevestigingsmail verstuurd naar <strong>{guest.email}</strong>. We wensen je alvast een fijn verblijf!</p>
                
                <button onClick={handleFinish} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-md">
                    Terug naar Home
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <StepIndicator currentStep={BookingStep.CONFIRMATION} />
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Samenvatting Kolom */}
        <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Jouw Boeking</h3>
                
                <div className="mb-4">
                    <span className="block text-xs text-gray-500 uppercase font-semibold">Park</span>
                    <span className="font-medium text-brand-700">{selectedPark.cmsData.parkNaam}</span>
                </div>
                <div className="mb-4">
                    <span className="block text-xs text-gray-500 uppercase font-semibold">Accommodatie</span>
                    <span className="font-medium text-gray-900">{selectedAccommodation.maxxtonData.name}</span>
                </div>
                <div className="flex justify-between mb-4 bg-gray-50 p-3 rounded-lg">
                    <div>
                        <span className="block text-xs text-gray-500">Aankomst</span>
                        <span className="font-bold text-gray-900">{startDate}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs text-gray-500">Vertrek</span>
                        <span className="font-bold text-gray-900">{endDate}</span>
                    </div>
                </div>
                <div className="text-xs text-gray-500 italic mt-4">
                    Prijsdetails worden in de volgende stap (betaling) berekend.
                </div>
            </div>
        </div>

        {/* Formulier Kolom */}
        <div className="md:col-span-2 order-1 md:order-2">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Vul je gegevens in</h1>
            
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Voornaam</label>
                        <input 
                            type="text" 
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                            placeholder="Bijv. Jan"
                            value={guest.firstName}
                            onChange={e => setGuest({...guest, firstName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Achternaam</label>
                        <input 
                            type="text" 
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                            placeholder="Bijv. Jansen"
                            value={guest.lastName}
                            onChange={e => setGuest({...guest, lastName: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mailadres</label>
                    <input 
                        type="email" 
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                        placeholder="jan@voorbeeld.nl"
                        value={guest.email}
                        onChange={e => setGuest({...guest, email: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefoonnummer</label>
                    <input 
                        type="tel" 
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                        placeholder="06 12345678"
                        value={guest.phone}
                        onChange={e => setGuest({...guest, phone: e.target.value})}
                    />
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-lg transition-all text-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                Bezig met verwerken...
                            </span>
                        ) : 'Definitief Reserveren'}
                    </button>
                    <p className="text-xs text-gray-400 mt-4 text-center">
                        Door op reserveren te klikken ga je akkoord met de algemene voorwaarden en het privacybeleid.
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};