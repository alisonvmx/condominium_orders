<template>
  <q-page class="q-pa-md">
    <q-table class="flex" title="Histórico" :rows="historico" :columns="columns" row-key="name" />
  </q-page>
</template>

<script>
import { getOrders } from 'src/services/orderRequests';

const columns = [
  { name: 'codigo', field: 'id', label: 'Código' },
  { name: 'destinatario', field: 'destinationApartment', label: 'Apartamento' },
  { name: 'identificacao', field: 'identifier', label: 'Identificação' },
  { name: 'inquilino', field: 'residentReceiving', label: 'Coletor' },
  { name: 'data_de_retirada', field: 'dateWithdrawn', label: 'Data de Retirada' },
];

export default {
  beforeMount() {
    this.getData();
  },
  setup() {
    return {
      columns,
    };
  },
  data() {
    return {
      historico: [],
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async getData() {
      await getOrders()
        .then((response) => {
          const encomendasRetiradas = response?.data;
          encomendasRetiradas.forEach((encomendaRetirada) => {
            // eslint-disable-next-line no-console
            console.log(encomendaRetirada);
            if (encomendaRetirada.dateWithdrawn !== null) {
              this.historico.push(encomendaRetirada);
            }
          });
        })
        .catch((error) => {
          if (!error.response) {
          // network error
            this.errorStatus = 'Error: Network Error';
          } else {
          // eslint-disable-next-line no-console
            console.log(error.response.data.message);
          }
        });
    },
  },

};

</script>
