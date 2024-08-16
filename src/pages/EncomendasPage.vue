<template>
  <div class="q-pa-md">
    <q-table
      title="Encomendas"
      :rows="encomendas"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <div style="display: flex; justify-content: center; align-items: center;">
          <q-btn
            flat
            round
            dense
            icon="forward_to_inbox"
            style="width: 50%; border-radius: 0%; margin-top: 4%;"
            @click="retirarEncomenda(props.row)"
          >
            <q-tooltip class="bg-blue">Retirar Encomenda</q-tooltip>
          </q-btn>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { Notify } from 'quasar';
import { getApartments } from 'src/services/apartmentRequests';
import { getOrders, updateOrder } from 'src/services/orderRequests';

const apartamentos = [];

/**
  * Quando carregar a página, acessar via AXIOS a API e obter a lista de entregas
  * Após isso, atualizar os dados da variável "rows"
  */
// eslint-disable-next-line no-unused-vars

const columns = [
  {
    name: 'id', field: 'id', label: 'Código', align: 'center',
  },
  {
    name: 'Apartamento', field: 'destinationApartment', label: 'Apartamento', align: 'center',
  },
  {
    name: 'identificacao', field: 'identifier', label: 'Identificação', align: 'center',
  },
  {
    name: 'recebedor', field: 'collector', label: 'Recebedor', align: 'center',
  },
  {
    name: 'data_de_recebimento', field: 'dateReceiving', label: 'Data de Recebimento', align: 'center',
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'center',
  },
];

export default {
  beforeMount() {
    this.getData();
    this.ObterApartamentos();
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
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async getData() {
      await getOrders()
        .then((response) => {
          const encomendasUsuario = response?.data;
          encomendasUsuario.forEach((encomendaUsuario) => {
            if (encomendaUsuario.dateWithdrawn === null) {
              this.encomendas.push(encomendaUsuario);
            }
          });
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
    // eslint-disable-next-line no-shadow
    async ObterApartamentos() {
      await getApartments()
        .then((response) => {
          const apartamentosUsuario = response?.data;
          apartamentosUsuario.forEach((apartamento) => {
            apartamentos.push(apartamento);
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
    retirarEncomenda(row) {
      let formData;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      // eslint-disable-next-line no-shadow
      function obterInquilino(row) {
        let varInquilino;
        // eslint-disable-next-line no-console
        apartamentos.forEach((apartamento) => {
          if (apartamento.numApartment === row.destinationApartment) {
            varInquilino = apartamento.tenant;
          }
        });
        return varInquilino;
      }
      // eslint-disable-next-line no-undef
      const inquilino = obterInquilino(row);
      // eslint-disable-next-line prefer-const
      formData = {
        id: row.id,
        identifier: row.identifier,
        destinationApartment: row.destinationApartment,
        residentReceiving: inquilino,
        collector: row.collector,
        dateReceiving: row.dateReceiving,
        dateWithdrawn: formattedDate,
      };

      updateOrder(row.id, formData)
        .then(() => {
          document.location.reload(true);
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
