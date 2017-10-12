import {openidCache} from "./cache"

export const isLoginMixin = {
    data() {
        return {
            path: ""
        }
    },
    created() {
        this.path = this.$route.path
        console.log(this.path)
        let openid = openidCache.get();
        // if (!openid) {
        //
        //   this.$router.push({
        //     path:"/bindRelativePhone",
        //     query:{backPath:this.path}
        //   })
        // }
    },
    watch: {
        "$route": function () {
            this.path = this.$route.path

            // this.$router.push("/profile")

        }
    }
}


/**
 * 不用滚动组件，中间滚动区域的计算
 * @type {{mounted: (function())}}
 */
export const mainHeightMixin = {
    mounted() {
        this._calcMainHeight();
    },
    methods: {
        _calcMainHeight() {
            let h = 0;
            if (this.$refs.footer) {
                h += 60;
            }
            if (this.$refs.header) {
                h += 45;
            }
            if (this.$refs.main) {
                this.$refs.main.style.height = `${window.innerHeight - h}px`;
            }
        }
    }
}

export const scrollHeightMixin = {
    data() {
        return {
            scrollHeight: 0
        }
    },
    created() {
        this._calcScrollHeight();
    },
    methods: {
        _calcScrollHeight() {
            let h = window.innerHeight - 45;
            console.log(this.bottomHeight);
            if (this.bottomHeight) {
                h = h - this.bottomHeight;
            }
            this.scrollHeight = h;
        }
    }
}