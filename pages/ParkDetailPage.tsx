import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParkById } from '../api/parks';
import { getAccommodationsByPark } from '../api/accommodations';
import { Resort, Accommodation, BookingStep } from '../types';
import { AccommodationCard } from '../components/AccommodationCard';
import { useBooking } from '../context/BookingContext';
import { StepIndicator } from '../components/StepIndicator';
import { SearchForm } from '../components/SearchForm';

export const ParkDetailPage: React.FC = () => {
  const { parkId } = useParams<{ parkId: string }>();
  const navigate = useNavigate();
  const { setPark, setAccommodation, startDate, endDate } = useBooking();
  
  const [resort, setResort] = useState<Resort | null>(null);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDateWarning, setShowDateWarning] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!parkId) return;
      
      try {
        const id = Number(parkId);
        const [parkData, accoData] = await Promise.all([
          getParkById(id),
          getAccommodationsByPark(id)
        ]);
        
        if (parkData) {
            setResort(parkData);
            setPark(parkData);
        }
        setAccommodations(accoData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [parkId, setPark]);

  const handleSelectAccommodation = (acco: Accommodation) => {
    if (!startDate || !endDate) {
      setShowDateWarning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setAccommodation(acco);
    navigate('/availability');
  };

  if (isLoading) return <div className="text-center py-20 text-gray-500">Park details laden...</div>;
  if (!resort) return <div className="text-center py-20 text-red-500">Park niet gevonden.</div>;

  const imageUrl = resort.maxxtonData.images?.[0]?.urls?.large || 'https://picsum.photos/1200/400';

  return (
    <div>
      {/* Park Header Image */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
        <img src={imageUrl} alt={resort.cmsData.parkNaam} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 pb-8 w-full text-white">
                <h1 className="text-4xl font-bold mb-2">{resort.cmsData.parkNaam}</h1>
                <p className="text-lg opacity-90">{resort.maxxtonData.visitAddress.city}, {resort.maxxtonData.visitAddress.countryName}</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <StepIndicator currentStep={BookingStep.SELECT_TYPE} />
        
        {/* Datum Check / Wijzigen */}
        <div className="mb-8">
           {(!startDate || !endDate) ? (
             <div className={`p-6 rounded-xl border-2 ${showDateWarning ? 'border-red-500 bg-red-50' : 'border-brand-100 bg-brand-50'}`}>
                <h3 className={`font-bold mb-2 ${showDateWarning ? 'text-red-700' : 'text-brand-800'}`}>
                  {showDateWarning ? '⚠️ Kies eerst je reisdata' : 'Wanneer wil je verblijven?'}
                </h3>
                <SearchForm className="shadow-none !p-0 bg-transparent" />
             </div>
           ) : (
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap justify-between items-center gap-4">
               <div>
                  <span className="text-gray-500 text-sm block">Geselecteerde periode:</span>
                  <span className="font-bold text-gray-900">{startDate}</span> tot <span className="font-bold text-gray-900">{endDate}</span>
               </div>
               <button 
                 onClick={() => { setPark(null); /* Reset om form te triggeren of navigate */ navigate('/'); }}
                 className="text-brand-600 text-sm font-medium hover:underline"
               >
                 Wijzig zoekopdracht
               </button>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Kies je verblijf</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {accommodations.map((acco, idx) => (
                    <AccommodationCard 
                        key={`${acco.maxxtonData.code}-${idx}`} 
                        acco={acco} 
                        onSelect={handleSelectAccommodation} 
                    />
                    ))}
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Over {resort.cmsData.parkNaam}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{resort.cmsData.subtekst}</p>
                  
                  <h4 className="font-bold text-sm mb-2">Adres</h4>
                  <p className="text-gray-500 text-sm">
                    {resort.maxxtonData.visitAddress.houseNumber} {resort.maxxtonData.visitAddress.address1}<br />
                    {resort.maxxtonData.visitAddress.zipCode} {resort.maxxtonData.visitAddress.city}<br />
                    {resort.maxxtonData.visitAddress.countryName}
                  </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};