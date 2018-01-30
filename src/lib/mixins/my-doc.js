import {debug} from "../util";

export default {
  data() {
    return {
      height: 0
    }
  },
  mounted() {
    this.myDocInit();
  },
  methods: {
    myDocInit() {
      let pageDom = document.querySelector('.my-doc');
      if (!pageDom) {
        setTimeout(this.init, 20)
      } else {
        let navDom = pageDom.querySelector('.nav'),
          navHeight = 0;
        navDom && (navHeight = navDom.getBoundingClientRect().height);
        if (!navHeight) {
          setTimeout(this.init, 20);
        } else {
          this.height = window.innerHeight - 45 - navHeight;
        }
      }
    }
  }
}
