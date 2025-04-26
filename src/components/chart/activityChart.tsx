import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const series1 = [
  { x: new Date('2025-01-01').getTime(), y: 100 },
  { x: new Date('2025-02-01').getTime(), y: 120 },
  { x: new Date('2025-03-01').getTime(), y: 90 },
];

const series2 = [
  { x: new Date('2025-01-01').getTime(), y: 110 },
  { x: new Date('2025-02-01').getTime(), y: 100 },
  { x: new Date('2025-03-01').getTime(), y: 95 },
];

export const ApexChartss = () => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Activity/XP Movement',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
      title: {
        text: 'Value',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      y: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
    },
  };

  const series = [
    { name: 'Level XP', data: series1 },
    { name: 'Activities', data: series2 },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
};
