<template>
  <q-page class="q-pa-md">
    <q-table
       title="Encomendas"
       :rows="encomendas"
       :columns="columns"
       row-key="name"
     />
  </q-page>
</template>

<script>
import axios from 'axios';
/**
  * Quando carregar a página, acessar via AXIOS a API e obter a lista de entregas
  * Após isso, atualizar os dados da variável "rows"
  */

const columns = [
  { name: 'Apartamento', field: 'destinatario', label: 'Apartamento' },
  { name: 'identificacao', field: 'identificacao', label: 'Identificação' },
  { name: 'recebedor', field: 'recebedor', label: 'Recebedor' },
  { name: 'data_de_recebimento', field: 'data_de_recebimento', label: 'Data de Recebimento' },
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
      encomendas: [],
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
          const encomendasUsuario = response?.data;
          encomendasUsuario.forEach((encomendaUsuario) => {
            if (encomendaUsuario.data_de_retirada === '') {
              this.encomendas.push(encomendaUsuario);
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
