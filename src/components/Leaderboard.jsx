// src/components/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import Card from './card';
import { getResults } from '../api/api';
import LoadingSpinner from './LoadingSpinner';

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getResults();
        // Sort is done by json-server, but we ensure it here too
        const sortedData = data.sort((a, b) => b.score - a.score);
        setResults(sortedData);
      } catch (err) {
        setError('Failed to load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <LoadingSpinner text="Fetching Leaderboard..." />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Card style={{ marginTop: '30px', padding: '0' }}>
      <h3 style={{ padding: '20px 30px', borderBottom: '1px solid var(--color-background)', margin: 0 }}>
        🏆 Global Leaderboard
      </h3>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {results.length === 0 ? (
          <p className="text-center my-4">No results submitted yet. Be the first!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-background)', textAlign: 'left' }}>
                <th style={{ padding: '15px 30px', width: '10%' }}>#</th>
                <th style={{ padding: '15px 0', width: '40%' }}>Username</th>
                <th style={{ padding: '15px 0', width: '25%', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '15px 30px', width: '25%', textAlign: 'right' }}>%</th>
              </tr>
            </thead>
            <tbody>
              {results.slice(0, 10).map((res, index) => ( // Show top 10
                <tr key={index} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '15px 30px', fontWeight: '600', color: index < 3 ? 'var(--color-primary)' : 'var(--color-text)' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '15px 0' }}>{res.name}</td>
                  <td style={{ padding: '15px 0', textAlign: 'center', fontWeight: 'bold' }}>
                    {res.score}/{res.total}
                  </td>
                  <td style={{ padding: '15px 30px', textAlign: 'right' }}>
                    {Math.round((res.score / res.total) * 100) || 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
};

export default Leaderboard;