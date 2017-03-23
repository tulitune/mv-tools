<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div class="block">
            <!--<p class="title is-5">Use Task ID or Task log url</p>-->
          </div>
          <div class="block">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label"></label>
              </div>
              <div class="control">
                <button class="button is-primary" :class="{'is-loading': isloading}" @click="getRepos">Get Commits</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-8">
        <article class="tile is-child box">
            <div class="control is-grouped">
            <h4 class="title">Latest Commits</h4>
           </div>
          <table class="table">
            <thead>
              <tr>
                <th>Commiter</th>
                <th>Message</th>
                <th>Repo</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in commits">
                <td>{{item.commiter}}</td>
                <td>{{item.message}}</td>
                <td>{{item.repo}}</td>
                <td>{{item.date | formatDate}}</td>
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
import moment from 'moment'

const _GITHUB_API_REPOS_URL = 'https://api.github.com/user/repos?affiliation=owner'
const _GITHUB_API_COMMITS_URL = 'https://api.github.com/repos/{user}/{repo}/commits?author={user}'

export default {
  components: {
    Chart
  },

  data () {
    return {
      params: {
        token: '',
        user: ''
      },
      repos: [],
      commits: [],
      isloading: false,
      auth: {}
    }
  },
  created () {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      this.params.token = localStorage.mvGithubToken
      this.params.user = localStorage.mvGithubUser
      this.auth =  {
          username: this.params.user,
          password: this.params.token
      }
    },
    getRepos () {
      this.isloading = true
      this.commits = []
      this.repos = []
      var _url = _GITHUB_API_REPOS_URL
      this.$http({
        url: _url,
        auth: this.auth,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let repos = response.data
        let reposList = []
        for (let i = 0; i < repos.length; i++) {
            let name = repos[i].name
            reposList.push(name)
            this.getCommits(name)
        }
        this.reposList = reposList
        this.isloading = false
      }).catch((error) => {
        console.log(error)
        this.isloading = false
      })
    },
    getCommits (repo) {
      this.isloading = true
      var _url = _GITHUB_API_COMMITS_URL.replace('{user}', this.params.user).replace('{repo}', repo).replace('{user}', this.params.user)
      this.$http({
        url: _url,
        auth: this.auth,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let commits = response.data
        for (let i = 0; i < commits.length; i++) {
            let commiter = commits[i].author.login
            let item = {
              'commiter': commiter,
              'message': commits[i].commit.message,
              'repo': repo,
              'date': commits[i].commit.author.date
            }
            if (moment().format('DD/MM/YYYY') === moment(String(item.date)).format('DD/MM/YYYY')){
              this.commits.push(item)
            }
        }        
        this.isloading = false
      }).catch((error) => {
        console.log(error)
        this.isloading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
