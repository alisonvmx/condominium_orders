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
import axios from 'axios';
import { Notify } from 'quasar';

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
      await axios.get('http://localhost:3000/apartamentos')
        .then((response) => {
          const dadosApartamentos = response.data;
          dadosApartamentos.forEach((dado) => {
            // eslint-disable-next-line no-prototype-builtins
            if (dado.hasOwnProperty('cpf_inquilino')) {
              this.apartamentos.push(dado.numeracao_apartamento);
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
      await axios.get('http://localhost:3000/usuarios')
        .then((response) => {
          const dadosUsuarios = response.data;
          dadosUsuarios.forEach((dado) => {
            if (dado.type_user !== 'inquilino') {
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

      const formattedDate = `${day}/${month}/${year}`;

      function generateRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // eslint-disable-next-line prefer-const
      formData = {
        id: generateRandomNumber(1, 5000),
        identificacao: this.identificacao,
        destinatario: this.apartamento,
        recebedor: this.recebedor,
        data_de_recebimento: formattedDate,
        coletor: '',
        data_de_retirada: '',

      };

      axios.post('http://localhost:3000/Encomendas', formData)
        .then((response) => {
          console.log(response);
          console.log(`/${specificWord}/ControleEncomendas`);
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
