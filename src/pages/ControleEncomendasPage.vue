<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de Encomendas"
      :rows="encomendas"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-btn label="Novo" icon="add" color="primary"
        to="/sindico/ControleEncomendas/create" replace/>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn
          flat
          round
          dense
          icon="edit"
          @click="goEditPage(props.row)"
          class="q-ml-sm"
        />
        <q-btn
          flat
          round
          dense
          icon="delete"
          @click="openModal(props.row)"
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
          <q-btn color="red" label="deletar" @click="userDelete()" />
          <q-btn color="primary" label="fechar" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
if (sessionStorage.type !== '98984512') {
  sessionStorage.clear();
  window.location.href = '/';
}

import { Notify } from 'quasar';
import { getOrders, deleteOrderById } from '../services/orderRequests';

let encomendasID;

const columns = [
  {
    name: 'identificacao',
    required: true,
    label: 'Identificação',
    align: 'left',
    field: (row) => row.identifier,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'destinatario',
    required: true,
    label: 'Destinatario',
    align: 'left',
    field: (row) => row.destinationApartment,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'coletor',
    required: true,
    label: 'Coletor',
    align: 'left',
    field: (row) => row.collector,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'recebedor',
    required: true,
    label: 'Recebedor',
    align: 'left',
    field: (row) => (row.residentReceiving === null ? 'A Definir' : row.residentReceiving),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'data_de_recebimento',
    required: true,
    label: 'Data Recebimento',
    align: 'left',
    field: (row) => row.dateReceiving,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'data_de_retirada',
    required: true,
    label: 'Data Retirada',
    align: 'left',
    field: (row) => (row.dateWithdrawn === null ? 'A retirar' : row.dateWithdrawn),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'left',
  },

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
      encomendas: [],
      showModal: false,
    };
  },
  methods: {
    openModal(row) {
      encomendasID = row.id;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    goEditPage(row) {
      encomendasID = row.id;
      this.$router.push(`/sindico/ControleEncomendas/edit/${encomendasID}`);
    },
    userDelete() {
      deleteOrderById(encomendasID)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          Notify.create({
            color: 'negative',
            message: `Um erro ocorreu: ${error.message}`,
            position: 'top',
          });
        });
    },
    async getData() {
      await getOrders()
        .then((response) => {
          this.encomendas = response?.data;
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
