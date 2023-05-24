<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="user.name" label="Name" class="q-mb-md" :rules="[ val => val.length >= 3 || 'Digite um nome:' ]"/>
      <q-input v-model="user.cpf" label="CPF" class="q-mb-md" mask="###.###.###-##" :rules="[ val => val.length >= 11 || 'Digite um CPF válido:' ]"/>
      <q-input v-model="user.variable" :label="inputlabel" class="q-mb-md" :rules="inputRules"/>
      <q-select v-model="user.group" :options="user.groups" label="Grupo" class="q-mb-md" />
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
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.chamarRotaBackend();
  },
  data() {
    return {
      user: {
        name: '',
        cpf: '',
        variable: '',
        group: [],
        groups: [
          { label: 'inquilino', value: 'inquilino' },
          { label: 'sindico', value: 'sindico' },
          { label: 'porteiro', value: 'porteiro' },
        ],
      },

      inputRules: [
        (val) => {
          if (this.user.group.value === 'inquilino') {
            return (val.length >= 2 && val.length < 5);
          }
          return (val.length >= 6 && val.length <= 10);
        },
      ],
    };
  },
  computed: {
    inputlabel() {
      if (this.user.group.value === 'inquilino') {
        return 'Apartamento';
      }
      return 'Chave privada';
    },
    inputMask() {
      if (this.user.group.value === 'inquilino') {
        return 'Apartamento';
      }
      return 'Chave privada';
    },
  },

  methods: {
    handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 4];
      const { id } = this.$route.params;

      function generateRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      if (this.user.group.value === 'inquilino') {
        formData = {
          id: generateRandomNumber(1, 5000),
          nome: this.user.name,
          cpf: this.user.cpf,
          apartamento: this.user.variable,
          type_user: this.user.group.value,

        };
      } else {
        formData = {
          id: generateRandomNumber(1, 5000),
          nome: this.user.name,
          cpf: this.user.cpf,
          chave_privada: this.user.variable,
          type_user: this.user.group.value,
        };
      }

      axios.put(`http://localhost:3000/usuarios/${id}`, formData)
        .then((response) => {
          console.log(response);
          this.$router.push(`/${specificWord}/ControleUsuarios`);
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

      await axios.get(`http://localhost:3000/usuarios/${id}`)
        .then((response) => {
          this.user.group = { label: response.data.type_user, value: response.data.type_user };
          this.user.name = response.data.nome;
          this.user.cpf = response.data.cpf;
          if (response.data.type_user === 'inquilino') {
            this.user.variable = response.data.apartamento;
          } else {
            this.user.variable = response.data.chave_privada;
          }
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
