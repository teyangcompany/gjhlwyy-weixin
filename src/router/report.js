export default [

  /**
   * @param query{index}
   */
  {
    path: '/report',
    component: () => import('../page/report/index')
  },
  {
    path: '/report/type',
    component: () => import('../page/report/type')
  }
]
