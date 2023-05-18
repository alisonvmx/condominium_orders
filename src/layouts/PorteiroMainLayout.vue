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
    link: '/#/porteiro',
  },
  {
    title: 'Encomendas',
    icon: 'school',
    link: '/#/Encomendas',
  },
  {
    title: 'Historico',
    icon: 'code',
    link: '/#/Historico',
  },
  {
    title: 'Controle De Encomendas',
    icon: 'chat',
    link: '/#/ControleEncomendas',
  },
  {
    title: 'Controle De Usuários',
    icon: 'record_voice_over',
    link: '/#/users',
  },
  {
    title: 'Controle De Apartamentos',
    icon: 'rss_feed',
    link: '/#/ControleApartamentos',
  },
];

export default defineComponent({
  name: 'PorteiroMainLayout',

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
});
</script>
