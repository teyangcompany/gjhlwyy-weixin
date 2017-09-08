<template>
  <div id="slider" ref="slider">
    <div class="content" ref="content">
      <slot></slot>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
    import top from './app-header.vue'
    import BScroll from 'better-scroll'
    var dots = '';
    export default{
        components: {
            top
        },
      props:['indexes','flag'],
        data(){
            return {
              $slider:'',
              $content:''
            }

        },
      watch:{
        flag(){
          console.log('触发')
          setTimeout(()=>{
            this.$slider = this.$refs.slider;
            this.$content = this.$refs.content;
            this.init();
            this.runScroll();
          },20)
        }
      },
        mounted(){

        },
      methods:{
        init(){
          var sliderWidth = window.getComputedStyle(this.$slider).width;
          sliderWidth = parseInt(sliderWidth);
          var sliderItems = this.$content.children;
          var sliderLength = this.pages = sliderItems.length;
          var contentWidth = sliderLength * sliderWidth;
          this.$content.style.width = contentWidth + 'px';
          for (var i = 0; i < this.pages; i++) {
            sliderItems[i].style.width = sliderWidth + 'px';
          }
        },
        runScroll: function() {
          var that = this;
          this.slider = new BScroll(this.$slider, {
            scrollX: true,
            scrollY: false,
//            momentum: true,
            snap: true,
            click:true,
            snapThreshold: 0.5
          });
          if(this.indexes){
            that.slider.getCurrentPage().pageX=this.indexes;
            this.slider.refresh()
          }

        },

      }
    }

</script>
<style scoped lang='scss'>
  #slider {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
    max-width: 750px;
    min-height: 1px;
    height: 100%;
  }

  #slider .content {
    overflow: hidden;
    min-height: 1px;
    height: 100%;
  }

</style>
