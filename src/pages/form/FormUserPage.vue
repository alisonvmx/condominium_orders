<template>
  <q-page>
    <q-form @submit="handleSubmit" class="q-gutter-md q-mt-lg">
      <q-input v-model="name" label="Name" class="q-mb-md" />
      <q-input v-model="email" label="Email" class="q-mb-md" />
      <q-input v-model="password" label="Password" type="password" class="q-mb-md" />
      <q-select v-model="gender" :options="genders" label="Gender" class="q-mb-md" />
      <q-btn type="submit" label="Submit" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'FormPage',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      gender: '',
      genders: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
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
