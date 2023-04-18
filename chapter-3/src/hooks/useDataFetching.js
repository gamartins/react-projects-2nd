import { useState, useEffect } from 'react';

function useDataFetching(dataSource) {
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const tasks = await fetch(dataSource);
        const results = await tasks.json();
        
        if (results) {
          setData(results);
          setLoading(false)
        }
      } catch (e) {
        setError(e.message)
        setLoading(false);
      }
    }

    fetchData()
  }, [dataSource]);

  return [ loading, data, error ]
}

export default useDataFetching;