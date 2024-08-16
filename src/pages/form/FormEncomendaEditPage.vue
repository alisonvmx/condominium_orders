<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="encomenda.id" label="ID" class="q-mb-md" readonly=""/>
      <q-input v-model="encomenda.identificacao" label="Descrição" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Perfil:' ]"/>
      <q-select v-model="encomenda.destinatario" :options="encomenda.destinatarios" label="Apartamento" mask="###.###.###-##" class="q-mb-md"/>
      <q-select v-model="encomenda.recebedor" :options="encomenda.recebedores" label="Recebedor" mask="###.###.###-##" class="q-mb-md"/>
      <q-input v-model="encomenda.data_de_recebimento" label="Data de Recebimento" mask="####-##-##" class="q-mb-md" :rules="[ val => val.length >= 10 || 'Digite uma data válida:' ]"/>
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';
import { Notify } from 'quasar';
import { useRoute } from 'vue-router';
import { getUsers } from 'src/services/userRequests';
import { getOrderById, updateOrder } from '../../services/orderRequests';
import { getApartments } from '../../services/apartmentRequests';

export default {
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.getApartmentsValid();
    this.getReceivings();
    this.getData();
  },
  data() {
    return {
      encomenda: {
        id: '',
        identificacao: '',
        destinatario: '',
        destinatarios: [],
        recebedor: '',
        recebedores: [],
        data_de_recebimento: '',
      },
    };
  },
  methods: {
    async getApartmentsValid() {
      await getApartments()
        .then((response) => {
          const dadosApartamentos = response.data;
          dadosApartamentos.forEach((dado) => {
            if (dado.tenant !== null) {
              this.encomenda.destinatarios.push(dado.numApartment);
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
    async getReceivings() {
      await getUsers()
        .then((response) => {
          const dadosUsers = response.data;
          dadosUsers.forEach((dado) => {
            if (dado.groupType === 'porteiro') {
              this.encomenda.recebedores.push(dado.cpf);
            }
          });
        });
    },
    handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 4];
      const { id } = this.$route.params;

      // eslint-disable-next-line prefer-const
      formData = {
        identifier: this.encomenda.identificacao,
        destinationApartment: this.encomenda.destinatario,
        residentReceiving: null,
        collector: this.encomenda.recebedor,
        dateReceiving: this.encomenda.data_de_recebimento,
        dateWhithdrawn: null,
      };

      updateOrder(id, formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          this.$router.push(`/${specificWord}/ControleEncomendas`);
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
      const route = useRoute();
      const { id } = route.params;

      await getOrderById(id)
        .then((response) => {
          this.encomenda.id = response.data.id;
          this.encomenda.identificacao = response.data.identifier;
          this.encomenda.destinatario = response.data.destinationApartment;
          this.encomenda.recebedor = response.data.collector;
          this.encomenda.data_de_recebimento = response.data.dateReceiving;
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

<style>
  .q-form {
    padding: 25px 25px 25px 25px;
    margin: auto;
  }
</style>
