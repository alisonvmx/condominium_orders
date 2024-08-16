<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="identificacao" label="Descrição" class="q-mb-md" :rules="[ val => val.length >= 3 || 'Digite uma descrição:' ]"/>
      <q-select v-model="apartamento" :options="apartamentos" label="Apartamento" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Apartamento:' ]"/>
      <q-select v-model="recebedor" :options="recebedores" label="Recebedor" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Recebedor:' ]"/>
      <q-btn type="submit" label="Submit" color="primary" mask="##/##/##" class="q-mb-md" />
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';
import { Notify } from 'quasar';
import { createOrder } from 'src/services/orderRequests';
import { getApartments } from 'src/services/apartmentRequests';
import { getUsers } from 'src/services/userRequests';

export default {
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.obterAdministradores();
    this.obterApartamentos();
  },
  data() {
    return {
      identificacao: '',
      apartamento: '',
      apartamentos: [],
      recebedor: '',
      recebedores: [],
      data_de_recebimento: '',
    };
  },

  methods: {
    async obterApartamentos() {
      await getApartments()
        .then((response) => {
          const dadosApartamentos = response.data;
          dadosApartamentos.forEach((dado) => {
            if (dado.tenant) {
              this.apartamentos.push(dado.numApartment);
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
    async obterAdministradores() {
      await getUsers()
        .then((response) => {
          const dadosUsuarios = response.data;
          dadosUsuarios.forEach((dado) => {
            if (dado.groupType === 'porteiro') {
              this.recebedores.push(dado.cpf);
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
    handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 3];
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      // eslint-disable-next-line prefer-const
      formData = {
        identifier: this.identificacao,
        destinationApartment: this.apartamento,
        collector: this.recebedor,
        dateWithdrawn: null,
        residentReceiving: null,
        dateReceiving: formattedDate,

      };

      createOrder(formData)
        .then(() => {
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
  },
};
</script>

<style>
  .q-form {
    padding: 25px 25px 25px 25px;
    margin: auto;
  }
</style>
