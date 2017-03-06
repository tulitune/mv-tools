<template>
  <div>
    <div class="tile is-ancestor">
            <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div class="block">
            <p class="title is-5">Request Params</p>
            <a href="https://www.iron.io" class="link">Iron.io</a>
          </div>
          <div class="block">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Token</label>
              </div>
              <div class="control is-fullwidth">
                  <input class="input" type="text" v-model="params.token">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Task ID</label>
              </div>
              <div class="control is-fullwidth">
                  <input class="input" type="text" v-model="params.taskId">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label"></label>
              </div>
              <div class="control">
                <button class="button is-primary" :class="{'is-loading': isloading}" @click="loadData">Get Payload</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-8">
        <article class="tile is-child box">
        <p class="title control" :class="{'is-loading': isloading}">
          Payload of {{cost}}
          <!--<span class="subtitle help is-danger is-5">
            This demo only works under Development env
          </span>-->
        </p>
        <pre>{{payload}}</pre>
        <!--<chart :type="'line'" :data="stockData" :options="options"></chart>-->
      </article>
      </div>

    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

const _PROJECT_ID = '570550f12031f000067c64a9'
const _IRON_IO_URL = 'https://worker-aws-us-east-1.iron.io/2/projects/{projectId}/tasks/{taskId}?oauth={token}'.replace('{projectId}', _PROJECT_ID)

export default {
  components: {
    Chart
  },

  data () {
    return {
      params: {
        token: localStorage.mvToken,
        taskId: localStorage.mvTaskId
      },
      payload: '',
      cost: '',
      isloading: false
    }
  },

  methods: {
    loadData () {
      this.isloading = true
      localStorage.mvToken = this.params.token
      localStorage.mvTaskId = this.params.taskId
      var _url = _IRON_IO_URL.replace('{taskId}', this.params.taskId).replace('{token}', this.params.token)
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let _payload = JSON.parse(response.data.payload)
        _payload.upload.s3_url = ''
        this.payload = _payload
        this.cost = response.data.code_name
        this.isloading = false
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
</style>
