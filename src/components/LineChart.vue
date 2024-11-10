<template>
  <div style="position: relative; height: 400px; width: 600px;">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: false,
      default() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Horas'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temperatura (°C)'
              }
            }
          }
        };
      }
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
  const ctx = this.$refs.chartCanvas.getContext('2d');
  console.log('Datos recibidos para la gráfica:', this.chartData);  // Verificar los datos aquí

  this.chartInstance = new Chart(ctx, {
    type: 'line',
    data: this.chartData,  // Recibe los datos desde Home.vue
    options: this.chartOptions  // Aquí utilizas las opciones que le pasas desde Home.vue
  });
},
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>
