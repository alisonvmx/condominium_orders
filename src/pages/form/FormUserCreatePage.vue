<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="name" label="Name" class="q-mb-md" :rules="[ val => val.length >= 2 || 'Digite um nome:' ]"/>
      <q-input v-model="cpf" mask="###.###.###-##" label="CPF" class="q-mb-md" :rules="[ val => val.length >= 11 || 'Digite um CPF válido:' ]"/>
      <q-select v-model="apartamento" :options="apartamentos" label="Apartamento" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Apartamento:' ]"/>
      <q-input v-model="chave_privada" label="Chave Privada" class="q-mb-md" maxlength="8" :rules="[ val => val.length == 8 || 'Digite uma Senha válida:' ]"/>
      <q-select v-model="group" :options="groups" label="Grupo" class="q-mb-md" :rules="[ val => val != '' || 'Selecione um Perfil:' ]"/>
      <q-btn type="submit" label="Submit" color="primary" class="q-mt-md"/>
    </q-form>
  </q-page>
</template>

<script>
import axios from 'axios';
import { Notify } from 'quasar';
import { createUser } from '../../services/userRequests';
import { getApartments } from '../../services/apartmentRequests';

const options = ['inquilino', 'sindico', 'porteiro',
];
const aparts = [];

export default {
  name: 'FormPage',
  beforeMount() {
    this.obterApartamentos();
  },
  data() {
    return {
      name: '',
      apartamento: '',
      apartamentos: [],
      chave_privada: '',
      group: '',
      cpf: '',
      groups: options,
    };
  },

  methods: {

    handleSubmit() {
      const formData = {
        name: this.name,
        cpf: this.cpf,
        key: this.chave_privada,
        groupType: this.group,
        apartment: this.apartamento,
      };

      createUser(formData)
        .then(() => {
          // Atualiza o apartamento e, após a atualização, redireciona para controleUsuarios
          this.atualizarApartamento(this.cpf, this.apartamento)
            .then(() => {
              // Redireciona para a rota controleUsuarios
              this.$router.push('/sindico/controleUsuarios');
            })
            .catch((error) => {
              Notify.create({
                color: 'negative',
                message: `Erro ao atualizar apartamento: ${error.message}`,
                position: 'top',
              });
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

    async obterApartamentos() {
      await getApartments()
        .then((response) => {
          response.data.forEach((dado) => {
            // eslint-disable-next-line no-prototype-builtins
            if (dado.stAvailable === true && dado.tenant === null) {
              this.apartamentos.push(dado.numApartment);
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
        // eslint-disable-next-line no-console
        console.log('aparts', aparts);
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
