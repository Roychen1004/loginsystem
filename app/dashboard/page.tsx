// dashboard/page.tsx
'use client';

import { useDashboard } from './service';

const DashboardPage = () => {
  const { stablecoins, loading, error, isLoggedIn } = useDashboard();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <p>{isLoggedIn ? '您已登入' : '您未登入'}</p>
      <table className="table-auto border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Symbol</th>
            <th className="border border-gray-300 px-4 py-2">Circulating Supply (USD)</th>
          </tr>
        </thead>
        <tbody>
          {stablecoins.map((coin) => (
            <tr key={coin.id}>
              <td className="border border-gray-300 px-4 py-2">{coin.name}</td>
              <td className="border border-gray-300 px-4 py-2">{coin.symbol}</td>
              <td className="border border-gray-300 px-4 py-2">
                ${coin.circulating && coin.circulating.peggedUSD ? coin.circulating.peggedUSD.toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
