<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="name" label="Name" class="q-mb-md" :rules="[ val => val.length >= 2 || 'Digite um nome:' ]"/>
      <q-input v-model="cpf" mask="###.###.###-##" label="CPF" class="q-mb-md" :rules="[ val => val.length >= 11 || 'Digite um CPF válido:' ]"/>
      <q-select v-if="group == 'inquilino'" v-model="apartamento" :options="apartamentos" label="Apartamento" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Apartamento:' ]"/>
      <q-input v-else-if="group !== 'inquilino'" v-model="chave_privada" label="Chave Privada" class="q-mb-md" :rules="[ val => val.length >= 6 && val.length <= 12|| 'Digite um CPF válido:' ]"/>
      <q-select v-model="group" :options="groups" label="Grupo" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Perfil:' ]"/>

      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md"/>
    </q-form>
  </q-page>
</template>

<script>
import { VueMaskDirective } from 'vue-the-mask';
import axios from 'axios';
import { Notify } from 'quasar';

const options = ['inquilino', 'sindico', 'porteiro',
];
const aparts = [];

export default {
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.obterApartamentos();
  },
  data() {
    return {
      name: '',
      apartamento: '',
      apartamentos: [],
      chave_privada: '',
      group: options[0],
      cpf: '',
      groups: options,
    };
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
          apartamento: this.apartamento,
          type_user: this.group,

        };
      } else {
        formData = {
          id: generateRandomNumber(1, 5000),
          nome: this.name,
          cpf: this.cpf,
          chave_privada: this.chave_privada,
          type_user: this.group,
        };
      }
      axios.post('http://localhost:3000/usuarios', formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          this.atualizarApartamento(this.cpf, this.apartamento);
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
    async obterApartamentos() {
      await axios.get('http://localhost:3000/apartamentos')
        .then((response) => {
          const dadosApartamentos = response.data;
          dadosApartamentos.forEach((dado) => {
            // eslint-disable-next-line no-prototype-builtins
            if (dado.cpf_inquilino === 'Disponivel') {
              this.apartamentos.push(dado.numeracao_apartamento);
            }
            aparts.push(dado);
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
    async atualizarApartamento(cpf, apartamento) {
      let formData;
      function obterIdApartamento() {
        let varId;
        aparts.forEach((apart) => {
          if (apart.numeracao_apartamento === apartamento) {
            varId = apart.id;
          }
        });
        return varId;
      }
      const varIdApartamento = obterIdApartamento();
      // eslint-disable-next-line prefer-const
      formData = {
        id: varIdApartamento,
        numeracao_apartamento: apartamento,
        cpf_inquilino: cpf,
      };

      await axios.put(`http://localhost:3000/apartamentos/${varIdApartamento}`, formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
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
