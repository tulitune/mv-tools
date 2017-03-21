<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
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
      mvToken: ''
    }
  },
  methods: {
    loadSettings() {
      this.mvToken = localStorage.mvToken 
      this.mvProjectId = localStorage.mvProjectId
    },
    saveSettings() {
      this.$store.commit('setToken', this.mvToken)
      this.$store.commit('setProjectId', this.mvProjectId)
      localStorage.mvToken = this.mvToken
      localStorage.mvProjectId = this.mvProjectId
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
