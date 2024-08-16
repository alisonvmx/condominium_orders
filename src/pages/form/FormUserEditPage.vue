<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="user.name" label="Name" class="q-mb-md" :rules="[ val => val.length >= 3 || 'Digite um nome:' ]"/>
      <q-input v-model="user.cpf" label="CPF" class="q-mb-md" mask="###.###.###-##" :rules="[ val => val.length >= 11 || 'Digite um CPF válido:' ]"/>
      <q-input v-model="user.password" label="Chave Privada" class="q-mb-md" maxlength="8" :rules="[ val => val.length >= 8 || 'Digite uma senha válido:' ]"/>
      <q-select v-model="user.apartment" :options="user.apartments" label="Grupo" class="q-mb-md" />
      <q-select v-model="user.group" :options="user.groups" label="Grupo" class="q-mb-md" />
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { Notify } from 'quasar';
import { useRoute } from 'vue-router';
import { getUserById, updateUser } from 'src/services/userRequests';
import { getApartments } from 'src/services/apartmentRequests';

export default {
  name: 'FormPage',
  beforeMount() {
    this.getData();
  },
  data() {
    return {
      user: {
        name: '',
        cpf: '',
        password: '',
        group: [],
        groups: [
          { label: 'inquilino', value: 'inquilino' },
          { label: 'sindico', value: 'sindico' },
          { label: 'porteiro', value: 'porteiro' },
        ],
        apartment: '',
        apartments: [],
      },
    };
  },

  methods: {
    handleSubmit() {
      const formData = {
        name: this.user.name,
        cpf: this.user.cpf,
        key: this.user.password,
        apartment: this.user.apartment,
        groupType: this.user.group.value,
      };

      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 4];
      const { id } = this.$route.params;

      updateUser(id, formData)
        .then(() => {
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
    async getData() {
      const route = useRoute();
      const { id } = route.params;

      await getUserById(id)
        .then((response) => {
          this.user.group = { label: response.data.groupType, value: response.data.groupType };
          this.user.name = response.data.name;
          this.user.cpf = response.data.cpf;
          this.user.apartment = response.data.apartment;
          this.user.password = response.data.key;
        })
        .catch((error) => {
          Notify.create({
            color: 'negative',
            message: `Um erro ocorreu: ${error.message}`,
            position: 'top',
          });
        });

      await getApartments()
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          response.data.forEach((apart) => {
            this.user.apartments.push(apart.numApartment);
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
