<template>
    <div class="team-info">
        <h3 class="center">{{info.teamName}}</h3>
        <div class="flex score" v-if="info.teamScoure">
            <star class="flex0" :size="36" :score="info.teamScoure"></star>
            <div class="flex0 text">{{info.teamScoure}}分</div>
            <div class="flex0 text">查看</div>
        </div>
        <div class="center score-no" v-else>
            暂无评分
        </div>
    </div>
</template>

<script>
  import Star from '../../base/star/star'

  export default {
    props: ['info'],
    data() {
      return {};
    },
    computed: {},
    components: {Star},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
    @import "../../common/public";

    .team-info {
        background-color: white;
        padding-bottom: px2rem(15px);
        h3 {
            font-size: px2rem(18px);
            padding: px2rem(15px);
        }
        .score-no {
            font-size: px2rem(15px);
            color: #777777;
        }
        .score {
            justify-content: center;
            .text {
                margin-left: px2rem(10px);
                font-size: px2rem(15px);
                color: $mainColor;
            }
        }

    }
</style>
