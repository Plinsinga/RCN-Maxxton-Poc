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
  const [filteredAccos, setFilteredAccos] = useState<Accommodation[]>([]);
  const [accoFilter, setAccoFilter] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [showDateWarning, setShowDateWarning] = useState(false);
  const [isEditingSearch, setIsEditingSearch] = useState(false);

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
        setFilteredAccos(accoData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [parkId, setPark]);

  // Filter logic voor accommodaties
  useEffect(() => {
    if (!accommodations) return;
    const query = accoFilter.toLowerCase();
    const filtered = accommodations.filter(acco => 
        acco.maxxtonData.name.toLowerCase().includes(query) || 
        (acco.cmsData.description && acco.cmsData.description.toLowerCase().includes(query))
    );
    setFilteredAccos(filtered);
  }, [accoFilter, accommodations]);

  // Reset editing state als datums veranderen (impliceert succesvolle submit)
  useEffect(() => {
      if (startDate && endDate) {
          setIsEditingSearch(false);
      }
  }, [startDate, endDate]);

  const handleSelectAccommodation = (acco: Accommodation) => {
    if (!startDate || !endDate) {
      setShowDateWarning(true);
      setIsEditingSearch(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setAccommodation(acco);
    navigate('/availability');
  };

  if (isLoading) return (
      <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
              <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
              <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 h-96 bg-gray-200 rounded-xl"></div>
                  <div className="col-span-1 h-64 bg-gray-200 rounded-xl"></div>
              </div>
          </div>
      </div>
  );
  
  if (!resort) return <div className="text-center py-20 text-red-500">Park niet gevonden.</div>;

  const imageUrl = resort.maxxtonData.images?.[0]?.urls?.large || 'https://picsum.photos/1200/400';

  return (
    <div>
      {/* Park Header Image */}
      <div className="h-64 md:h-96 w-full relative overflow-hidden">
        <img src={imageUrl} alt={resort.cmsData.parkNaam} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 pb-8 md:pb-12 w-full text-white">
                <div className="inline-block bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    {resort.maxxtonData.visitAddress.countryName}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 shadow-sm">{resort.cmsData.parkNaam}</h1>
                <p className="text-lg opacity-90 font-light flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {resort.maxxtonData.visitAddress.city}
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 -mt-8 relative z-10">
        
        {/* Step Indicator Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 mb-8">
            <StepIndicator currentStep={BookingStep.SELECT_TYPE} />
        </div>
        
        {/* Datum Check / Wijzigen */}
        <div className="mb-8">
           {(!startDate || !endDate || isEditingSearch) ? (
             <div className={`p-6 rounded-xl border border-gray-200 shadow-sm bg-white ${showDateWarning ? 'ring-2 ring-red-500' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-bold text-lg flex items-center ${showDateWarning ? 'text-red-700' : 'text-gray-900'}`}>
                    {showDateWarning ? (
                        <><svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Kies eerst je reisdata</>
                    ) : 'Wanneer wil je verblijven?'}
                    </h3>
                    {startDate && endDate && (
                        <button onClick={() => setIsEditingSearch(false)} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                            Annuleren
                        </button>
                    )}
                </div>
                <SearchForm variant="minimal" />
             </div>
           ) : (
             <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="flex items-center space-x-4">
                  <div className="bg-brand-50 p-3 rounded-full text-brand-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block">Geselecteerde periode</span>
                    <div className="font-bold text-gray-900 text-lg">
                        {new Date(startDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })} 
                        <span className="mx-2 text-gray-400">-</span> 
                        {new Date(endDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
               </div>
               <button 
                 onClick={() => setIsEditingSearch(true)}
                 className="text-brand-600 hover:text-brand-800 font-bold text-sm flex items-center px-4 py-2 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
               >
                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                 Wijzig zoekopdracht
               </button>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">Kies je verblijf</h2>
                    
                    {/* Accommodatie Filter */}
                    <div className="relative w-full sm:w-64">
                        <input 
                            type="text" 
                            placeholder="Zoek accommodatie..." 
                            value={accoFilter}
                            onChange={(e) => setAccoFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                        />
                         <div className="absolute left-3 top-2.5 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                </div>

                {filteredAccos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAccos.map((acco, idx) => (
                        <AccommodationCard 
                            key={`${acco.maxxtonData.code}-${idx}`} 
                            acco={acco} 
                            onSelect={handleSelectAccommodation} 
                        />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
                        <p className="text-gray-500 mb-2">Geen accommodaties gevonden die matchen met "{accoFilter}".</p>
                        <button onClick={() => setAccoFilter('')} className="text-brand-600 font-bold hover:underline">Reset filter</button>
                    </div>
                )}
            </div>
            
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="font-bold text-lg mb-4 text-gray-900 border-b border-gray-100 pb-2">Over {resort.cmsData.parkNaam}</h3>
                  <div className="text-gray-600 text-sm leading-relaxed mb-6 space-y-4" dangerouslySetInnerHTML={{__html: resort.cmsData.subtekst}}></div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-sm mb-2 text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Adresgegevens
                    </h4>
                    <p className="text-gray-500 text-sm pl-6">
                        {resort.maxxtonData.visitAddress.houseNumber} {resort.maxxtonData.visitAddress.address1}<br />
                        {resort.maxxtonData.visitAddress.zipCode} {resort.maxxtonData.visitAddress.city}<br />
                        {resort.maxxtonData.visitAddress.countryName}
                    </p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};