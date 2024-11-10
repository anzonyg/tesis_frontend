<template>
    <div class="container mt-4">
      <h1>Dashboard</h1>
      <div class="row">
        <!-- Temperatura Card -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <i class="bi bi-thermometer-half" style="font-size: 3rem;"></i>
              <h5 class="card-title">Temperatura</h5>
              <p class="card-text">{{ temperatureAverage }}°C (Promedio)</p>
            </div>
          </div>
        </div>
  
        <!-- Humedad Card -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <i class="bi bi-moisture" style="font-size: 3rem;"></i>
              <h5 class="card-title">Humedad</h5>
              <p class="card-text">{{ humidityAverage }}% (Promedio)</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Graficas -->
      <div class="row mt-4">
        <div class="col-md-6">
          <line-chart :chart-data="temperatureData"></line-chart>
        </div>
        <div class="col-md-6">
          <line-chart :chart-data="humidityData"></line-chart>
        </div>
      </div>
  
      <!-- Alerta -->
      <div class="text-center mt-4">
        <button @click="showAlert" class="btn btn-warning">Mostrar Alerta</button>
      </div>
    </div>
  </template>
  
  <script>
  import LineChart from '../components/LineChart.vue';
  import Swal from 'sweetalert2';
  
  export default {
    components: {
      LineChart
    },
    data() {
      return {
        temperatureData: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Temperatura (°C)',
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: [22, 24, 23, 21, 26, 25],
              fill: false,
            }
          ]
        },
        humidityData: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Humedad (%)',
              backgroundColor: '#71b7e6',
              borderColor: '#71b7e6',
              data: [60, 65, 63, 62, 68, 66],
              fill: false,
            }
          ]
        }
      };
    },
    computed: {
      temperatureAverage() {
        return this.calculateAverage(this.temperatureData.datasets[0].data);
      },
      humidityAverage() {
        return this.calculateAverage(this.humidityData.datasets[0].data);
      }
    },
    methods: {
      calculateAverage(data) {
        const sum = data.reduce((a, b) => a + b, 0);
        return (sum / data.length).toFixed(2);
      },
      showAlert() {
        Swal.fire({
          title: 'Información de Alertas',
          text: 'Ejemplo de alerta de SweetAlert2',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
    }
  };
  </script>
  
  <style scoped>
  i {
    color: #007bff;
  }
  </style>
  