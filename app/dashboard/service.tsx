// app/dashboard/service.tsx
import axios from 'axios';

interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  circulating: {
    peggedUSD: number;
  };
}

export const fetchStablecoins = async (): Promise<Stablecoin[]> => {
  try {
    const response = await axios.get('https://stablecoins.llama.fi/stablecoins', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API response:', response.data);

    if (response.data && response.data.peggedAssets) {
      return response.data.peggedAssets;
    } else {
      throw new Error('Unexpected data structure');
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    throw new Error('Failed to fetch stablecoins data');
  }
};
