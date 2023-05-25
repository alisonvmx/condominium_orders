<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Cond°Orders
        </q-toolbar-title>
        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="logoutClick">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
      </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Serviços
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/sindico',
  },
  {
    title: 'Encomendas',
    icon: 'card_giftcard',
    link: '/sindico/Encomendas',
  },
  {
    title: 'Historico',
    icon: 'history',
    link: '/sindico/Historico',
  },
  {
    title: 'Controle De Encomendas',
    icon: 'shuffle',
    link: '/sindico/ControleEncomendas',
  },
  {
    title: 'Controle De Usuários',
    icon: 'supervisor_account',
    link: '/sindico/ControleUsuarios',
  },
  {
    title: 'Controle De Apartamentos',
    icon: 'room_preferences',
    link: '/sindico/ControleApartamentos',
  },
];

export default defineComponent({
  name: 'SindicoMainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    logoutClick() {
      sessionStorage.clear();
      window.location.href = '/';
    },
  },
});
</script>
