<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable max-len -->
<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de usuários"
      :rows="usuarios"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-btn label="Novo" icon="add" color="primary" to="/sindico/users/create" replace/>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn
          flat
          round
          dense
          icon="edit"
          to="/sindico/users/create"
          replace
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
          <div class="text-h6">Deletar usuário</div>

        </q-card-section>
        <q-card-section>
          <q-card-main>
            <div class="text-h6">Você tem certeza que irá deletar esse usuário de id {{selectedValue}}</div>
          </q-card-main>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="red" label="deletar" @click="(props.row)" />
          <q-btn color="primary" label="fechar" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import axios from 'axios';

const columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'left',
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
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
      selectedValue: Number,
    };
  },
  methods: {
    openModal(value) {
      console.log(value.id);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    userDelete(id = this.selectedValue) {
      axios.delete(`http://localhost:3000/usuarios/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (!error.response) {
            // network error
            this.errorStatus = 'Error: Network Error';
          } else {
            console.log(error.response.data.message);
          }
        });
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
            console.log(error.response.data.message);
          }
        });
    },
  },
};
</script>
