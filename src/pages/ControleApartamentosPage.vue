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
import { Notify } from 'quasar';
import { deleteApartmentById, getApartments } from '../services/apartmentRequests';

let apartamentosID;

const columns = [
  {
    name: 'numeracao_apartamento',
    required: true,
    label: 'N° Apartamento',
    align: 'left',
    field: (row) => row.numApartment,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'cpf_inquilino',
    required: true,
    label: 'Inquilino',
    align: 'left',
    field: (row) => (row.tenant ? row.tenant : 'desocupado'),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'st_available',
    required: true,
    label: 'Disponibilidade',
    align: 'left',
    field: (row) => (row.stAvailable ? 'disponível' : 'indisponível'),
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
      deleteApartmentById(apartamentosID)
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
    async getData() {
      await getApartments()
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
