import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useAxios from "../../hooks/useAxios";
import { functionTypes } from "../../utils/functionTypes";
import { dataColors } from "../../utils/dataColors";
import styles from "./Chart.module.scss";

const options = {
  responsive: true,
};
const MultiAxisLine = ({ filters }) => {
  const { response, loading, error } = useAxios({
    method: "post",
    url: "/data",
    headers: JSON.stringify({ accept: "*/*" }),
    data: JSON.stringify({
      measures: filters[functionTypes.MEASURE].lastDroppedItem,
      dimension: filters[functionTypes.DIMENSION].lastDroppedItem.join(""),
    }),
    dep: filters,
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
            yAxisID: "y-axis-1",
          };
        });
      });
    }
    return () => {
      setDataSets([]);
      setDataLabels([]);
    };
  }, [chartData]);
  return (
    <>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <div className={styles.chartContainer}>
          {error && <div>Error</div>}
          {chartData && (
            <Line
              data={{
                labels: dataLabels,
                datasets: dataSets,
              }}
              options={options}
            />
          )}
        </div>
      )}
    </>
  );
};
export default MultiAxisLine;
