/**
 * 基于数据的表单验证类
 */
//基础验证方法
const validateFun = {
    need(value) {
        if (value) {
            return true
        } else {
            return false
        }
    },
    regex(value, regex) {
        return regex.test(value);
    },
    isPhone(value) {
        return /^1[0-9]{10}$/.test(value)
    },
    isNumber(value) {
        return /^[0-9]+$/.test(value);
    },
    isRealYear(value) {
        if (/^[0-9]{2}$/.test(value)) {
            return true
        } else if (/^[0-9]{4}$/.test(value) && value >= 0 && value <= new Date().getFullYear()) {
            return true
        } else {
            return false
        }
    },
    isRealMonth(value) {
        if (/^[0-9]{1,2}$/.test(value) && parseInt(value) <= 12) {
            return true
        }
        return false;
    },
    isRealDay(day, month, year) {
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);
        console.log(day, month, year, /^[0-9]{1,2}$/.test(day))
        if (/^[0-9]{1,2}$/.test(day) && day <= 31) {
            console.log("基本符合");
            if (month && [1, 3, 5, 7, 8, 10, 12].indexOf(month) >= 0 && day <= 31) {
                console.log("大月")
                return true
            }
            if (month && [4, 6, 9, 11].indexOf(month) >= 0 && day <= 30) {
                console.log("小月")
                return true
            }
            if (month && year && month == 2) {
                console.log("二月", year % 100, year % 4)
                if (year % 100 == 0 && year % 400 == 0 && day <= 29) {
                    return true
                }
                if (year % 100 != 0 && year % 4 == 0 && day <= 29) {
                    return true
                }
                if (year % 100 != 0 && year % 4 != 0 && day <= 28) {
                    return true
                }
                return false
            }
            return false;
        }
        return false
    },
    isIdCard(value) {
        if (/^[0-9]{15}$/.test(value)) {
            let year = value.substr(6, 2);
            let month = value.substr(8, 2);
            let day = value.substr(10, 2);
            if (this.isRealYear(year) && this.isRealMonth(month) && this.isRealDay(day, month, year)) {
                return true
            }
            return false
        } else if (/^[0-9]{17}[0-9Xx]$/.test(value)) {
            let year = value.substr(6, 4);
            let month = value.substr(10, 2);
            let day = value.substr(12, 2);
            if (this.isRealYear(year) && this.isRealMonth(month) && this.isRealDay(day, month, year)) {
                let quan = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                let last = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                for (let i = 0; i < 17; i++) {
                    sum += parseInt(value.substr(i, 1)) * quan[i];
                }
                console.log(sum, value.substr(17, 1))
                if (last[sum % 11] == value.substr(17, 1)) {
                    return true;
                }
                return false
            }
            return false;
        } else {
            return false;
        }

    },
    minLength(value, length) {
        return value.length >= parseInt(length);
    },
    maxLength(value, length) {
        return value.length <= parseInt(length);
    }
}

export default class validate {
    constructor(...args) {
        this.funs = [];
        this.validateFun = validateFun;
        if (args) {
            args.forEach((funObj) => {
                this.validateFun = Object.assign({}, this.validateFun, funObj);
            });
        }
    }

    /**
     *
     * @param value
     * @param ruleArr
     * [
     *  [funName,msg,params...]
     * ]
     * @returns {validate}
     */
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
            if (rule.fun.apply(this.validateFun, rule.params) === false) {
                return rule.msg;
            }
        }
    }
}
