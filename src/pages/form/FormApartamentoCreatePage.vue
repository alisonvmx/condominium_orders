<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="numeracao_apartamento" label="N Apartamento" class="q-mb-md" :rules="[ val => val.length >= 3 && val.length <=4 || 'Digite um apartamento válido' ]"/>
      <q-select v-model="cpf" :options="cpfs" label="CPF Inquilino" class="q-mb-md" />
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';
import axios from 'axios';
import { Notify } from 'quasar';

export default {
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.obterInquilinos();
  },
  data() {
    return {
      numeracao_apartamento: '',
      cpf: 'Disponivel',
      cpfs: [],
    };
  },

  methods: {
    async obterInquilinos() {
      await axios.get('http://localhost:3000/usuarios/')
        .then((response) => {
          const dados = response.data;
          dados.forEach((dado) => {
            if (dado.type_user === 'inquilino') {
              this.cpfs.push(dado.cpf);
            }
          });

          // eslint-disable-next-line no-console
          console.log();
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

      function generateRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // eslint-disable-next-line prefer-const
      formData = {
        id: generateRandomNumber(1, 5000),
        numeracao_apartamento: this.numeracao_apartamento,
        cpf_inquilino: this.cpf,
      };

      axios.post('http://localhost:3000/apartamentos', formData)
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
  },
};
</script>

<style>
  .q-form {
    padding: 25px 25px 25px 25px;
    margin: auto;
  }
</style>
