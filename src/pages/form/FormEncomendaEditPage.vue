<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="encomenda.id" label="ID" class="q-mb-md" disable=""/>
      <q-input v-model="encomenda.identificacao" label="Descrição" class="q-mb-md" />
      <q-input v-model="encomenda.destinatario" label="Apartamento" class="q-mb-md" />
      <q-input v-model="encomenda.coletor" label="Coletor" class="q-mb-md" />
      <q-input v-model="encomenda.recebedor" label="Recebedor" class="q-mb-md" />
      <q-input v-model="encomenda.data_de_recebimento" label="Data de Recebimento" class="q-mb-md" />
      <q-input v-model="encomenda.data_de_retirada" label="Data de Retirada" class="q-mb-md" />
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
  identificacao: 'FormPage',
  directives: { mask: VueMaskDirective },
  beforeMount() {
    this.chamarRotaBackend();
  },
  data() {
    return {
      encomenda: {
        id: '',
        identificacao: '',
        destinatario: '',
        coletor: '',
        recebedor: '',
        data_de_recebimento: '',
        data_de_retirada: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      let formData;
      const url = window.location.href;
      const parts = url.split('/');
      const specificWord = parts[parts.length - 4];
      const { id } = this.$route.params;

      // eslint-disable-next-line prefer-const
      formData = {
        id: this.id,
        identificacao: this.encomenda.identificacao,
        destinatario: this.encomenda.destinatario,
        coletor: this.encomenda.coletor,
        recebedor: this.encomenda.recebedor,
        data_de_recebimento: this.encomenda.data_de_recebimento,
        data_de_retirada: this.encomenda.data_de_retirada,
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
