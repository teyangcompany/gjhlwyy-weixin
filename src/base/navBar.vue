<template>
  <div class="nav-bar border-1px">
    <ul>
      <li v-for="tagName in tagNames">
        <router-link tag="div" :to="tagName.tabLink" replace>
          <span>{{ tagName.title1 }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      tagNames: {
        type: Array,
        default: []
      },
    },
  }
</script>
<style scoped lang="scss">
  @import '../common/public.scss';

  .nav-bar {
    width: 100%;
    height: 40px;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 10;
    background-color: white;
    ul {
      padding: 0;
      margin: 0;
      display: flex;
      li {
        flex: 1;
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: center;
        list-style-type: none;
        span {
          font-size: 32rem/$rem;
          color: #333333;
        }
        .router-link-active {
          height: 35px;
          line-height: 40px;
          text-align: center;
          border-bottom: 2px solid $mainColor;
          span {
            color: $mainColor;
          }
        }
      }
    }
  }
</style>
