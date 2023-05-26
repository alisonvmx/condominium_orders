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
            icon="edit"
            style="width: 50%; border-radius: 0%; margin-top: 4%;"
            @click="retirarEncomenda(props.row)"
          />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from 'axios';
import { Notify } from 'quasar';

/**
  * Quando carregar a página, acessar via AXIOS a API e obter a lista de entregas
  * Após isso, atualizar os dados da variável "rows"
  */
// eslint-disable-next-line no-unused-vars
let encomendasID;
let apartamentoROW;
let coletorEncomenda;
let formData;

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
    openModal(row) {
      encomendasID = row.id;
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
    async ObterColetor(apartamentoROW) {
      await axios.get('http://localhost:3000/apartamentos')
        .then((response) => {
          response.data.forEach((user) => {
            if (user.numeracao_apartamento.include(apartamentoROW)) {
              coletorEncomenda = user.cpf_inquilino;
            }
          });
          return coletorEncomenda;
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
      encomendasID = row.id;
      apartamentoROW = row.destinatario;
      // eslint-disable-next-line no-console
      console.log(apartamentoROW);
      // eslint-disable-next-line no-undef
      formData = {
        // eslint-disable-next-line no-undef
        coletor: this.ObterColetor(apartamentoROW),
      };
      // eslint-disable-next-line no-console
      console.log(formData);
      axios.post(`http://localhost:3000/encomendas/${encomendasID}`, formData)
        .then((response) => {
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
  },

};
</script>
