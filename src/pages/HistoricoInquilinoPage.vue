<template>
  <q-page class="q-pa-md">
    <q-table class="flex" title="Histórico" :rows="historico" :columns="columns" row-key="name" />
  </q-page>
</template>

<script>
if (sessionStorage.type !== '99154724') {
  sessionStorage.clear();
  window.location.href = '/';
}
import axios from 'axios';

const columns = [
  { name: 'codigo', field: 'id', label: 'Codigo' },
  { name: 'identificacao', field: 'identificacao', label: 'Identificação' },
  { name: 'inquilino', field: 'coletor', label: 'Inquilino' },
  { name: 'data_de_retirada', field: 'data_de_retirada', label: 'Data de Retirada' },
];

export default {
  beforeMount() {
    this.chamarRotaBackend();
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
    async chamarRotaBackend() {
      await axios.get('http://localhost:3000/Encomendas')
        .then((response) => {
          const encomendasRetiradas = response?.data;
          encomendasRetiradas.forEach((encomendaRetirada) => {
            if (encomendaRetirada.destinatario === localStorage.getItem('infoUsuario') && encomendaRetirada.data_de_retirada !== '') {
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
