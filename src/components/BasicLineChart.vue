<template>
    <div style="position: relative; height: 400px; width: 600px;">
      <Line :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  export default {
    data() {
      return {
        chartData: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Temperatura (°C)',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [10, 20, 30, 40, 50, 60],
              fill: false,
            }
          ]
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Meses',
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temperatura (°C)',
              }
            }
          }
        }
      };
    },
  mounted() {
    console.log(this.chartData); // Verifica los datos de la gráfica
    console.log(this.chartOptions); // Verifica las opciones de la gráfica
  }
  };
  </script>
  