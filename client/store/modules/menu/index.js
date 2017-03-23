import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
// import charts from './charts'
// import uifeatures from './uifeatures'
// import components from './components'
// import tables from './tables'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    {
      name: 'Get Payload',
      path: '/getpayload',
      meta: {
        icon: 'fa-rocket',
        link: 'payload/index.vue'
      },
      component: lazyLoading('payload', true)
    },
    {
      name: 'Get Credentials',
      path: '/credz',
      meta: {
        icon: 'fa-lock',
        link: 'credz/index.vue'
      },
      component: lazyLoading('credz', true)
    },
    {
      name: 'Docker Hub',
      path: '/dockerhub',
      meta: {
        icon: 'fa-database',
        link: 'docker/index.vue'
      },
      component: lazyLoading('docker', true)
    },
    {
      name: 'GitHub',
      path: '/github',
      meta: {
        icon: 'fa-github',
        link: 'github/index.vue'
      },
      component: lazyLoading('github', true)
    },
    {
      name: 'GitLab',
      path: '/gitlab',
      meta: {
        icon: 'fa-gitlab',
        link: 'gitlab/index.vue'
      },
      component: lazyLoading('gitlab', true)
    },      
    {
      name: 'Settings',
      path: '/settings',
      meta: {
        icon: 'fa-wrench',
        link: 'settings/index.vue'
      },
      component: lazyLoading('settings', true)
    }
    // charts,
    // uifeatures,
    // components,
    // tables
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
