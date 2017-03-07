<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">Last 24 hours</h4>
          <div class="content">
            <chart :type="'doughnut'" :data="chartData"></chart>
          </div>
        </article>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

const _PROJECT_ID = '570550f12031f000067c64a9'
const _IRON_IO_URL = 'https://worker-aws-us-east-1.iron.io/2/projects/{projectId}/tasks?oauth={token}&page=10&per_page=100'.replace('{projectId}', _PROJECT_ID)

export default {
  components: {
    Chart
  },

  data () {
    return {
      data: [],
      isloading: false
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Error',
          'Cancelled',
          'Running',
          'Complete'
        ],
        datasets: [{
          data: this.data,
          backgroundColor: [
            'red',
            'orange',
            'blue',
            'green'
          ]
        }]
      }
    }
  },
  created () {
    this.loadData()
  },
  mounted () {
  },

  methods: {
    loadData () {
      this.isloading = true
      this.data.length = 0
      var _url = _IRON_IO_URL.replace('{token}', localStorage.mvToken)
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        // let _tasks = response.data.tasks
        // let _completed = _tasks.filter(function(task){return task.status == 'complete'}).length
        // let _error = _tasks.filter(function(task){return task.status == 'error'}).length
        // let _running = _tasks.filter(function(task){return task.status == 'running'}).length
        // let _cancelled = _tasks.filter(function(task){return task.status == 'cancelled'}).length
        // this.isloading = false
        // this.data.push(_error, _cancelled, _running, _completed)
        this.data.push(10, 7, 5, 85)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
