<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <img src="https://www.iron.io/wp-content/uploads/2016/02/290x160_Iron_white_logo.png" height="40" width="40"></img>
          <h1 class="title">Iron.io</h1>
          <div class="block">
            <label class="label">Project ID</label>
            <p class="control">
              <input class="input" type="text" placeholder="Project ID" v-model="mvProjectId">
            </p>
            <label class="label">Token</label>
            <p class="control has-icon has-icon-right">
              <input class="input is-success" type="text" placeholder="Token" v-model="mvToken">
            </p>
            <p class="control">
              <button class="button is-primary" @click="saveSettings">Save</button>
              <button class="button is-link" @click="loadSettings">Cancel</button>
            </p>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <i class="fa fa-github fa-2x" aria-hidden="true"></i>
          <h1 class="title">GitHub</h1>
          <div class="block">
          <label class="label">Username</label>
            <p class="control">
              <input class="input" type="text" placeholder="Username" v-model="mvGithubUser">
            </p>
            <label class="label">Token</label>
            <p class="control">
              <input class="input" type="text" placeholder="Token" v-model="mvGithubToken">
            </p>
            <!--<p class="control">
              <button class="button is-primary" @click="saveSettings">Save</button>
              <button class="button is-link" @click="loadSettings">Cancel</button>
            </p>-->
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <img src="https://gitlab.com/gitlab-com/gitlab-artwork/raw/master/logo/logo.png" width="25" height="25"></img>
          <h1 class="title">GitLab</h1>
          <div class="block">
            <label class="label">Token</label>
            <p class="control">
              <input class="input" type="text" placeholder="Token" v-model="mvGitlabToken">
            </p>
            <!--<p class="control">
              <button class="button is-primary" @click="saveSettings">Save</button>
              <button class="button is-link" @click="loadSettings">Cancel</button>
            </p>-->
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Cleave from 'vue-cleave'
import 'cleave.js/dist/addons/cleave-phone.cn'

export default {
  components: {
    Cleave
  },
  data () {
    return {
      mvProjectId: '',
      mvToken: '',
      mvGitlabToken: '',
      mvGithubToken: '',
      mvGithubUser: ''
    }
  },
  methods: {
    loadSettings() {
      this.mvToken = localStorage.mvToken 
      this.mvProjectId = localStorage.mvProjectId
      this.mvGitlabToken = localStorage.mvGitlabToken
      this.mvGithubToken = localStorage.mvGithubToken
      this.mvGithubUser = localStorage.mvGithubUser
    },
    saveSettings() {
      this.$store.commit('setToken', this.mvToken)
      this.$store.commit('setProjectId', this.mvProjectId)
      localStorage.mvToken = this.mvToken
      localStorage.mvProjectId = this.mvProjectId
      localStorage.mvGitlabToken = this.mvGitlabToken
      localStorage.mvGithubToken = this.mvGithubToken
      localStorage.mvGithubUser = this.mvGithubUser
      // console.log(this.$store.state.settings)
    }
  },
  created () {
    this.loadSettings()
  },
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.button {
  margin: 5px 0 0;
}

.control .button {
  margin: inherit;
}

.control.has-addons {
  @include mobile() {
    input {
      width: 100%;
    }

    input.is-expanded {
      flex-shrink: 1;
    }
  }
}
</style>
