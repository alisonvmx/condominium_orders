<template>
  <q-page class="q-pa-md">
    <q-table
       title="Encomendas"
       :rows="rows"
       :columns="columns"
       row-key="name"
     />
  </q-page>
</template>

<script setup>
const eu = 123;
/**
  * Quando carregar a página, acessar via AXIOS a API e obter a lista de entregas
  * Após isso, atualizar os dados da variável "rows"
  */

const columns = [
  { name: 'Apartamento', field: 'apartamento', label: 'Apartamento' },
  { name: 'identificacao', field: 'identificacao', label: 'Identificação' },
  { name: 'recebedor', field: 'recebedor', label: 'Recebedor' },
  { name: 'data_de_recebimento', field: 'data_de_recebimento', label: 'Data de Recebimento' },
];

const rows = [
  {
    apartamento: eu,
    identificacao: 'produto Kabum',
    recebedor: 'janclaudio',
    data_de_recebimento: '10/01/2023',
  },
  {
    apartamento: '105B',
    identificacao: 'Produto Shopiee',
    recebedor: 'Marcos José',
    data_de_recebimento: '09/01/2023',
  },
];

</script>
