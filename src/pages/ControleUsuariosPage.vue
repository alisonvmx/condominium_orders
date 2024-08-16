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
        <q-btn label="Novo" icon="add" color="primary" to="controleUsuarios/create" replace/>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn
          flat
          round
          dense
          icon="edit"
          @click="redirectEditPage(props.row)"
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
            <div class="text-h6">Você tem certeza que irá deletar esse usuário</div>
          </q-card-main>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="red" label="deletar" @click="deleteUser(userID)" />
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
import { getUsers, deleteUserById } from '../services/userRequests';

let userID;

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
    name: 'apartamento',
    required: true,
    label: 'Apartamento',
    align: 'left',
    field: (row) => row.apartamento,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'cpf',
    required: true,
    label: 'CPF',
    align: 'left',
    field: (row) => row.cpf,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'type_user',
    required: true,
    label: 'Grupo',
    align: 'left',
    field: (row) => row.groupType,
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
      usuarios: [],
      showModal: false,
      selectedValue: Number,
    };
  },
  methods: {
    openModal(row) {
      userID = row.id;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    redirectEditPage(row) {
      // eslint-disable-next-line no-console
      console.log(row.id);
      this.$router.push(`/sindico/ControleUsuarios/edit/${row.id}`);
    },
    deleteUser() {
      deleteUserById(userID)
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
      await getUsers()
        .then((response) => {
          this.usuarios = response?.data;
        })
        .catch((error) => {
          Notify.create({
            color: 'negative',
            message: `Um erro ocorreu: ${error.message}`,
            position: 'top',
          });
        });
    },
  },
};
</script>
