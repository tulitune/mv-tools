<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div class="block">
            <p class="title is-5">Use Task ID or Task log url</p>
            <!--<a href="https://www.iron.io" class="link">Iron.io</a>-->
          </div>
          <div class="block">
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
                <label class="label">Task Log URL</label>
              </div>
              <div class="control is-fullwidth">
                  <input class="input" type="text" v-model="params.taskUrl">
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
        </p>
        <pre id="payload" class="relative-pre">{{payload}}<div class="top-right"><button v-if="payload !== ''" id="clipboardBtn" class="button is-primary" data-clipboard-target="#payload">Copy To Clipboard</button></div></pre>
      </article>
      </div>

    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
            <div class="control is-grouped">
            <h4 class="title">History</h4>
            <p class="control">
              <a class="button is-danger is-outlined" @click="clearHistory" style="margin-left: 20px">
                <span class="icon">
                  <i class="fa fa-times"></i>
                </span>
                <span>Clear</span>
              </a>            
              </p>
           </div>
          <table class="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Created</th>
                <th>Task ID</th>
                <th>Client ID</th>
                <th>Partner ID</th>
                <th>Status</th>
                <th>Payload</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in history">
                <td>{{item.code_name}}</td>
                <td>{{item.created_at | formatDate}}</td>
                <td>{{item.id}}</td>
                <td>{{item.payload.job.client_id}}</td>
                <td>{{item.payload.job.partner_id}}</td>
                <td>{{item.status}}</td>
                <td class="is-icon">
                  <a @click="displayPayload(item)">
                    <i class="fa fa-rocket fa-2x"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import Clipboard from 'clipboard'

new Clipboard('#clipboardBtn')

const _PROJECT_ID = localStorage.mvProjectId
const _IRON_IO_URL = 'https://worker-aws-us-east-1.iron.io/2/projects/{projectId}/tasks/{taskId}?oauth={token}'.replace('{projectId}', _PROJECT_ID)

export default {
  components: {
    Chart
  },

  data () {
    return {
      params: {
        token: '',
        taskId: '',
        taskUrl: '',
        projectId: ''
      },
      payload: '',
      cost: '',
      history: [],
      isloading: false
    }
  },
  created () {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      this.params.token = localStorage.mvToken
      this.params.projectId = localStorage.mvProjectId
      if (localStorage.mvHistory === undefined){
        localStorage.mvHistory = '[]'
      }
      this.history = JSON.parse(localStorage.mvHistory)
    },
    loadData () {
      this.isloading = true
      if (this.params.taskUrl != ''){
        this.params.taskId = this.params.taskUrl.split('/')[7]
      }
      var _url = _IRON_IO_URL.replace('{projectId}', this.params.projectId).replace('{taskId}', this.params.taskId).replace('{token}', this.params.token)
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let _payload = JSON.parse(response.data.payload)
        _payload.upload.s3_url = ''
        this.payload = _payload
        this.saveItemToStorage(response.data)
        this.cost = response.data.code_name
        this.isloading = false
      }).catch((error) => {
        console.log(error)
        this.isloading = false
      })
    },
    saveItemToStorage(item) {
      let currentHistory = JSON.parse(localStorage.mvHistory)
      if (currentHistory == null) {
        currentHistory = []
      }
      let _payload = JSON.parse(item.payload)
      item.payload = _payload
      currentHistory.push(item)
      localStorage.mvHistory = JSON.stringify(currentHistory)
      this.loadSettings()
    },
    displayPayload(item) {
      this.payload = item.payload
      this.payload.upload.s3_url = ''
      this.cost = item.code_name
    },
    clearHistory() {
      this.history = []
      localStorage.mvHistory = null
      this.loadSettings()
    }
  }
}
</script>

<style scoped>
 .relative-pre{
   position:relative;
  }
 .top-right{
   position:absolute;
   top:0;
   right:0;
  }
</style>
