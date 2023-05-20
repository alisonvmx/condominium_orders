<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de Encomendas"
      :rows="usuarios"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right>
        <q-btn label="Novo" icon="add" color="primary" to="/users/create" replace/>
      </template>
      <template v-slot:body-cell-actions>
        <q-btn
          flat
          round
          dense
          icon="edit"
          @click="openModal"
          class="q-ml-sm"
        />
        <q-btn
          flat
          round
          dense
          icon="delete"
          @click="openModal"
          class="q-ml-sm"
        />
      </template>
    </q-table>
  </div>
  <div>
    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Deletar Encomenda</div>

        </q-card-section>
        <q-card-section>
          <q-card-main>
            <div class="text-h6">Você tem certeza que irá deletar essa Encomenda</div>
          </q-card-main>
        </q-card-section>
        <q-card-actions aligm="right">
          <q-btn color="red" label="Submit" @click="closeModal" />
          <q-btn color="primary" label="Close" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';

const columns = [
  {
    name: 'identificacao',
    required: true,
    label: 'Identificação',
    align: 'left',
    field: (row) => row.identificacao,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'destinatario',
    required: true,
    label: 'Destinatario',
    align: 'left',
    field: (row) => row.destinatario,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'coletor',
    required: true,
    label: 'Coletor',
    align: 'left',
    field: (row) => row.coletor,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'recebedor',
    required: true,
    label: 'Recebedor',
    align: 'left',
    field: (row) => row.recebedor,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'data_de_recebimento',
    required: true,
    label: 'Data Recebimento',
    align: 'left',
    field: (row) => row.data_de_recebimento,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'data_de_retirada',
    required: true,
    label: 'Data Retirada',
    align: 'left',
    field: (row) => row.data_de_retirada,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'left',
  },

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
      usuarios: [],
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
      await axios.get('http://localhost:3000/encomendas')
        .then((response) => {
          this.usuarios = response?.data;
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
