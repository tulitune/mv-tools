<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
            <div class="control is-grouped">
            <h4 class="title">Latest Docker Hub images</h4>
           </div>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size (MB)</th>
                <th>Last Updated</th>
                <th>Last Updater</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data">
                <td>{{item.name}}</td>
                <td>{{item.full_size | sizeFormat}}</td>
                <td>{{item.last_updated | timeFromNow}}</td>
                <td><img :src="item.last_updater | imageUpdater" height="30" width="30"><img></td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

const _DOCKER_HUB_URL = 'https://crossorigin.me/https://hub.docker.com/v2/repositories/tunelab/ironio_python3/tags/?page=1&page_size=200'

export default {
  components: {
    Chart
  },

  data () {
    return {
      data: [],
      isloading: false,
    }
  },

  computed: {
  },
  created () {
    this.getStats()
  },
  mounted () {
  },
  methods: {
    dataIsNotEmpty() {
      return this.data[0] != undefined
    },
    getStats () {
      this.isloading = true
      let _url = _DOCKER_HUB_URL
      this.$http({
        url: _url,
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        let results = response.data.results
        let arrayLength = results.length;
        let images = {}
        for (let i = 0; i < arrayLength; i++) {
            let name = results[i].name.split('-')[0]
            if (images[name] != undefined){
              if (Date.parse(results[i].last_updated) > Date.parse(images[name].last_updated)){
                images[name] = results[i]
              } else {
                continue
              }
            }
            images[name] = results[i]
        }
        this.data = images
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
