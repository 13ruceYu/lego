import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import EditorPage from '../views/EditorPage.vue'
import TemplateDetailPage from '../views/TemplateDetailPage.vue'
import IndexPage from '../views/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      children: [
        { path: '', name: 'home', component: HomePage },
        {
          path: 'template/:id',
          name: 'template',
          component: TemplateDetailPage,
        },
      ],
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorPage,
    },
  ],
})

export default router
