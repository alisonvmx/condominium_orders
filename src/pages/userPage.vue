<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de usuários"
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
          <div class="text-h6">Deletar usuário</div>

        </q-card-section>
        <q-card-section>
          <q-card-main>
            <div class="text-h6">Você tem certeza que irá deletar esse usuário</div>
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

export const deleteItem = async (phoneNumberString) => {
  // eslint-disable-next-line no-console
  await console.log(phoneNumberString);
};
export const editItem = async (phoneNumberString) => {
  // eslint-disable-next-line no-console
  await console.log(phoneNumberString);
};

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (row) => row.nome,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'type_user',
    required: true,
    label: 'Grupo',
    align: 'left',
    field: (row) => row.type_user,
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
      await axios.get('http://localhost:3000/usuarios')
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
