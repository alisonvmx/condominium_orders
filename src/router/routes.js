const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/sindico',
    component: () => import('layouts/SindicoMainLayout.vue'),
    children: [
      { path: '/sindico', component: () => import('pages/HomePage.vue') },
      { path: '/sindico/Encomendas', component: () => import('pages/EncomendasPage.vue') },
      { path: '/sindico/Historico', component: () => import('pages/HistoricoPage.vue') },
      { path: '/sindico/ControleUsuarios', component: () => import('pages/ControleUsuariosPage.vue') },
      { path: '/sindico/ControleUsuarios/create', component: () => import('pages/form/FormUserPage.vue') },
      { path: '/sindico/ControleEncomendas', component: () => import('pages/ControleEncomendasPage.vue') },
      { path: '/sindico/ControleApartamentos', component: () => import('pages/ControleApartamentosPage.vue') },
    ],
  },
  {
    path: '/inquilino',
    component: () => import('layouts/InquilinoMainLayout.vue'),
    children: [
      { path: '/inquilino', component: () => import('pages/HomePage.vue') },
      { path: '/inquilino/Encomendas', component: () => import('pages/EncomendasInquilinoPage.vue') },
      { path: '/inquilino/Historico', component: () => import('pages/HistoricoInquilinoPage.vue') },
    ],
  },
  {
    path: '/porteiro',
    component: () => import('layouts/PorteiroMainLayout.vue'),
    children: [
      { path: '/porteiro', component: () => import('pages/HomePage.vue') },
      { path: '/porteiro/Encomendas', component: () => import('pages/EncomendasPage.vue') },
      { path: '/porteiro/Historico', component: () => import('pages/HistoricoPage.vue') },
      { path: '/porteiro/ControleUsuarios', component: () => import('pages/ControleUsuariosPage.vue') },
      { path: '/porteiro/ControleUsuarios/create', component: () => import('pages/form/FormUserPage.vue') },
      { path: '/porteiro/ControleEncomendas', component: () => import('pages/ControleEncomendasPage.vue') },
      { path: '/porteiro/ControleApartamentos', component: () => import('pages/ControleApartamentosPage.vue') },
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
