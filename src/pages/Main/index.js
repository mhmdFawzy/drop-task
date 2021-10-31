import { useEffect, useState } from 'react';

import Container from '../../components/dndContainer';
import MultiAxisLine from '../../components/Chart';
import Sidebar from '../../components/Sidebar';
import { functionTypes } from '../../utils/functionTypes';
import styles from './Main.module.scss';
import useAxios from '../../hooks/useAxios';

const Main = () => {
  const { response, loading, error } = useAxios({
    method: 'get',
    url: '/columns',
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  const [filters, setFilters] = useState({
    [functionTypes.DIMENSION]: {
      accepts: functionTypes.DIMENSION,
      lastDroppedItem: [],
    },
    [functionTypes.MEASURE]: {
      accepts: functionTypes.MEASURE,
      lastDroppedItem: [],
    },
  });
  const [filtersFilled, setFiltersFilled] = useState(false);

  useEffect(() => {
    let filtersDragged = false;

    for (const filter in filters) {
      if (filters[filter].lastDroppedItem.length >= 1) {
        filtersDragged = true;
        setFiltersFilled(filtersDragged);
      } else {
        filtersDragged = false;
        setFiltersFilled(filtersDragged);

        break;
      }
    }
  }, [filters]);

  return (
    <div>
      <Sidebar
        listTitle="Columns"
        list={data}
        error={error}
        loading={loading}
      />
      <div className={styles.content}>
        <Container filters={filters} setFilters={setFilters} />
        {filtersFilled && <MultiAxisLine filters={filters} />}
      </div>
    </div>
  );
};

export default Main;
