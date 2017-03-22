import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})

Vue.filter('imageUpdater', function(value) {
  if (value) {
    // Ohad
    if (value === 1316941){
      return 'https://avatars2.githubusercontent.com/u/24241785?v=3'
    }
    // Tuli
    if (value === 1334444){
      return 'https://avatars0.githubusercontent.com/u/24242128?v=3'
    }
    // Jeff
    if (value === 1220768){
      return 'https://avatars2.githubusercontent.com/u/4296161?v=3'
    }
    return value
  }
})