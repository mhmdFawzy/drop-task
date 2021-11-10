import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

axios.defaults.baseURL = 'https://plotter-task.herokuapp.com';

const useAxios = ({ url, method, data = null, headers = null, depend }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = useCallback(() => {
    axios[method](url, JSON.parse(data), JSON.parse(headers))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [depend]);

  useEffect(() => {
    fetchData();
    return () => {
      setResponse(null);
      setloading(true);
      setError('');
    };
  }, [fetchData]);

  return { response, error, loading };
};

export default useAxios;
