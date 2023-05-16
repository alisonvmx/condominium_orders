<template>
  <div class="q-pa-md">
    <q-table
      title="Controle de usuários"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right>
        <q-btn label="Novo" icon="add" color="primary" to="/users/create" replace/>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn
          flat
          round
          dense
          icon="edit"
          @click="editItem(props.row)"
          class="q-ml-sm"
        />
        <q-btn
          flat
          round
          dense
          icon="delete"
          @click="deleteItem(props.row)"
          class="q-ml-sm"
        />
      </template>
    </q-table>
  </div>
</template>

<script>

function formatPhoneNumber(phoneNumberString) {
  const cleaned = (`${phoneNumberString}`).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
}

export const deleteItem = async (phoneNumberString) => {
  await console.log(phoneNumberString);
};
export const editItem = async (phoneNumberString) => {
  await console.log(phoneNumberString);
};

const columns = [
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
    name: 'surname',
    required: true,
    label: 'Sobrenome',
    align: 'left',
    field: (row) => row.surname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'group',
    required: true,
    label: 'Grupo',
    align: 'left',
    field: (row) => row.group,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'phone',
    required: true,
    label: 'Telefone',
    align: 'left',
    field: (row) => row.phone,
    format: (val) => formatPhoneNumber(val),
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'left',
  },

];
const rows = [
  {
    name: 'pessoa',
    surname: 'teste',
    group: 'morador',
    phone: 71991784816,
    email: 'john.doe@example.com',
  },
  {
    name: 'pessoa',
    surname: 'teste2',
    group: 'morador',
    phone: '(71) 9 9178-4816',
    email: 'john.doe@example.com',

  },
  {
    name: 'pessoa',
    surname: 'teste3',
    group: 'morador',
    phone: '(71) 9 9178-4816',
    email: 'john.doe@example.com',

  },
];
export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
