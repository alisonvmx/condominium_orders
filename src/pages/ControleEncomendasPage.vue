<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de Encomendas"
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
    name: 'dataRecebimento',
    required: true,
    label: 'Data Recebimento',
    align: 'left',
    field: (row) => row.dataRecebimento,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'dataRetirada',
    required: true,
    label: 'Data Retirada',
    align: 'left',
    field: (row) => row.dataRetirada,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'left',
  },

];
const rows = [
  {
    identificacao: 'caixa',
    destinatario: 'apartemento1',
    coletor: 'cpf-porteiro',
    recebedor: 'cpf-inquilino',
    dataRecebimento: '10/03/2022',
    dataRetirada: '20/03/2022',
  },
  {
    identificacao: 'roupa',
    destinatario: 'apartemento2',
    coletor: 'cpf-porteiro',
    recebedor: 'cpf-inquilino',
    dataRecebimento: '25/02/2022',
    dataRetirada: '01/03/2022',
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
