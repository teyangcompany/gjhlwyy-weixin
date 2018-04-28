export default [

  /**
   * @param query.index
   */
  {
    path: '/report',
    component: () => import('../page/report/index')
  },
  /**
   * @param query.index
   */
  {
    path: '/report/type',
    component: () => import('../page/report/type')
  },
  /**
   * @param query.index
   * @param query.compatId
   * @param query.patCard
   * @param cache.compatCache
   */
  {
    path: '/report/list',
    component: () => import('../page/report/list')
  },

  /**
   * 检查报告详情
   * @param cache.compatCache
   * @param cache.examinationCache
   */
  {
    path: '/report/detail/examination',
    component: () => import('../page/report/detail/examination')
  },
  /**
   * 检验报告详情
   * @param cache.compatCache
   * @param cache.inspectCache
   */
  {
    path: '/report/detail/inspect',
    component: () => import('../page/report/detail/inspect')
  },


  /**
   * @param cache.testCache
   */
  {
    path: '/report/detail/test',
    component: () => import('../page/report/detail/test')
  },
  /**
   * @param params.id
   * @param cache.testCache
   */
  {
    path: '/report/consult/:id',
    component: () => import('../page/report/consult')
  }


]
