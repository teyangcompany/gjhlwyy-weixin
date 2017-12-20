<template>
    <transition name="msg">
        <div class="msg-box" v-show="showTag">
            <span>{{text}}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            delay: {
                type: Number,
                default: 3000
            }
        },
        data() {
            return {
                timer: null,
                text: "",
                showTag: false
            };
        },
        computed: {},
        components: {},
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            show(text) {
                if (this.timer) {
                    return
                }
                this.text = text;
                this.showTag = true;
                this.timer = setTimeout(() => {
                    this.hide();
                }, this.delay)
            },
            hide() {
                clearTimeout(this.timer);
                this.timer = null;
                this.showTag = false;
            }
        }
    };
</script>

<style scoped lang="scss">
    .msg-enter, .msg-leave-to {
        transform: translateY(200%);
    }

    .msg-enter-active, .msg-leave-active {
        transition: all 0.2s;
    }

    .msg-box {
        position: fixed;
        bottom: 100px;
        left: 0px;
        right: 0px;
        text-align: center;
        span {
            font-size: 14px;
            display: inline-block;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border-radius: 10px;
            padding: 10px 20px;
        }
    }
</style>
