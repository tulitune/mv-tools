<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div class="block">
            <p class="title is-5">Trigger CI Build</p>
            <h1 v-if="params.gitlabToken === undefined">Provide Gitlab Tigger Token in <a href="#settings">Settings</a></h1>
            <p class="control is-horizontal">
              <div class="control-label">
                <label class="label"></label>
              </div>
              <p class="control">
                <button v-if="params.gitlabToken !== undefined" class="button is-primary" :class="{'is-loading': isloading}" @click="triggerBuild">Trigger Build</button>
              </p>
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import Clipboard from 'clipboard'

const _GITLAB_URL = 'https://gitlab.corp.tune.com/api/v3/projects/452/trigger/builds/token=TOKEN'

export default {
  components: {
  },

  data () {
    return {
      params: {
        gitlabToken: '',
      },
      isloading: false
    }
  },
  created () {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      this.params.gitlabToken = localStorage.mvGitlabToken
    },
    triggerBuild () {
      this.isloading = true
      let _url = _GITLAB_URL.replace('TOKEN', this.params.gitlabToken)
      this.$http({
        method: 'POST',
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
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
