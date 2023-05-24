<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="apartamento.id" label="ID" class="q-mb-md" disable=""/>
      <q-input v-model="apartamento.numeracao_apartamento" label="N Apartamento" class="q-mb-md" :rules="[ val => val.length >= 3 && val.length <=4 || 'Digite um apartamento válido' ]"/>
      <q-select v-model="apartamento.inquilino" :options="apartamento.inquilinos" label="CPF Inquilino" class="q-mb-md"  mask="###.###.###-##"/>
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';
import axios from 'axios';
import { Notify } from 'quasar';
import { useRoute } from 'vue-router';

export default {
  identificacao: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.chamarRotaBackend();
    this.obterInquilinos();
  },
  data() {
    return {
      apartamento: {
        id: '',
        numeracao_apartamento: '',
        inquilino: 'Selecione o cpf do inquilino:',
        inquilinos: [],
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
        numeracao_apartamento: this.apartamento.numeracao_apartamento,
        cpf_inquilino: this.apartamento.inquilino,
      };

      axios.put(`http://localhost:3000/apartamentos/${id}`, formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
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
    async chamarRotaBackend() {
      const route = useRoute();
      const { id } = route.params;

      await axios.get(`http://localhost:3000/apartamentos/${id}`)
        .then((response) => {
          this.apartamento.id = response.data.id;
          this.apartamento.numeracao_apartamento = response.data.numeracao_apartamento;
          this.apartamento.inquilino = response.data.cpf_inquilino;
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
      await axios.get('http://localhost:3000/usuarios/')
        .then((response) => {
          const dados = response.data;
          dados.forEach((dado) => {
            if (dado.type_user === 'inquilino') {
              this.apartamento.inquilinos.push(dado.cpf);
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
  },
};
</script>

<style>
  .q-form {
    padding: 25px 25px 25px 25px;
    margin: auto;
  }
</style>
