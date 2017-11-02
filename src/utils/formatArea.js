import areaList from "../lib/gb_area.json"
import {debug} from "../lib/util";

const fArea = (item) => {
  return {label: item[1], value: item[0]}
}

const fList = (code) => {
  return areaList.filter((item) => {
    return item[3] && item[3] === code
  }).map((res) => {
    return fArea(res);
  })
}


export default (res, type = "code") => {
  let data = [];
  areaList.forEach((area) => {
    if (!area[3]) {
      data.push(fArea(area));
    }
  });

  if (res) {
    let ret = [];
    while (true) {
      let index = areaList.findIndex((item) => {
        return item[0] == res
      });
      let area = areaList[index];
      ret.push(fArea(area));
      if (area[3]) {
        res = area[3];
      } else {
        break;
      }
    }
    ret = ret.reverse();
    if (type == "code") {
      return ret.map((res) => {
        return res.value;
      })
    } else if (type == "text") {
      debug("ret",ret);
      return ret.map((res) => {
        return res.label
      }).join(" ");
    }
    else {
      return ret;
    }
  }


  //debug('area', data);
  return data.map((item) => {
    let children = fList(item.value);
    children = children.map((res) => {
      res.children = fList(res.value)
      return res;
    })
    item.children = children;
    return item;
  });
}
