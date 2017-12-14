<template>
  <div class="swiper-container" ref="swiper">
    <ul class="flex">
      <li :class="[nav.name,'flex0']" v-for="nav in navs">

      </li>
    </ul>
  </div>
</template>

<script>
  import {docNav} from "../../lib/config";
  import {upper} from "../../lib/util";
  import BScroll from "better-scroll"

  export default {
    props: ['docInfo'],
    data() {
      return {
        navs: docNav,
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
            this.mySwiper = new BScroll(dom, {})
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

  ul {
    padding: px2rem(10px) px2rem(15px);
    overflow: hidden;
    li + li {
      margin-left: px2rem(10px);
    }
  }

  ul > li {
    width: px2rem(68px);
    height: px2rem(90px);
    @include backgroundImageSet(px2rem(68px), px2rem(90px));
    @each $nav in book, pic, video, famous, team {
      &.#{$nav} {
        background-image: url("../../../static/img/doc/#{$nav}.png");
      }
      &.no.#{$nav} {
        background-image: url("../../../static/img/doc/#{$nav}.no.png");
      }
    }
  }
</style>
