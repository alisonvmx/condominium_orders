<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="encomenda.id" label="ID" class="q-mb-md" readonly=""/>
      <q-input v-model="encomenda.identificacao" label="Descrição" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Perfil:' ]"/>
      <q-select v-model="encomenda.destinatario" :options="encomenda.destinatarios" label="Apartamento" mask="###.###.###-##" class="q-mb-md"/>
      <q-select v-model="encomenda.coletor" :options="encomenda.coletores" label="Coletores" mask="###.###.###-##" class="q-mb-md"/>
      <q-select v-model="encomenda.recebedor" :options="encomenda.recebedores" label="Recebedor" mask="###.###.###-##" class="q-mb-md"/>
      <q-input v-model="encomenda.data_de_recebimento" label="Data de Recebimento" mask="##/##/##" class="q-mb-md" :rules="[ val => val.length >= 8 || 'Digite uma data válida:' ]"/>
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
    this.obterAdministradores();
    this.obterApartamentos();
    this.chamarRotaBackend();
  },
  data() {
    return {
      encomenda: {
        id: '',
        identificacao: '',
        destinatario: '',
        destinatarios: [],
        coletor: '',
        coletores: [],
        recebedor: '',
        recebedores: [],
        data_de_recebimento: '',
        data_de_retirada: '',
      },
    };
  },
  methods: {
    async obterApartamentos() {
      await axios.get('http://localhost:3000/apartamentos')
        .then((response) => {
          const dadosApartamentos = response.data;
          dadosApartamentos.forEach((dado) => {
            this.encomenda.destinatarios.push(dado.numeracao_apartamento);
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
              this.encomenda.recebedores.push(dado.cpf);
            } else {
              this.encomenda.coletores.push(dado.cpf);
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
      const specificWord = parts[parts.length - 4];
      const { id } = this.$route.params;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${day}/${month}/${year}`;

      // eslint-disable-next-line prefer-const
      formData = {
        id: this.id,
        identificacao: this.encomenda.identificacao,
        destinatario: this.encomenda.destinatario,
        coletor: this.encomenda.coletor,
        recebedor: this.encomenda.recebedor,
        data_de_recebimento: this.encomenda.data_de_recebimento,
        data_de_retirada: formattedDate,
      };

      axios.put(`http://localhost:3000/encomendas/${id}`, formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
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

    async chamarRotaBackend() {
      const route = useRoute();
      const { id } = route.params;

      await axios.get(`http://localhost:3000/encomendas/${id}`)
        .then((response) => {
          this.encomenda.id = response.data.id;
          this.encomenda.identificacao = response.data.identificacao;
          this.encomenda.destinatario = response.data.destinatario;
          this.encomenda.coletor = response.data.coletor;
          this.encomenda.recebedor = response.data.recebedor;
          this.encomenda.data_de_recebimento = response.data.data_de_recebimento;
          this.encomenda.data_de_retirada = response.data.data_de_retirada;
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
