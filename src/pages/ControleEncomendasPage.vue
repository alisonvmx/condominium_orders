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
import axios from 'axios';
import { Notify } from 'quasar';

let encomendasID;

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
      axios.delete(`http://localhost:3000/encomendas/${encomendasID}`)
        .then((response) => {
          window.location.reload();
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          Notify.create({
            color: 'negative',
            message: `Um erro ocorreu: ${error.message}`,
            position: 'top',
          });
        });
    },
    async chamarRotaBackend() {
      await axios.get('http://localhost:3000/encomendas')
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
