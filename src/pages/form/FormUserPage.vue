<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-select v-model="group" :options="groups" label="Grupo" class="q-mb-md" />
      <q-input v-model="name" label="Name" class="q-mb-md" />
      <q-input v-model="variable" :label="inputlabel" class="q-mb-md" :rules="inputRules" :disable="disableCond"/>
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';
import axios from 'axios';

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
        { label: 'sindico', value: 'sindico' },
        { label: 'porteiro', value: 'porteiro' },
      ],
      inputRules: [
        (val) => {
          if (this.group.value === 'inquilino') {
            return (val.length >= 0 && val.length <= 4);
          }
          return (val.length >= 5 && val.length <= 10);
        },
      ],
    };
  },
  computed: {
    inputlabel() {
      // Define your condition to change the mask
      if (this.group.value === 'inquilino') {
        return 'Apartamento';
      }
      return 'Chave privada';
    },
    inputMask() {
      // Define your condition to change the mask
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
      function generateRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      if (this.group.value === 'inquilino') {
        formData = {
          id: generateRandomNumber(1, 5000),
          type_user: this.group.value,
          nome: this.name,
          apartamento: this.variable,
        };
      } else {
        formData = {
          id: generateRandomNumber(1, 5000),
          type_user: this.group.value,
          nome: this.name,
          chave_privada: Math.random(),
        };
      }
      axios.post('http://localhost:3000/usuarios', formData)
        .then((response) => {
          console.log(response);
          this.$router.push('/sindico/users');
        // Optionally, perform any necessary actions after successful form submission
        })
        .catch((error) => {
        // Handle any error that occurred during form submission
          console.error(error);
        // Optionally, show an error message to the user
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
