<template>
  <div class="page">
    <app-header title="我的咨询">
      <i slot="back" class="back"></i>
    </app-header>
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {CONSULT_STATUS} from "../../lib/config";

  export default {
    data() {
      return {
        statusArr: CONSULT_STATUS,
        showStatus: [0, 2, 4]
      };
    },
    computed: {},
    components: {AppHeader},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">

</style>
