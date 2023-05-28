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
        <q-btn label="Novo" icon="add" color="primary" to="/sindico/ControleUsuarios/create" replace/>
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
          <div class="text-h6">Deletar usuário</div>

        </q-card-section>
        <q-card-section>
          <q-card-main>
            <div class="text-h6">Você tem certeza que irá deletar esse usuário</div>
          </q-card-main>
        </q-card-section>
        <q-card-actions align="right">
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
    field: (row) => row.nome,
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
    let paginaAtual = window.location.href.toString();
    paginaAtual = paginaAtual.split('/');
    const ifPorteiro = paginaAtual.includes('porteiro');
    if (ifPorteiro) {
      this.chamarRotaPorteiro();
    } else {
      this.chamarRotaBackend();
    }
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
    goEditPage(row) {
      userID = row.id;
      console.log(userID);
      this.$router.push(`/sindico/ControleUsuarios/edit/${userID}`);
    },
    userDelete() {
      axios.delete(`http://localhost:3000/usuarios/${userID}`)
        .then((response) => {
          window.location.reload();
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
      await axios.get('http://localhost:3000/usuarios')
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
    async chamarRotaPorteiro() {
      await axios.get('http://localhost:3000/usuarios')
        .then((response) => {
          response.data.forEach((user) => {
            if (user.type_user === 'inquilino') {
              this.usuarios.push(user);
            }
          });
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
