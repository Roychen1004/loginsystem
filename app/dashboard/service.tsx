// dashboard/service.tsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';

export interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  circulating: {
    peggedUSD: number;
  };
}

export const useDashboard = () => {
  const [stablecoins, setStablecoins] = useState<Stablecoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const loadStablecoins = async () => {
      try {
        const stablecoinsData = await fetchStablecoins();
        setStablecoins(stablecoinsData);
      } catch (err) {
        setError('Failed to fetch stablecoins data');
      } finally {
        setLoading(false);
      }
    };

    loadStablecoins();
  }, []);

  return {
    stablecoins,
    loading,
    error,
    isLoggedIn,
  };
};

export const fetchStablecoins = async () => {
  try {
    const response = await axios.get('https://stablecoins.llama.fi/stablecoins', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API response:', response.data);

    if (response.data && response.data.peggedAssets) {
      return response.data.peggedAssets as Stablecoin[];
    } else {
      throw new Error('Unexpected data structure');
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    throw new Error('Failed to fetch stablecoins data');
  }
};
