export default {
  methods: {
    /**
     * 判断是否有身份证
     * @param compatIdcard
     * @returns {boolean}
     */
    hasIdCardBind(compatIdcard) {
      if (!compatIdcard) {
        this.$weuijs.confirm('证件号不能为空，是否去完善信息？', {
          title: "温馨提示",
          buttons: [
            {
              label: "再等等",
              type: "default",
              onClick: () => {
              }
            },
            {
              label: '立即完善',
              type: 'primary',
              onClick: () => {
                this.$router.replace({
                  path: '/account/perfect',
                  query: {back: this.$route.fullPath}
                })
              }
            }
          ]
        });
        return false;
      } else return true;
    }
  }
}
