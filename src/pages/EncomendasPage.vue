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
import axios from 'axios';
import { Notify } from 'quasar';

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
    name: 'Apartamento', field: 'destinatario', label: 'Apartamento', align: 'center',
  },
  {
    name: 'identificacao', field: 'identificacao', label: 'Identificação', align: 'center',
  },
  {
    name: 'recebedor', field: 'recebedor', label: 'Recebedor', align: 'center',
  },
  {
    name: 'data_de_recebimento', field: 'data_de_recebimento', label: 'Data de Recebimento', align: 'center',
  },
  {
    name: 'actions', field: 'actions', label: 'actions', align: 'center',
  },
];

export default {
  beforeMount() {
    this.chamarRotaBackend();
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
    async chamarRotaBackend() {
      await axios.get('http://localhost:3000/Encomendas')
        .then((response) => {
          const encomendasUsuario = response?.data;
          encomendasUsuario.forEach((encomendaUsuario) => {
            if (encomendaUsuario.data_de_retirada === '') {
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
      await axios.get('http://localhost:3000/apartamentos')
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
      const formattedDate = `${day}/${month}/${year}`;
      // eslint-disable-next-line no-shadow
      function obterInquilino(row) {
        let varInquilino;
        // eslint-disable-next-line no-console
        console.log(row.destinatario);
        apartamentos.forEach((apartamento) => {
          if (apartamento.numeracao_apartamento === row.destinatario) {
            varInquilino = apartamento.cpf_inquilino;
          }
        });
        return varInquilino;
      }
      // eslint-disable-next-line no-undef
      const inquilino = obterInquilino(row);
      // eslint-disable-next-line prefer-const
      formData = {
        id: row.id,
        identificacao: row.identificacao,
        destinatario: row.destinatario,
        coletor: inquilino,
        recebedor: row.recebedor,
        data_de_recebimento: row.data_de_recebimento,
        data_de_retirada: formattedDate,
      };

      axios.put(`http://localhost:3000/encomendas/${row.id}`, formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
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
