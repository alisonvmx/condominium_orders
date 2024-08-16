<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="numeracao_apartamento" label="N Apartamento" class="q-mb-md" :rules="[ val => val.length >= 3 && val.length <=4 || 'Digite um apartamento válido' ]"/>
      <q-select v-model="tenant" :options="tenants" label="CPF Inquilino" class="q-mb-md" />
      <q-select v-model="available" :options="availableOptions" label="Disponibilidade" class="q-mb-md" />
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { Notify } from 'quasar';
import { getUsers } from 'src/services/userRequests';
import { createApartment } from 'src/services/apartmentRequests';

export default {
  name: 'FormPage',
  beforeMount() {
    this.obterInquilinos();
  },
  data() {
    return {
      numeracao_apartamento: '',
      tenant: 'Desocupado',
      tenants: ['Desocupado'],
      available: 'Disponível',
      availableOptions: ['Disponível', 'Indisponível'],
    };
  },

  methods: {
    async obterInquilinos() {
      await getUsers()
        .then((response) => {
          const dados = response.data;
          dados.forEach((dado) => {
            this.tenants.push(dado.cpf);
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
    async handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 3];

      // eslint-disable-next-line prefer-const
      formData = {
        numApartment: this.numeracao_apartamento,
        tenant: this.tenant === 'Desocupado' ? null : this.tenant,
        stAvailable: this.available === 'Disponível',
      };

      createApartment(formData)
        .then(() => {
          this.$router.push(`/${specificWord}/ControleApartamentos`);
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
