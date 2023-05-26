<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-card-section class="login flex justify-center items-center"
  style="height: 100vh; background-color: #1976D2; flex-direction: column;">

    <q-section class="q-mb-lg"
    style="text-align: center; text-transform: uppercase; font-weight: bold; color: white;">
      <img src="/src/assets/cart.svg">
      <p>cond orders</p>
    </q-section>

    <q-form class="flex justify-center items-center column" @submit.prevent="login">
      <q-input class="q-mb-xs" rounded outlined bg-color="white" color="black"
      v-model="user.cpf" label="Usuário" mask="###.###.###-##" required>
        <template #prepend>
          <q-avatar>
            <img src="/src/assets/user.svg">
          </q-avatar>
        </template>
      </q-input>
      <q-input rounded outlined bg-color="white" color="black" v-model="user.password"
      label="Chave de Acesso" type="password" maxlength="12" required>
        <template #prepend>
          <q-avatar>
            <img src="/src/assets/house.svg">
          </q-avatar>
        </template>
      </q-input>
      <p class="q-mt-lg q-mb-none" style="color: white; text-transform: uppercase;
        font-weight: bold;">
          Perfil de usuário
       </p>
      <q-section class="flex justify-center items-center row">
        <q-select rounded outlined  v-model="user.perfil" :options="options"
        style="text-transform: uppercase; width: 152px;"
        bg-color="white">
          <template v-slot:append>
            <q-avatar>
              <img src="/src/assets/user.svg">
            </q-avatar>
          </template>
        </q-select>
        <q-btn round style="background-color: white; margin-left: 10px;"
        type="submit" onclick="">
          <q-avatar size = "42px">
            <img src = "/src/assets/logar.jpg">
          </q-avatar>
        </q-btn >
      </q-section>
    </q-form>
  </q-card-section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

sessionStorage.clear();

const router = useRouter();
const options = ref(['inquilino', 'sindico', 'porteiro']);

const $q = useQuasar();

// function alert() {
//   $q.dialog({
//     message: 'Usuario e/ou chave de acesso invalida!',
//   });
// }

function triggerNegative() {
  $q.notify({
    type: 'negative',
    message: 'Usuario e/ou Chave inválida!',
  });
}

const user = reactive({
  cpf: '',
  password: '',
  perfil: options.value[0],
});
async function getUser() {
  try {
    const tipoUsuario = user.perfil;
    if (tipoUsuario === 'inquilino') {
      const response = await axios.get('http://localhost:3000/usuarios');
      const usuarios = response.data;
      usuarios.forEach((usuario) => {
        if (usuario.cpf === user.cpf && usuario.apartamento === user.password && usuario.type_user === 'inquilino') {
          router.replace('/inquilino');
          localStorage.setItem('infoUsuario', usuario.apartamento);
          sessionStorage.setItem('type', '99154724');
          sessionStorage.setItem('pag', 'logado');
        }
      });
      if (sessionStorage.pag !== 'logado') {
        triggerNegative();
      }
    }
    if (tipoUsuario === 'porteiro') {
      const response = await axios.get('http://localhost:3000/usuarios');
      const usuarios = response.data;

      usuarios.forEach((usuario) => {
        if (usuario.cpf === user.cpf && usuario.chave_privada === user.password && usuario.type_user === 'porteiro') {
          router.replace('/porteiro');
          sessionStorage.setItem('type', '291196291196');
          sessionStorage.setItem('pag', 'logado');
        }
      });
      if (sessionStorage.pag !== 'logado') {
        triggerNegative();
      }
    }
    if (tipoUsuario === 'sindico') {
      const response = await axios.get('http://localhost:3000/usuarios');
      const usuarios = response.data;

      usuarios.forEach((usuario) => {
        if (usuario.cpf === user.cpf && usuario.chave_privada === user.password && usuario.type_user === 'sindico') {
          router.replace('/sindico');
          sessionStorage.setItem('type', '98984512');
          sessionStorage.setItem('pag', 'logado');
        }
      });
      if (sessionStorage.pag !== 'logado') {
        triggerNegative();
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
async function login() {
  try {
    getUser();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('erro ao conectar com a api');
  }
}
</script>
