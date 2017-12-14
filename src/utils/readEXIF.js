import EXIF from "exif-js"

export default url => {
  return new Promise((resolve, reject) => {
    let fr = new Image();
    fr.src = (url);
    EXIF.getData(fr, function () {
      resolve(EXIF.getAllTags(this))
    })
    fr.onerror = (res) => {
      reject(res);
    }
  })
}
