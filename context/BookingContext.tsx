import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingContextState, Resort, Accommodation } from '../types';

const BookingContext = createContext<BookingContextState | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPark, setSelectedPark] = useState<Resort | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

  const setDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const setPark = (park: Resort | null) => {
    setSelectedPark(park);
  };

  const setAccommodation = (acco: Accommodation | null) => {
    setSelectedAccommodation(acco);
  };

  return (
    <BookingContext.Provider value={{
      selectedPark,
      startDate,
      endDate,
      selectedAccommodation,
      setPark,
      setDates,
      setAccommodation
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};