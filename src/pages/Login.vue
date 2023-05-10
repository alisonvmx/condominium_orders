<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-card-section class="login flex justify-center items-center"
  style="height: 100vh; background-color: #1976D2; flex-direction: column;">

    <q-section class="q-mb-lg"
    style="text-align: center; text-transform: uppercase; font-weight: bold; color: white;">
      <img src="/src/assets/🦆 icon _shopping cart_.svg">
      <p>cond orders</p>
    </q-section>

    <q-form class="flex justify-center items-center column">
      <q-input class="q-mb-xs" rounded outlined bg-color="white" color="black"
      v-model="text" label="Usuário" >
        <template #prepend>
          <q-avatar>
            <img src="/src/assets/user.svg">
          </q-avatar>
        </template>
      </q-input>
      <q-input rounded outlined bg-color="white" color="black" v-model="password"
      label="Chave de Acesso" type="password">
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
        <q-select rounded outlined  v-model="select" :options="options"
        style="text-transform: uppercase; width: 152px;"
        bg-color="white">
          <template v-slot:append>
            <q-avatar>
              <img src="/src/assets/user.svg">
            </q-avatar>
          </template>
        </q-select>
        <q-btn round style="background-color: white; margin-left: 10px;" type="submit">
          <q-avatar size = "42px">
            <img src = "/src/assets/logar.jpg">
          </q-avatar>
        </q-btn >
      </q-section>
    </q-form>
  </q-card-section>
</template>

<script setup>
import { ref } from 'vue';

const options = ref(['inquilino', 'sindico', 'porteiro']);
const select = ref(options.value[0]);
const text = ref();
const password = ref();

</script>
