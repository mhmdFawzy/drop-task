import { memo, useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { dataColors } from '../../utils/dataColors';
import { functionTypes } from '../../utils/functionTypes';
import styles from './Chart.module.scss';
import useAxios from '../../hooks/useAxios';

const options = {
  responsive: true
};
const MultiAxisLine = ({ filters }) => {
  const [filtersData, setFiltersData] = useState(filters);

  const { response, loading, error } = useAxios({
    method: 'post',
    url: '/data',
    headers: JSON.stringify({ accept: '*/*' }),
    data: JSON.stringify({
      measures: filters[functionTypes.MEASURE].lastDroppedItem,
      dimension: filters[functionTypes.DIMENSION].lastDroppedItem.join('')
    }),
    depend: filtersData
  });
  const [chartData, setChartData] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setChartData(response);
    }
  }, [response]);
  useEffect(() => {
    if (chartData.length >= 1) {
      const [labelObject, ...restChartData] = chartData;
      setDataLabels(labelObject.values);
      setDataSets(() => {
        return restChartData.map((singleChart, i) => {
          return {
            label: singleChart.name,
            data: singleChart.values,
            fill: false,
            backgroundColor: dataColors[i],
            borderColor: dataColors[i + 3],
            yAxisID: 'y-axis-1'
          };
        });
      });
    }
    return () => {
      setDataSets([]);
      setDataLabels([]);
    };
  }, [chartData]);
  useEffect(() => {
    setFiltersData(filters);
  }, [filters]);
  return (
    <>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <div className={styles.chartContainer}>
          {error && <div>Error</div>}
          {chartData && filters && (
            <Line
              data={{
                labels: dataLabels,
                datasets: dataSets
              }}
              options={options}
            />
          )}
        </div>
      )}
    </>
  );
};
MultiAxisLine.propTypes = {
  filters: PropTypes.object.isRequired
};
const filtersIsSame = (prevFilters, nextFilters) => {
  return _.isEqual(prevFilters, nextFilters);
};
export default memo(MultiAxisLine, filtersIsSame);
