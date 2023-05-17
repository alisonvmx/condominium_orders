<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de Apartamentos"
      :rows="rows"
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
          <div class="text-h6">Deletar Apartamento</div>

        </q-card-section>
        <q-card-section>
          <q-card-main>
            <div class="text-h6">Você tem certeza que irá deletar esse Apartamento</div>
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

const columns = [
  {
    name: 'identificacao',
    required: true,
    label: 'N° Apartamento',
    align: 'left',
    field: (row) => row.identificacao,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'inquilino',
    required: true,
    label: 'Inquilino',
    align: 'left',
    field: (row) => row.inquilino,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'left',
  },

];
const rows = [
  {
    identificacao: '101A',
    inquilino: 'cpf-inquilino',
  },
  {
    identificacao: '110b',
    inquilino: 'cpf-inquilino',
  },
  {
    identificacao: '115c',
    inquilino: 'cpf-inquilino',
  },
  {
    identificacao: '120A',
    inquilino: 'cpf-inquilino',
  },
];
export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
  data() {
    return {
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
  },
};
</script>
