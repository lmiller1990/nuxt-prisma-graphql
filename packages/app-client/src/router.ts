import { createRouter as _createRouter, createWebHistory } from 'vue-router'
import Main from './components/Main.vue'
import LinksContainer from './components/LinksContainer.vue'
import GoLiveContainer from './components/GoLiveContainer.vue'

export function createRouter() {
  return _createRouter({
    routes: [
      {
        path: '/',
        component: Main,
        children: [
          {
            path: 'links',
            component: LinksContainer
          },
          {
            path: 'go-live',
            component: GoLiveContainer
          }
        ]
      }
    ],
    history: createWebHistory()
  })
}