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
      { path: '/sindico/ControleUsuarios/create', component: () => import('src/pages/form/FormUserCreatePage.vue') },
      { path: '/sindico/ControleUsuarios/edit/:id', component: () => import('src/pages/form/FormUserEditPage.vue') },
      { path: '/sindico/ControleEncomendas', component: () => import('pages/ControleEncomendasPage.vue') },
      { path: '/sindico/ControleEncomendas/create', component: () => import('src/pages/form/FormEncomendaCreatePage.vue') },
      { path: '/sindico/ControleEncomendas/edit/:id', component: () => import('src/pages/form/FormEncomendaEditPage.vue') },
      { path: '/sindico/ControleApartamentos', component: () => import('pages/ControleApartamentosPage.vue') },
      { path: '/sindico/ControleApartamentos/create', component: () => import('src/pages/form/FormApartamentoCreatePage.vue') },
      { path: '/sindico/ControleApartamentos/edit/:id', component: () => import('src/pages/form/FormApartamentoEditPage.vue') },
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
      { path: '/porteiro/ControleUsuarios/create', component: () => import('src/pages/form/FormUserCreatePage.vue') },
      { path: '/porteiro/ControleUsuarios/edit/:id', component: () => import('src/pages/form/FormUserEditPage.vue') },
      { path: '/porteiro/ControleEncomendas', component: () => import('pages/ControleEncomendasPage.vue') },
      { path: '/porteiro/ControleEncomendas/create', component: () => import('src/pages/form/FormEncomendaCreatePage.vue') },
      { path: '/porteiro/ControleEncomendas/edit/:id', component: () => import('src/pages/form/FormEncomendaEditPage.vue') },
      { path: '/porteiro/ControleApartamentos', component: () => import('pages/ControleApartamentosPage.vue') },
      { path: '/porteiro/ControleApartamentos/create', component: () => import('src/pages/form/FormApartamentoCreatePage.vue') },
      { path: '/porteiro/ControleApartamentos/edit/:id', component: () => import('src/pages/form/FormApartamentoEditPage.vue') },
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
