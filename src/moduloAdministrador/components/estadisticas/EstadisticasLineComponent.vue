<template>
  <div>
      <v-layout row wrap>

        <v-flex xs12 md2>
          <div class="estadisticas-selector">
            <div class="estadisticas-btn">
               <v-menu
                ref="menu1"
                :close-on-content-click="true"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-btn
                  slot="activator"
                  outline
                  icon
                >
                <v-icon small>date_range</v-icon>
                </v-btn>
                <v-date-picker
                no-title
                v-model="date"
                class="mt-3"
                min="2016-06-15"
                :max="today"
                locale="es-es"
                ></v-date-picker>
              </v-menu>
              <small style="line-height:.1rem">Fecha</small>
        </div>
            <div class="estadisticas-btn">
                <v-btn
                  outline
                  icon
                >
                <v-icon small>view_list</v-icon>
                </v-btn>
              <small style="line-height:.1rem">Servicios</small>
        </div>    
          </div>
            <div class="service-check" @click.stop="servicio.active = !servicio.active" v-for="(servicio, index) in dates" :key="index">
              <div class="check-container">
                <v-checkbox
                  color="gray"
                  style="max-width:30px; margin:2px;position:relative;top:8px;"
                  v-model="servicio.active"
                ></v-checkbox>
                <span :style="{color: servicio.color}">{{servicio.nombre}}</span>
              </div>
            </div>
        </v-flex>

        <v-flex xs12 md10 style="padding-top:10px">
          <line-chart :chart-data="servicios" :chart-labels="labels" />
        </v-flex>
      </v-layout>
  </div>
</template>
<script>
import estadisticasApi from "@/services/estadisticasService";
import LineChart from "@/moduloAdministrador/components/charts/LineChart";
import colors from "@/utils/getColors";
import fechas from "@/utils/getFechas";
export default {
  data() {
    return {
      date: null,
      menu: false,
      labels: [],
      dates: []
    };
  },
  watch: {
    date() {
      this.loadEstadisticas(fechas.formatDate(this.date));
    }
  },
  mounted() {
    this.loadEstadisticas();
  },
  methods: {
    loadEstadisticas(fecha = "") {
      estadisticasApi.getLine(fecha).then(data => {
        if (data) {
          this.labels = data.totalPorHoras.map(date => {
            let hora = date.hora;
            return this.getHora(hora);
          });
          // hacer q haga push
          this.dates[0] = {
            nombre: "Total de consumos",
            recurencia: data.totalPorHoras.map(date => {
              let total = date.total;
              return total;
            }),
            active: true,
            color: colors.getRgba("Total de consumos", 0.8)
          };
        }
      });
    },
    getHora(hora) {
      return hora < 10 ? `0${hora}:00` : `${hora}:00`;
    }
  },
  computed: {
    today() {
      return fechas.today();
    },
    servicios() {
      return {
        labels: this.labels,
        datasets: this.dates
          .map(servicio => {
            let elemento = {
              label: servicio.nombre,
              borderColor: colors.getRgba(servicio.nombre),
              pointBackgroundColor: "white",
              borderDash: [3],
              borderDashOffset: 4,
              borderJoinStyle: "miter",
              borderWidth: 1,
              pointBorderColor: "#249ebf",
              pointRadius: 4,
              steppedLine: false,
              backgroundColor: colors.getRgba(servicio.nombre, 0.3),
              fill: true,
              data: servicio.recurencia,
              active: servicio.active
            };
            return elemento;
          })
          .filter(servicio => servicio.active)
      };
    }
  },
  components: {
    LineChart
  }
};
</script>
<style scoped>
.estadisticas-selector {
  display: flex;
  align-items: center;
  padding-right: 15px;
}
.estadisticas-btn {
  width: 55px;
  text-align: center;
}
.estadisticas-btn > small {
  line-height: 0.2rem;
  color: var(--ds-txt-2);
  position: relative;
  top: -5px;
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
</style>
