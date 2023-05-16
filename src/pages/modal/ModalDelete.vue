<template>
    <div>
    <q-modal v-model="open" ref="layoutModal" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
        <q-modal-layout>
            <q-toolbar slot="header" color="green-7">
                <div class="q-toolbar-title">
                    Header
                </div>
            </q-toolbar>

            <q-toolbar slot="footer" color="green-7">
                <div class="q-toolbar-title">
                    Footer
                </div>
                    <q-btn color="green-10"  label="Save">Save</q-btn>
                    <q-btn color="red-9" @click="open = false" label="Close">Cancel</q-btn>
    </q-toolbar>
        </q-modal-layout>
    </q-modal>
    </div>
</template>

<script>

import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QModal,
  QModalLayout,

} from 'quasar-framework';

export default {
  name: 'app',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QModal,
    QModalLayout,

  },
  data() {
    return {
      layoutStore: {
        view: 'lHh Lpr lFf',
        reveal: false,
        leftScroll: true,
        rightScroll: true,
        leftBreakpoint: 996,
        rightBreakpoint: 1200,
        hideTabs: false,
      },
    };
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="stylus">

</style>
