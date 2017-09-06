<template>
  <div id="metalBox">
    <transition name="vanish">
      <div class="background" @click="activate" v-show="isShown" >
      </div>
    </transition>
    <transition name="fade">
      <div class="options" v-show="isShown" id="options">
        <slot name="contain"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props:{
      show:{
        type:Boolean,
        default:false,
        required:true
      }
    },
    computed: {
      isShown(){
        return this.show;
      }
    },
    components: {},
    mounted() {
    },
    beforeDestroy() {

    },
    methods: {
      activate(){

        this.$emit("activate");
      }
    }
  };
</script>

<style scoped lang="scss">

  .background{
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background:black;
    z-index:1000;
    opacity:0.6
  }
  .options{
    z-index:1001;
    background:white;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    /*height:15rem;*/
    display:flex;
    flex-direction:column;
  }

  .fade-enter-active,.fade-leave-active{
    transition: all .5s ease;
  }
  .fade-enter,.fade-leave-to{
    transform:translateY(100%);
  }
  .vanish-enter-active,.vanish-leave-active{
    transition:opacity .5s ease;
  }
  .vanish-enter, .vanish-leave-to{
    opacity:0;
  }
</style>
