<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="name" label="Name" class="q-mb-md" />
      <q-input v-model="surname" label="Sobrenome" class="q-mb-md" />
      <q-select v-model="group" :options="groups" label="Grupo" class="q-mb-md" />
      <q-input
        v-model="phone"
        label="Telefone"
        placeholder="(00) 0000-0000"
        mask="(##) # ####-####"
        class="q-mb-md"
      />
      <q-input v-model="email" label="E-mail" placeholder="example@email.com" class="q-mb-md" />
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';

export default {
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      group: '',
      groups: [
        { label: 'inquilino', value: 'inquilino' },
        { label: 'sindico', value: 'sindico' },
        { label: 'porteiro', value: 'porteiro' },
      ],
    };
  },

  methods: {
    handleSubmit() {
      // Handle form submission here
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
