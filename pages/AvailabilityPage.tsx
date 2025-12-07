import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { getAvailability } from '../api/availability';
import { StepIndicator } from '../components/StepIndicator';
import { BookingStep } from '../types';

export const AvailabilityPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPark, selectedAccommodation, startDate, endDate } = useBooking();
  const [checking, setChecking] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Redirect als er geen data is
  useEffect(() => {
    if (!selectedPark || !selectedAccommodation || !startDate || !endDate) {
      navigate('/');
    }
  }, [selectedPark, selectedAccommodation, startDate, endDate, navigate]);

  useEffect(() => {
    if (selectedPark && selectedAccommodation && startDate && endDate) {
      setChecking(true);
      
      const runCheck = async () => {
        try {
          const result = await getAvailability({
            parkId: selectedPark.maxxtonData.resortId,
            accoCode: selectedAccommodation.maxxtonData.code,
            startDate,
            endDate
          });
          setIsAvailable(result);
        } catch (err) {
          console.error(err);
          setIsAvailable(false);
        } finally {
          setChecking(false);
        }
      };

      runCheck();
    }
  }, [selectedPark, selectedAccommodation, startDate, endDate]);

  if (!selectedPark || !selectedAccommodation) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <StepIndicator currentStep={BookingStep.SELECT_TYPE} />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Resultaat van je aanvraag</h1>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header van de kaart */}
            <div className="bg-gray-50 p-6 border-b border-gray-100">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">{selectedPark.cmsData.parkNaam}</div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedAccommodation.maxxtonData.name}</h2>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Periode</div>
                        <div className="font-medium">{startDate} t/m {endDate}</div>
                    </div>
                 </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px]">
                {checking ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-600 mx-auto mb-6"></div>
                        <p className="text-gray-500 font-medium">Beschikbaarheid controleren bij Maxxton...</p>
                    </div>
                ) : isAvailable ? (
                    <div className="text-center w-full animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gefeliciteerd! Deze accommodatie is vrij.</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Je bent slechts één stap verwijderd van je vakantie. Vul je gegevens in om de reservering definitief te maken.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => navigate('/parks/' + selectedPark.maxxtonData.resortId)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Terug
                            </button>
                            <button 
                                onClick={() => navigate('/reserve')}
                                className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-lg transition-transform hover:-translate-y-0.5"
                            >
                                Nu Reserveren &rarr;
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center w-full animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Helaas, niet beschikbaar.</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Voor de gekozen periode is dit type accommodatie volgeboekt. Probeer andere datums of een ander type.
                        </p>
                        <button 
                            onClick={() => navigate(`/parks/${selectedPark.maxxtonData.resortId}`)}
                            className="text-brand-600 font-bold hover:text-brand-800 underline decoration-2 underline-offset-4"
                        >
                            Bekijk andere accommodaties
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};