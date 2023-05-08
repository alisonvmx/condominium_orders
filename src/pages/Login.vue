<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-card-section class="login flex justify-center items-center"
  style="height: 100vh; background-color: #1976D2; flex-direction: column;">
    <q-section class="q-mb-lg"
    style="text-align: center; text-transform: uppercase; font-weight: bctiold;">
      <img src="/src/assets/🦆 icon _shopping cart_.svg">
      <p>cond orders</p>
    </q-section>
    <q-form class="flex justify-center items-center column">
      <q-input oulined color="black" v-model="text" label="Usuário" >
        <template v-slot:before>
          <q-avatar>
            <img src="/src/assets/user.svg">
          </q-avatar>
        </template>
      </q-input>
      <q-input oulined color="black" v-model="text" label="Chave de Acesso" type="password">
        <template v-slot:before>
          <q-avatar>
            <img src="/src/assets/house.svg">
          </q-avatar>
        </template>
      </q-input>
      <q-select class="q-mt-xl" v-model="model" :options="options"
      style="text-transform: uppercase; width: 130px; align-items: ;">
        <template v-slot:append>
          <q-avatar>
            <img src="/src/assets/user.svg">
          </q-avatar>
        </template>
      </q-select>
    </q-form>
  </q-card-section>
</template>

<script setup>
import { ref } from 'vue';

const options = ref(['inquilino', 'sindico', 'porteiro']);
const model = ref(options.value[0]);
</script>
