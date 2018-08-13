<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array | Object,
      required: false
    }
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          XAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ]
        },
        legend: {
          display: true,
          labels: {
            fontColor: "white"
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: ["Red", "Yellow", "Blue"],
        datasets: [
          {
            backgroundColor: ["red", "blue", "green"],
            data: [30, 20, 30]
          }
        ]
      },
      this.options
    );
  }
};
</script>
