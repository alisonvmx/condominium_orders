<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="apartamento.id" label="ID" class="q-mb-md" disable=""/>
      <q-input v-model="apartamento.numeracao_apartamento" label="N Apartamento" class="q-mb-md" :rules="[ val => val.length >= 3 && val.length <=4 || 'Digite um apartamento válido' ]"/>
      <q-select v-model="apartamento.inquilino" :options="apartamento.inquilinos" label="CPF Inquilino" class="q-mb-md"/>
      <q-select v-model="apartamento.available" :options="apartamento.availableOptions" label="Disponibilidade" class="q-mb-md"/>
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { Notify } from 'quasar';
import { getApartmentById, updateApartment } from 'src/services/apartmentRequests';
import { getUsers } from 'src/services/userRequests';
import { useRoute } from 'vue-router';

export default {
  identificacao: 'FormPage',
  beforeMount() {
    this.getData();
    this.obterInquilinos();
  },
  data() {
    return {
      apartamento: {
        id: '',
        numeracao_apartamento: '',
        inquilino: '',
        inquilinos: ['Desocupado'],
        available: null,
        availableOptions: ['Disponível', 'Indisponível'],
      },
    };
  },
  methods: {
    handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 4];
      const { id } = this.$route.params;

      // eslint-disable-next-line prefer-const
      formData = {
        id: this.id,
        numApartment: this.apartamento.numeracao_apartamento,
        tenant: this.apartamento.inquilino === 'Desocupado' ? null : this.apartamento.inquilino,
        stAvailable: this.apartamento.available === 'Disponível',
      };

      updateApartment(id, formData)
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
    async getData() {
      const route = useRoute();
      const { id } = route.params;

      await getApartmentById(id)
        .then((response) => {
          const { data } = response;
          this.apartamento.id = data.id;
          this.apartamento.numeracao_apartamento = data.numApartment;
          this.apartamento.available = data.stAvailable ? 'Disponível' : 'Indisponível';
          this.apartamento.inquilino = data.tenant || 'Desocupado';
        })
        .catch((error) => {
          Notify.create({
            color: 'negative',
            message: `Um erro ocorreu: ${error.message}`,
            position: 'top',
          });
        });
    },
    async obterInquilinos() {
      await getUsers()
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          response.data.forEach((dado) => {
            this.apartamento.inquilinos.push(dado.cpf);
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

<style>
  .q-form {
    padding: 25px 25px 25px 25px;
    margin: auto;
  }
</style>
