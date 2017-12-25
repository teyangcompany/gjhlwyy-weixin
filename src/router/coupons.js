export default [
  {
    path: '/coupons/my',
    component: () => import("../page/coupons/my")
  },
  {
    path: '/coupons/history',
    component: () => import("../page/coupons/history")
  },
  {
    path: '/coupons/recommended',
    component: () => import("../page/coupons/recommended")
  },
  {
    path: '/coupons/recommended',
    component: () => import("../page/coupons/register")
  },
  {
    path: '/coupons/share',
    component: () => import("../page/coupons/share")
  }
]
