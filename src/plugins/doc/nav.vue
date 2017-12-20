<template>
  <div class="swiper" ref="swiper">
    <ul class="flex">
      <li @click="handle(nav.name)" :class="[nav.name,'flex0',nav.open?'yes':'no']" v-for="nav in navs">
        {{nav.price|formatPrice}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {docNav} from "../../lib/config";
  import {debug, upper} from "../../lib/util";
  import BScroll from "better-scroll"
  import {formatPrice} from "../../lib/filter";

  export default {
    props: ['docInfo', 'teamInfo'],
    data() {
      return {
        navs: docNav,
        mySwiper: null,
      };
    },
    computed: {},
    filters: {formatPrice},
    components: {},
    created() {
      this.scroll = null
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
        this.refresh();
      },
    },
    methods: {
      handle(name) {
        this.$emit("click", name);
      },
      init() {
        setTimeout((res) => {
          let dom = this.$refs.swiper;
          if (dom) {
            let ul = dom.querySelector('ul');
            ul.style.width = `${4.16 * 5 - 0.53333}rem`
            setTimeout(() => {
              this.scroll = new BScroll(dom, {
                scrollY: false,
                scrollX: true,
                click: true
              })
            }, 20)
          } else {
            this.init();
          }
        }, 200)
      },
      refresh() {
        setTimeout(() => {
          debug("refresh", this.scroll);
          this.scroll && this.scroll.refresh();
        }, 200)

      },
      initNav() {
        let bookNav = this.navs[0];
        if (this.docInfo.docBookId) {
          bookNav.open = true;
        } else {
          bookNav.open = false;
        }

        let teamNav = this.navs[4];
        if (Object.keys(this.teamInfo).length > 0) {
          teamNav.open = true;
        } else {
          teamNav.open = false;
        }

        this.navs.splice(0, 1, bookNav);
        this.navs.splice(4, 1, teamNav);

        docNav.forEach((res, index) => {
            if (index > 0 && index < 4) {
              let price = this.docInfo[`doc${upper(res.name)}ConsultPrice`];
              if (price) {
                res.price = price;
              } else {
                res.price = 0
              }
            }
            if (index == 4) {
              let teamPrice = this.teamInfo.consultPrice;
              if (teamPrice) {
                res.price = price;
              }
              else {
                res.price = 0
              }
            }

            this.navs.splice(index, 1, res);
          }
        )
      }
    }
  }
  ;
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .swiper {
    margin: 0 px2rem(15px);
    padding: px2rem(10px) 0;
    width: px2rem(375px - 30px);
    height: px2rem(110px);
    touch-action: none;
  }

  ul {
    touch-action: none;
    li + li {
      margin-left: px2rem(10px);
    }
  }

  ul > li {
    padding-top: px2rem(65px);
    text-align: center;
    color: #999999;
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
