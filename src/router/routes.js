const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('layouts/SindicoMainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/Encomendas', component: () => import('pages/EncomendasPage.vue') },
      { path: '/Historico', component: () => import('pages/HistoricoPage.vue') },
      { path: '/users', component: () => import('pages/userPage.vue') },
      { path: '/users/create', component: () => import('pages/form/FormUserPage.vue') },
      { path: '/ControleEncomendas', component: () => import('pages/ControleEncomendasPage.vue') },
      { path: '/ControleApartamentos', component: () => import('pages/ControleApartamentosPage.vue') },
    ],
  },
  {
    path: '/Inquilino',
    component: () => import('layouts/InquilinoMainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/Encomendas', component: () => import('pages/EncomendasPage.vue') },
      { path: '/Historico', component: () => import('pages/HistoricoPage.vue') },
    ],
  },
  {
    path: '/Porteiro',
    component: () => import('layouts/PorteiroMainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/Encomendas', component: () => import('pages/EncomendasPage.vue') },
      { path: '/Historico', component: () => import('pages/HistoricoPage.vue') },
      { path: '/users', component: () => import('pages/userPage.vue') },
      { path: '/users/create', component: () => import('pages/form/FormUserPage.vue') },
      { path: '/ControleEncomendas', component: () => import('pages/ControleEncomendasPage.vue') },
      { path: '/ControleApartamentos', component: () => import('pages/ControleApartamentosPage.vue') },
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
