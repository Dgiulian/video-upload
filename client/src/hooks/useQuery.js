import React, { useState, useEffect } from 'react';

export const useQuery = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fn();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  return { error, loading, data };
};
