import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/ListPage.vue'),
      },
      {
        path: 'product-add',
        name: 'product-add',
        component: () => import('pages/AddProductPage.vue'),
      },
      {
        path: 'product-edit/:id',
        name: 'product-edit',
        component: () => import('pages/AddProductPage.vue'),
      },
      {
        path: 'product-variants/:id',
        name: 'product-variants',
        component: () => import('pages/ListProductVariantsPage.vue'),
      },
      {
        path: 'product-variant-add/:product_id',
        name: 'product-variant-add',
        component: () => import('pages/AddProductVariantPage.vue'),
      },
      {
        path: 'product-variant-edit/:product_id/:variant_id',
        name: 'product-variant-edit',
        component: () => import('pages/AddProductVariantPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
