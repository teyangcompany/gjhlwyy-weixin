/**
 * args Object
 * [{key:function(){}}]
 */
export class validate {
  constructor(...args) {
    this.funs = [];
    this.validateFun = validateFun;
    if (args) {
      args.forEach((funObj) => {
        this.validateFun = Object.assign({}, this.validateFun, funObj);
      });
    }
  }

  add(value, ruleArr) {
    ruleArr.forEach((rule) => {
      this.funs.push({
        fun: this.validateFun[rule.shift()],
        msg: rule.shift(),
        params: [value].concat(rule)
      });
    })
    return this;
  }

  start() {
    for (let i = 0, rule; rule = this.funs[i++];) {
      if (rule.fun.apply(null, rule.params) === false) {
        return rule.msg;
      }
    }
  }
}
