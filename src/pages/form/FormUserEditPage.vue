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

const aparts = [];
let apartamentoAtual;
let apartamentoNovo;
export default {
  name: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.chamarRotaBackend();
    this.obterApartamentos();
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
          apartamentoNovo = this.user.variable;
          this.atualizarApartamento(response.data.cpf, response.data.apartamento);
          if (apartamentoAtual !== apartamentoNovo) {
            this.disponibilizarApartamento(apartamentoAtual);
          }
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
            apartamentoAtual = response.data.apartamento;
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
    async obterApartamentos() {
      await axios.get('http://localhost:3000/apartamentos')
        .then((response) => {
          const dadosApartamentos = response.data;
          dadosApartamentos.forEach((dado) => {
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
        numeracao_apartamento: this.user.variable,
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
    // eslint-disable-next-line no-shadow
    async disponibilizarApartamento(apartamentoAtual) {
      let formData;
      const apartAtual = apartamentoAtual;
      function obterIdApartamento() {
        let varId;
        aparts.forEach((apart) => {
          if (apart.numeracao_apartamento === apartAtual) {
            varId = apart.id;
          }
        });
        return varId;
      }
      const varIdApartamento = obterIdApartamento();
      // eslint-disable-next-line prefer-const
      formData = {
        id: varIdApartamento,
        numeracao_apartamento: apartAtual,
        cpf_inquilino: 'Disponivel',
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
