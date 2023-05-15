<template>
  <div class="setting">
    <v-header title="好友列表" :headerLeftStatus="headerLeftStatus" />
    <v-footer></v-footer>
  </div>

</template>

<script>
import header from '@/components/header/index'
import footer from '@/components/footer/index'
export default {
  data() {
    return {
      headerLeftStatus: true
    };
  },
  mounted() {
  },
  methods: {
    
  },
  components: {
    "v-header": header,
    "v-footer": footer,
  },
}
</script>

<style>

</style>

