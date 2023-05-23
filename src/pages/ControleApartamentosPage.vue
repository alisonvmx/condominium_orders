<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de Apartamentos"
      :rows="apartamentos"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-btn label="Novo" icon="add" color="primary"
        to="/sindico/ControleApartamentos/create" replace/>
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
          <div class="text-h6">Deletar Apartamento</div>

        </q-card-section>
        <q-card-section>
          <q-card-main>
            <div class="text-h6">Você tem certeza que irá deletar esse Apartamento</div>
          </q-card-main>
        </q-card-section>
        <q-card-actions aligm="right">
          <q-btn color="red" label="Deletar" @click="userDelete()" />
          <q-btn color="primary" label="Fechar" @click="closeModal" />
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

let apartamentosID;

const columns = [
  {
    name: 'numeracao_apartamento',
    required: true,
    label: 'N° Apartamento',
    align: 'left',
    field: (row) => row.numeracao_apartamento,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'cpf_inquilino',
    required: true,
    label: 'Inquilino',
    align: 'left',
    field: (row) => row.cpf_inquilino,
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
      apartamentos: [],
      showModal: false,
    };
  },
  methods: {
    openModal(row) {
      apartamentosID = row.id;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    goEditPage(row) {
      apartamentosID = row.id;
      this.$router.push(`/sindico/ControleApartamentos/edit/${apartamentosID}`);
    },
    userDelete() {
      axios.delete(`http://localhost:3000/apartamentos/${apartamentosID}`)
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
      await axios.get('http://localhost:3000/apartamentos')
        .then((response) => {
          this.apartamentos = response?.data;
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
