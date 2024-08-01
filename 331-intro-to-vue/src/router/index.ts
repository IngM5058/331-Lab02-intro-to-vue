import { createRouter, createWebHistory } from 'vue-router'
import PassengerDetailView from '@/views/event/PassengerDetailView.vue'
import PassengerAirlineView from '@/views/event/PassengerAirlineView.vue'
import PassengerLayoutView from '@/views/event/PassengerLayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import PassengerListView from '@/views/PassengerListView.vue'
import PassengerEditView from '@/views/event/PassengerEditView.vue'
import nProgress from 'nprogress'
import { usePassengerStore } from '@/stores/passenger'
import PassengerService from '@/services/PassengerService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-list-view',
      component: PassengerListView,
      props: route => ({
        page: parseInt(route.query.page as string || '1', 10),
        limit: 3
      })
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout',
      component: PassengerLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
          const passengerStore = usePassengerStore()
          return PassengerService.getPassengerById(Number(id))
          .then((response)=> {
            passengerStore.setPassenger(response.data)
          }).catch(error => {
              console.log(error)
              if (error.response && error.response.status === 404) {
                  router.push({ name: '404-resource', params: { resource: 'passenger' } })
              } else {
                  router.push({ name: 'network-error' })
              }
          })
      },
      children: [
        {
          path: '',
          name: 'passenger-detail',
          component: PassengerDetailView,
          props: true,
        },
        {
          path: 'airline',
          name: 'passenger-airline',
          component: PassengerAirlineView,
          props: true,
        },
        {
          path: 'edit',
          name: 'passenger-edit',
          component: PassengerEditView,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else { 
      return { top: 0 }
     }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
