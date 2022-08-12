import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getAllList } from './Services/restClient';

const optionsTemplate = {
  chart: {
    id: 'currencies-comparison',
  },
  xaxis: {
    categories: [],
  },
};

const seriesTemplate = [
  {
    name: 'series-1',
    data: [],
  },
];

const App = () => {
  const [configuration, setConfiguration] = useState({
    options: {
      ...optionsTemplate,
    },
    series: [...seriesTemplate],
  });

  useEffect(() => {
    getAllList()
      .then((data) => {
        console.log(data);
        const { bpi } = data;
        const options = { ...optionsTemplate };
        const seriesItem = {
          name: 'series-1',
          data: [],
        };

        for (let currencyName in bpi) {
          const currencyData = bpi[currencyName];
          const { rate_float } = currencyData;
          options.xaxis.categories.push(currencyName);
          seriesItem.data.push(rate_float);
        }
        setConfiguration({
          options,
          series: [seriesItem],
        });
      })
      .catch(() => {
        setConfiguration({});
      });
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={configuration.options} series={configuration.series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
};

export default App;
