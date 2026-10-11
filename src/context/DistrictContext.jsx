import React, { createContext, useContext, useState, useEffect } from 'react';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';

const DistrictContext = createContext();

export const DistrictProvider = ({ children }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    return localStorage.getItem('dripden_district') || 'all';
  });

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dripden_district', selectedDistrict);
  }, [selectedDistrict]);

  const currentDistrictObj = KERALA_DISTRICTS.find(d => d.id === selectedDistrict) || KERALA_DISTRICTS[0];

  const changeDistrict = (districtId) => {
    setSelectedDistrict(districtId);
    setIsSelectorOpen(false);
  };

  return (
    <DistrictContext.Provider value={{
      selectedDistrict,
      currentDistrictObj,
      changeDistrict,
      isSelectorOpen,
      setIsSelectorOpen,
      districts: KERALA_DISTRICTS
    }}>
      {children}
    </DistrictContext.Provider>
  );
};

export const useDistrict = () => useContext(DistrictContext);
