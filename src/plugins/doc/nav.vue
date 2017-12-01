<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div @click="handlePath(item.name)" class="swiper-slide" v-for="item in nav">
        <div class="icon" :class="[item.name,item.open?'yes':'no']"></div>
        <div class="text" :class="[item.open?'yes':'no']">
          {{item.value}}<br>
          <span v-if="item.price">￥{{item.price}}</span>
        </div>
      </div><!--
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>-->
    </div>
    <!--<div class="swiper-pagination"></div>-->
  </div>
</template>

<script>
  import {docNav} from "../../lib/config";
  import {debug, upper} from "../../lib/util";

  export default {
    props: ['docInfo'],
    data() {
      return {
        nav: docNav,
        mySwiper: null,
      };
    },
    computed: {},
    components: {},
    created() {
      this.initNav();
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {

    },
    watch: {
      docInfo() {
        this.initNav();
      },
    },
    methods: {
      handlePath(name) {
        this.$emit("click", name);
      },
      init() {
        setTimeout((res) => {
          let dom = this.$refs.swiper;
          if (dom) {
            this.mySwiper = new Swiper(dom, {
              slidesPerView: 4,
              slidesPerGroup: 4,
              pagination: {
                el: ".swiper-pagination",
                bulletActiveClass: "bullet-active"
              }
            })
          } else {
            this.init();
          }
        }, 200)
      },
      initNav() {
        let navObj = this.nav[0];
        if (this.docInfo.docBookId) {
          navObj.open = true;
        } else {
          navObj.open = false;
        }
        this.nav.splice(0, 1, navObj);
        docNav.forEach((res, index) => {
          if (index > 0) {
            let price = this.docInfo[`doc${upper(res.name)}ConsultPrice`];
            if (price) {
              res.price = price;
            } else {
              res.price = "0.0"
            }
            this.nav.splice(index, 1, res);
          }
        })
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .swiper-slide {
    height: 110px;
    .icon {
      height: 60px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 40%;
    }
    .text {
      line-height: 1.3;
      color: $mainColor;
      text-align: center;
      font-size: 14px;
      &.no {
        color: #999999;
      }
    }
    @each $nav in book, pic, video, famous, team {
      .icon.#{$nav} {
        background-image: url("../../../static/img/index/#{$nav}.png");
      }
      .icon.no.#{$nav} {
        background-image: url("../../../static/img/index/#{$nav}.no.png");
      }
    }
  }


</style>
