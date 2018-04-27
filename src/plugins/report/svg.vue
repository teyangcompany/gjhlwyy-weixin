<template>
    <div class="svg flex" :style="style">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" :style="style">
            <line x1="150" y1="0" x2="150" y2="300" stroke="#000" stroke-width="1" stroke-dasharray="90 10"></line>
            <line x1="0" y1="150" x2="300" y2="150" stroke="#000" stroke-width="1" stroke-dasharray="40 10"></line>
            <text x="25" y="110" fill="rgb(0,0,0)" style="font-size: 100" v-if="arr[0]">{{arr[0]}}</text>
            <text x="175" y="110" fill="rgb(0,0,0)" style="font-size: 100" v-if="arr[1]">{{arr[1]}}</text>
            <text x="25" y="260" fill="rgb(0,0,0)" style="font-size: 100" v-if="arr[2]">{{arr[2]}}</text>
            <text x="175" y="260" fill="rgb(0,0,0)" style="font-size: 100" v-if="arr[3]">{{arr[3]}}</text>
        </svg>
        <p class="center">{{text}}</p>
    </div>
</template>

<script>
  export default {
    props: {
      data: String
    },
    data() {
      return {
        text: "",
        arr: [],
        style: {
          width: `80px`,
          height: `80px`
        }
      };
    },
    computed: {},
    components: {},
    created() {
      this.init();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      init() {
        if (this.data) {
          this.text = this.data.match(/[\u4e00-\u9fa5]+/g).join('');
          this.arr = this.data.split('|').map(res => parseInt(res) ? parseInt(res) : 0);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    .svg {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            width: 100%;
        }
    }
</style>
