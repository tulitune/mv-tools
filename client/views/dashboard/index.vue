<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h4 class="title">Last 24 hours jobs</h4>
          <chart :type="'bar'" :data="seriesData" :options="options"></chart>
        </article>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
var localForage = require('localforage')

const _PROJECT_ID = localStorage.mvProjectId
const _TOKEN = localStorage.mvToken
const _IRON_IO_CODES_URL = 'https://worker-aws-us-east-1.iron.io/2/projects/{projectId}/codes?oauth={token}&page=0&per_page=100'.replace('{projectId}', _PROJECT_ID).replace('{token}', _TOKEN)
const _IRON_IO_CODES_STATS_URL = 'https://worker-aws-us-east-1.iron.io/2/projects/{projectId}/codes/{code_id}/stats?oauth={token}&page=0&per_page=100'.replace('{projectId}', _PROJECT_ID).replace('{token}', _TOKEN)


export default {
  components: {
    Chart
  },

  data () {
    return {
      data: [
        [],
        []
      ],
      params: {
        token: '',
        projectId: ''
      },
      isloading: false,
      options: {
        tooltips: {
          mode: 'label'
        }
      },
      backgroundColor: [
        'rgba(0, 255, 0, 1)',
        'rgba(255, 0, 0, 1)',
      ],
      series: ['Completed', 'Error'],
      labels: [],
    }
  },

  computed: {
    seriesData () {
      let data = {
        labels: this.labels
      }
      data.datasets = this.series.map((e, i) => {
        return {
          data: this.data[i],
          label: this.series[i],
          backgroundColor: this.backgroundColor[i]
        }
      })
      return data
    }
  },
  created () {
    this.loadSettings()
    this.getStats()
  },
  mounted () {
  },
  methods: {
    loadSettings() {
      let _this = this
      localForage.getItem('mvToken', function (err, value) {
        _this.params.token = value
      });
      localForage.getItem('mvProjectId', function (err, value) {
        _this.params.projectId = value
      });
    },
    getCodeStats(codeId, codeName) {
      let _url = _IRON_IO_CODES_STATS_URL.replace('{code_id}', codeId)
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        // this.codesStats.push({
        //     key:   codeId,
        //     value: response.data
        // });
        this.labels.push(codeName)
        this.data[0].push(response.data.complete)
        this.data[1].push(response.data.error)
      }).catch((error) => {
        console.log(error)
      })
    },

    getStats () {
      this.isloading = true
      let _url = _IRON_IO_CODES_URL
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let codes = response.data.codes
        let arrayLength = response.data.codes.length;
        for (let i = 0; i < arrayLength; i++) {
            this.getCodeStats(codes[i].id, codes[i].name)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
