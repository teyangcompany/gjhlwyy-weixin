export default [
  {path: '/doc/article/list', component: () => import('../page/doc/article-list')},
  {path: '/doc/article/:id', component: () => import('../page/doc/article')}
]
