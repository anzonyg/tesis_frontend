<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary w-100">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <i class="bi bi-bar-chart-fill"></i> Sensor Dashboard
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link class="nav-link active" to="/">Inicio</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Header -->
        <header class="bg-header text-center text-white py-5 w-100">
            <div class="container-fluid p-0">
                <h1 class="display-4">Monitorización de Sensores</h1>
                <p class="lead">Consulta datos de temperatura y humedad en tiempo real</p>
            </div>
        </header>

        <!-- Main Content -->
        <section class="container-fluid my-5">
            <p><strong>Distancia:</strong> {{ ultimoDato.distancia }} cm</p>
            <p><strong>RFID:</strong> {{ ultimoDato.rfid }}</p>
            <div class="row text-center justify-content-center w-100">
                <!-- Tarjeta de Temperatura -->
                <div class="col-12 col-md-6 mb-4">
                    <div class="card shadow border-0 h-100 d-flex flex-column align-items-center">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center">
                            <!-- Icono de temperatura y valor actual -->
                            <div class="d-flex align-items-center">
                                <i class="bi bi-thermometer-half display-1 text-primary"></i>
                                <h4 class="ms-3">{{ ultimoDato.temperatura }} °C</h4>
                            </div>
                            <h3 class="card-title mt-3">Gráfica de Temperatura</h3>
                            <div style="width: 100%; height: 400px;">
                                <LineChart v-if="temperatureData.labels.length > 0" :chart-data="temperatureData"
                                    :chart-options="TemperaturaHoraChartOptions" />
                            </div>
                            <div style="width: 100%; height: 400px;">
                                <LineChart v-if="temperatureDataDay.datasets.length > 0"
                                    :chart-data="temperatureDataDay" :chart-options="chartOptionsTemperatureDay" />
                            </div>
                            <div style="width: 100%; height: 400px;">
                                <LineChart v-if="temperatureDataByMonth.datasets.length > 0"
                                    :chart-data="temperatureDataByMonth"
                                    :chart-options="chartOptionsTemperatureByMonth" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tarjeta de Humedad -->
                <div class="col-12 col-md-6 mb-4">
                    <div class="card shadow border-0 h-100 d-flex flex-column align-items-center">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center">
                            <!-- Icono de humedad y valor actual -->
                            <div class="d-flex align-items-center">
                                <i class="bi bi-moisture display-1 text-success"></i>
                                <h4 class="ms-3">{{ ultimoDato.humedad }} %</h4>
                            </div>
                            <h3 class="card-title mt-3">Gráfica de Humedad</h3>
                            <div style="width: 100%; height: 400px;">
                                <LineChart v-if="humidityData.labels.length > 0" :chart-data="humidityData"
                                    :chart-options="HumedadHoraChartOptions" />
                            </div>
                            <div style="width: 100%; height: 400px;">
                                <LineChart v-if="humidityDataDay.datasets.length > 0" :chart-data="humidityDataDay"
                                    :chart-options="chartOptionsHumidityDay" />
                            </div>
                            <div style="width: 100%; height: 400px;">
                                <LineChart v-if="humidityDataByMonth.datasets.length > 0"
                                    :chart-data="humidityDataByMonth" :chart-options="chartOptionsHumidityByMonth" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Footer -->
        <footer class="bg-dark text-white text-center py-3 w-100">
            <div class="container-fluid">
                <p>Proyecto de Tesis - Monitorización de Sensores de Temperatura y Humedad</p>
            </div>
        </footer>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'; // Asegúrate de que la ruta es correcta
import API_BASE_URL from '../dir';
export default {
    name: "Home",
    components: {
        LineChart
    },
    data() {
        return {
            currentTemperature: null,
            currentHumidity: null,
            ultimoDato: {},
            labels: [], // Etiquetas para la gráfica
            datos: [], // Datos para la gráfica
            // Datos de ejemplo para la gráfica de temperatura
            temperatureData: {
                labels: [],
                datasets: [
                    {
                        label: 'Temperatura por Hora (°C)',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: [],  // Datos inicializados como un array vacío
                        fill: false
                    }
                ]
            },
            humidityData: {
                labels: [],
                datasets: [
                    {
                        label: 'Humedad por Hora (%)',
                        backgroundColor: '#71B7E6',
                        borderColor: '#1E88E5',
                        data: [],  // Datos inicializados como un array vacío
                        fill: false
                    }
                ]
            },
            temperatureDataDay: {
                labels: Array.from({ length: 31 }, (_, i) => i + 1), // Días del mes (1 al 31)
                datasets: []
            },
            humidityDataDay: {
                labels: Array.from({ length: 31 }, (_, i) => i + 1), // Días del mes (1 al 31)
                datasets: []
            },
            temperatureDataByMonth: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: []
            },
            humidityDataByMonth: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: []
            },
            // Opciones de las gráficas
            HumedadHoraChartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        type: 'category',  // Indica que el eje X es de tipo categoría, no tiempo
                        title: {
                            display: true,
                            text: 'Hora del Día'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Humedad (%)'  // Cambiado a humedad
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            },
            TemperaturaHoraChartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        type: 'category',  // Indica que el eje X es de tipo categoría, no tiempo
                        title: {
                            display: true,
                            text: 'Hora del Día'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperatura (°C)'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            },
            chartOptionsTemperatureDay: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const value = dataset.data[tooltipItem.index];
                            return value !== null && value !== undefined ? `${dataset.label}: ${value}` : 'Sin datos';
                        }
                    }
                },
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
                            text: 'Día del Mes'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperatura (°C)'  // Título del eje Y para temperatura
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            },
            chartOptionsHumidityDay: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const value = dataset.data[tooltipItem.index];
                            return value !== null && value !== undefined ? `${dataset.label}: ${value}` : 'Sin datos';
                        }
                    }
                },
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
                            text: 'Día del Mes'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Humedad (%)'  // Título del eje Y para humedad
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            },
            chartOptionsTemperatureByMonth: {
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
                            text: 'Mes del Año'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperatura (°C)'  // Título del eje Y para temperatura
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            },
            chartOptionsHumidityByMonth: {
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
                            text: 'Mes del Año'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Humedad (%)'  // Título del eje Y para humedad
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            },
        };
    },
    methods: {
        async obtenerUltimoDato() {
            try {
                const response = await fetch(`${API_BASE_URL}ultimo-dato`);
                const data = await response.json();
                this.ultimoDato = data;
            } catch (error) {
                console.error('Error obteniendo el último dato:', error);
            }
        },
        async obtenerDatosTemperaturaPorHora() {
            try {
                const response = await fetch(`${API_BASE_URL}temperatura-hora`);
                const datos = await response.json();

                // Filtra posibles entradas con _id null o datos incorrectos
                const filteredData = datos.filter(d => d._id !== null);

                // Procesa los datos recibidos
                this.labels = datos.map(d => `${d._id.padStart(2, '0')}:00`);  // Asegúrate de que los números tengan dos dígitos
                this.datos = filteredData.map(d => d.temperaturaPromedio); // Datos de temperatura

                // Actualiza los datos de la gráfica
                this.temperatureData = {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'Temperatura por Hora (°C)',
                            backgroundColor: '#42A5F5',
                            borderColor: '#1E88E5',
                            data: this.datos,
                            fill: false
                        }
                    ]
                };
            } catch (error) {
                console.error('Error al obtener los datos por hora:', error);
            }
        },
        async obtenerDatosHumedadPorHora() {
            try {
                const response = await fetch(`${API_BASE_URL}humedad-hora`);  // Cambia la ruta al endpoint correcto
                const datos = await response.json();

                // Construir las etiquetas de horas en formato 24 horas y los valores de humedad promedio
                this.labels = datos.map(d => `${d._id.padStart(2, '0')}:00`);  // Asegura el formato 24 horas
                this.datosHumedad = datos.map(d => d.humedadPromedio);  // Obtener los valores de humedad promedio

                // Actualizar el objeto humidityData con los nuevos datos
                this.humidityData = {
                    labels: this.labels,  // Etiquetas (horas en formato 24h)
                    datasets: [
                        {
                            label: 'Humedad por Hora (%)',  // Etiqueta del conjunto de datos
                            backgroundColor: '#71B7E6',  // Color de fondo de la línea
                            borderColor: '#1E88E5',  // Color del borde de la línea
                            data: this.datosHumedad,  // Datos de humedad promedio
                            fill: false  // No llenar el área bajo la línea
                        }
                    ]
                };

            } catch (error) {
                console.error('Error al obtener los datos por hora:', error);
            }
        },
        async obtenerDatosPorDia() {
            try {
                // Obtener datos de temperatura por día
                const temperaturaResponse = await fetch(`${API_BASE_URL}/temperatura-dia`);
                const temperaturaDatos = await temperaturaResponse.json();


                // Agrupar los datos por mes
                const groupedTemperatureData = {};
                temperaturaDatos.forEach(dato => {
                    const mes = dato._id.mes;
                    if (!groupedTemperatureData[mes]) {
                        groupedTemperatureData[mes] = [];
                    }
                    groupedTemperatureData[mes][dato._id.dia - 1] = dato.temperaturaPromedio || null;
                });


                // Crear datasets para cada mes
                const temperatureDatasets = Object.keys(groupedTemperatureData).map(mes => {
                    const dataForMonth = Array(31).fill(null);
                    groupedTemperatureData[mes].forEach((dato, index) => {
                        dataForMonth[index] = dato || null;
                    });

                    return {
                        label: `Mes ${mes}`,
                        data: dataForMonth,
                        fill: false,
                        borderColor: this.getColorForMonth(mes)
                    };
                });


                // Actualizar la gráfica
                this.temperatureDataDay.datasets = temperatureDatasets;

                // Repetir para la humedad
                const humedadResponse = await fetch(`${API_BASE_URL}/humedad-dia`);
                const humedadDatos = await humedadResponse.json();


                const groupedHumidityData = {};
                humedadDatos.forEach(dato => {
                    const mes = dato._id.mes;
                    if (!groupedHumidityData[mes]) {
                        groupedHumidityData[mes] = [];
                    }
                    groupedHumidityData[mes][dato._id.dia - 1] = dato.humedadPromedio || null;
                });
                const humidityDatasets = Object.keys(groupedHumidityData).map(mes => {
                    const dataForMonth = Array(31).fill(null);
                    groupedHumidityData[mes].forEach((dato, index) => {
                        dataForMonth[index] = dato || null;
                    });

                    return {
                        label: `Mes ${mes}`,
                        data: dataForMonth,
                        fill: false,
                        borderColor: this.getColorForMonth(mes)
                    };
                });
                this.humidityDataDay.datasets = humidityDatasets;
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },
        getColorForMonth(mes) {
            // Función para generar colores distintos por cada mes
            const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
            return colores[mes % colores.length];
        },
        async obtenerDatosPorMes() {
            try {
                // Obtener datos de temperatura por mes y año
                const temperaturaResponse = await fetch(`${API_BASE_URL}/temperatura-mes`);
                const temperaturaDatos = await temperaturaResponse.json();

                // Agrupar los datos de temperatura por año
                const groupedTemperatureData = {};
                temperaturaDatos.forEach(dato => {
                    const ano = dato._id.ano;
                    if (!groupedTemperatureData[ano]) {
                        groupedTemperatureData[ano] = [];
                    }
                    groupedTemperatureData[ano][dato._id.mes - 1] = dato.temperaturaPromedio || null;
                });

                // Crear datasets para cada año en la gráfica de temperatura
                const temperatureDatasets = Object.keys(groupedTemperatureData).map(ano => {
                    const dataForYear = Array(12).fill(null); // 12 meses del año
                    groupedTemperatureData[ano].forEach((dato, index) => {
                        dataForYear[index] = dato || null;
                    });

                    return {
                        label: `Año ${ano}`,
                        data: dataForYear,
                        fill: false,
                        borderColor: this.getColorForYear(ano)  // Función que genera colores para cada año
                    };
                });

                // Actualizar la gráfica de temperatura
                this.temperatureDataByMonth.datasets = temperatureDatasets;

                // Obtener datos de humedad por mes y año
                const humedadResponse = await fetch(`${API_BASE_URL}/humedad-mes`);
                const humedadDatos = await humedadResponse.json();

                // Agrupar los datos de humedad por año
                const groupedHumidityData = {};
                humedadDatos.forEach(dato => {
                    const ano = dato._id.ano;
                    if (!groupedHumidityData[ano]) {
                        groupedHumidityData[ano] = [];
                    }
                    groupedHumidityData[ano][dato._id.mes - 1] = dato.humedadPromedio || null;
                });

                // Crear datasets para cada año en la gráfica de humedad
                const humidityDatasets = Object.keys(groupedHumidityData).map(ano => {
                    const dataForYear = Array(12).fill(null);
                    groupedHumidityData[ano].forEach((dato, index) => {
                        dataForYear[index] = dato || null;
                    });

                    return {
                        label: `Año ${ano}`,
                        data: dataForYear,
                        fill: false,
                        borderColor: this.getColorForYear(ano)  // Función que genera colores para cada año
                    };
                });

                // Actualizar la gráfica de humedad
                this.humidityDataByMonth.datasets = humidityDatasets;

            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },
        getColorForYear(ano) {
            // Función para generar colores distintos por cada año
            const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
            return colores[ano % colores.length];
        }
    },
    mounted() {
        this.obtenerUltimoDato();
        this.obtenerDatosTemperaturaPorHora();
        this.obtenerDatosHumedadPorHora();
        this.obtenerDatosPorDia();
        this.obtenerDatosPorMes();
        setInterval(this.obtenerUltimoDato, 10000);

    }

};
</script>

<style scoped>
.bg-header {
    background-color: #2c3e50;
    background-image: url('https://source.unsplash.com/1600x400/?technology,data');
    background-size: cover;
    background-position: center;
    min-height: 300px;
    width: 100%;
}

.navbar-dark .navbar-nav .nav-link {
    color: #ecf0f1;
}

.navbar-dark .navbar-nav .nav-link.active {
    color: #1abc9c;
}

footer {
    background-color: #34495e;
}

.card-title {
    font-size: 1.5rem;
}
</style>
