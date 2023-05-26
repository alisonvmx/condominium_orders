<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="name" label="Name" class="q-mb-md" :rules="[ val => val.length >= 2 || 'Digite um nome:' ]" />
      <q-input v-model="cpf" label="CPF" class="q-mb-md" :rules="[ val => val.length >= 11 || 'Digite um CPF válido:' ]" />
      <q-input v-model="variable" :label="inputlabel" class="q-mb-md" :rules="inputRules" :disable="disableCond"/>
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
  data() {
    return {
      name: '',
      variable: '',
      group: '',
      groups: [
        { label: 'inquilino', value: 'inquilino' },
      ],
      inputRules: [
        (val) => {
          if (this.group.value === 'inquilino') {
            return (val.length >= 2 && val.length <= 4);
          }
          return (val.length >= 6 && val.length <= 10);
        },
      ],
    };
  },
  computed: {
    inputlabel() {
      if (this.group.value === 'inquilino') {
        return 'Apartamento';
      }
      return 'Chave privada';
    },
    inputMask() {
      if (this.group.value === 'inquilino') {
        return 'Apartamento';
      }
      return 'Chave privada';
    },
    disableCond() {
      return this.group.value !== 'inquilino';
    },
  },

  methods: {
    handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 3];

      function generateRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      if (this.group.value === 'inquilino') {
        formData = {
          id: generateRandomNumber(1, 5000),
          nome: this.name,
          cpf: this.cpf,
          apartamento: this.variable,
          type_user: this.group.value,

        };
      } else {
        formData = {
          id: generateRandomNumber(1, 5000),
          nome: this.name,
          cpf: this.cpf,
          chave_privada: Math.random(),
          type_user: this.group.value,
        };
      }
      axios.post('http://localhost:3000/usuarios', formData)
        .then((response) => {
          console.log(response);
          console.log(`/${specificWord}/ControleUsuarios`);
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
  },
};
</script>

<style>
  .q-form {
    padding: 25px 25px 25px 25px;
    margin: auto;
  }
</style>
