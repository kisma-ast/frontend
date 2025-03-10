// src/features/claims/hooks/useClaims.ts
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Claims } from '../../../types/types';

export const useClaims = (backendUrlNet: string) => {
  const [claims, setClaims] = useState<Claims[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<Claims[]>([]);
  const [searchOrderCode, setSearchOrderCode] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchClaims = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/api/swaps/listClaim`);
      if (response.status === 200) {
        setClaims(response.data);
        setFilteredClaims(response.data);
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  }, [backendUrlNet]);

  useEffect(() => {
    let filtered = claims;
    if (searchOrderCode) {
      filtered = filtered.filter((claim) =>
        claim.orderCode.toLowerCase().includes(searchOrderCode.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((claim) => claim.status === statusFilter);
    }
    setFilteredClaims(filtered);
  }, [searchOrderCode, statusFilter, claims]);

  return {
    claims,
    filteredClaims,
    searchOrderCode,
    setSearchOrderCode,
    statusFilter,
    setStatusFilter,
    fetchClaims
  };
};