<template>
  <div>
    <div class="inter-card-container inter-container">
        <formInformation title="Estadísticas de la plataforma" description="Muestra las estadísticas de la plataforma, segmentado por servicios, fechas y consumos.">

        </formInformation>
      <EstadisticasLineComponent/>
     <!--  <v-layout row wrap>

        <v-flex xs12 md3>
          <div class="service-select">
            <v-overflow-btn
            block
          :items="itemsSize"
          label="5"
        ></v-overflow-btn>
        <span>Servicos:</span>
            <div class="service-check" v-for="(servicio, index) in topServicios" :key="index">
              <div class="check-container">
                <v-checkbox
                  color="primary"
                  style="max-width:30px; margin:2px;position:relative;top:8px"
                  v-model="servicio.active"
                ></v-checkbox>
                <span>{{servicio.nombre}}</span>
              </div>
            </div>
          </div>
        </v-flex>

        <v-flex xs12 md9>
          <line-chart :chart-data="servicios"/>
        </v-flex>

        <v-flex xs12 md8>
         <user-rutas />
        </v-flex>

      </v-layout> -->
    </div><!-- cambiar a <v-container></v-container> para toda la pantall-->
  </div>
</template>

<script>
import EstadisticasLineComponent from '@/moduloAdministrador/components/estadisticas/EstadisticasLineComponent'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
import LineChart from '@/moduloAdministrador/components/charts/LineChart'
import PieChart from '@/moduloAdministrador/components/charts/PieChart'
import userRutas from '@/moduloAdministrador/components/usersComponents/userRutas/UserRutasMainComponent'
import colors from '@/utils/getColors'
export default {
  data () {
    return {
      topServicios: [
        {
          nombre: 'RUAT',
          recurencia: [120, 12, 23, 64, 312],
          active: true
        },
        {
          nombre: 'SICOES',
          recurencia: [220, 82, 79, 164, 212],
          active: true
        },
        {
          nombre: 'XTR',
          recurencia: [120, 56, 123, 64, 142],
          active: true
        },
        {
          nombre: 'SENASAG',
          recurencia: [190, 200, 200, 202, 200],
          active: true
        },
        {
          nombre: 'BUSS',
          recurencia: [12, 372, 23, 64, 12],
          active: true
        }
      ],
      iopLabels: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      itemsSize: [5, 10]
    }
  },
  components: {
    EstadisticasLineComponent,
    LineChart,
    PieChart,
    userRutas,
    formInformation
  },
  methods: {},
  computed: {
    servicios () {
      return {
        labels: this.iopLabels,
        datasets: this.topServicios
          .map(servicio => {
            let elemento = {
              label: servicio.nombre,
              borderColor: colors.getRgba(servicio.nombre),
              pointBackgroundColor: 'white',
              borderDash: [3],
              borderDashOffset: 4,
              borderJoinStyle: 'miter',
              borderWidth: 1,
              pointBorderColor: '#249ebf',
              pointRadius: 4,
              steppedLine: false,
              backgroundColor: colors.getRgba(servicio.nombre, 0.3),
              fill: true,
              data: servicio.recurencia,
              active: servicio.active
            }
            return elemento
          })
          .filter(servicio => servicio.active)
      }
    },
    pieDatos () {
      let size = 5
      let elementos = []
      for (let i = 0; i < size; i++) {
        let elemento = {
          label: 'Servicio 3',
          borderColor: '#ff9eff',
          pointBackgroundColor: 'white',
          borderWidth: 0,
          pointBorderColor: '#249ebf',
          backgroundColor: 'red',
          data: [2, 3, 4]
        }
        elementos.push(elemento)
      }
      return elementos
    }
  }
}
</script>

<style scoped>
.service-select {
  padding: 0 5px;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.check-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.check-container > span {
  text-transform: lowercase;
  font-weight: 300;
}
.check-container > span::first-letter {
  text-transform: capitalize;
}
.catalogo {
  width: 100%;
}

.iop-chart {
  background-color: var(--ds-bg-2);
  padding: 16px;
}
</style>
