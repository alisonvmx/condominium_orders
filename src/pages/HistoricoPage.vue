<template>
  <q-page class="q-pa-md">
      <q-table class="flex" title="Histórico" :rows="rows" :columns="columns" row-key="name" />
  </q-page>
</template>

<script setup>
const columns = [
  { name: 'codigo', field: 'codigo', label: 'Codigo' },
  { name: 'identificacao', field: 'identificacao', label: 'Identificação' },
  { name: 'inquilino', field: 'inquilino', label: 'Inquilino' },
  { name: 'data_de_retirada', field: 'data_de_retirada', label: 'Data de Retirada' },
];
const rows = [
  {
    codigo: '1',
    identificacao: 'Kabum',
    inquilino: 'Pedro',
    data_de_retirada: '23/03/2023',
  },
  {
    codigo: '2',
    identificacao: 'Mercado Livre',
    inquilino: 'Pedro',
    data_de_retirada: '23/03/2023',
  },
];
</script>
