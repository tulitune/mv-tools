<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div class="block">
            <p class="title is-5">Use Client ID and Partner ID</p>
            <!--<a href="https://www.iron.io" class="link">Iron.io</a>-->
          </div>
          <div class="block">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Client ID</label>
              </div>
              <div class="control is-fullwidth">
                  <input class="input" type="text" v-model="params.clientId">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Partner ID</label>
              </div>
              <div class="control is-fullwidth">
                  <input class="input" type="text" v-model="params.partnerId">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label"></label>
              </div>
              <div class="control">
                <button class="button is-primary" :class="{'is-loading': isloading}" @click="loadData">Get Credentials</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-8">
        <article class="tile is-child box">
        <p class="title control" :class="{'is-loading': isloading}">
          Credentials of {{cost}}
        </p>
        <pre id="credentials" class="relative-pre">{{credentials}}<div class="top-right"><button v-if="credentials !== ''" id="clipboardBtn" class="button is-primary" data-clipboard-target="#credentials">Copy To Clipboard</button></div></pre>
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
                <th>Client Name</th>
                <th>Partner Name</th>
                <th>Credentials</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in history">
                <td>{{item.client.name}}</td>
                <td>{{item.partner.name}}</td>
                <td>{{item.partner_accounts[0].credentials}}</td>
                <td class="is-icon">
                  <a @click="displayCredentials(item.partner_accounts[0].credentials)">
                    <i class="fa fa-lock fa-2x"></i>
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
import Clipboard from 'clipboard'

new Clipboard('#clipboardBtn')

const _GET_CREDENTIALS_URL = 'http://{host}:{port}/credz/{clientId}/{partnerId}'

export default {
  components: {
    Chart
  },

  data () {
    return {
      params: {
        clientId: '',
        partnerId: '',
      },
      credentials: '',
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
      this.params.clientId = localStorage.clientId
      this.params.partnerId = localStorage.partnerId
      if (localStorage.mvCredzHistory === undefined){
        localStorage.mvCredzHistory = '[]'
      }
      this.history = JSON.parse(localStorage.mvCredzHistory)
    },
    loadData () {
      this.isloading = true
      var _url = _GET_CREDENTIALS_URL.replace('{host}', localStorage.mvGetCredentialsHost).replace('{port}', localStorage.mvGetCredentialsPort).replace('{clientId}', this.params.clientId).replace('{partnerId}', this.params.partnerId)
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let _credentials = response.data.partner_accounts[0].credentials
        this.credentials = _credentials
        this.saveItemToStorage(JSON.stringify(response.data))
        this.isloading = false
      }).catch((error) => {
        console.log(error)
        this.isloading = false
      })
    },
    saveItemToStorage(item) {
      let currentHistory = JSON.parse(localStorage.mvCredzHistory)
      if (currentHistory == null) {
        currentHistory = []
      }
      let _credentials = JSON.parse(item)
      currentHistory.push(_credentials)
      localStorage.mvCredzHistory = JSON.stringify(currentHistory)
      this.loadSettings()
    },
    displayCredentials(credentials) {
      this.credentials = credentials
    },
    clearHistory() {
      this.history = []
      localStorage.mvCredzHistory = null
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
