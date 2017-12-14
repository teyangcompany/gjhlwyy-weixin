export default url => {
  return new Promise((resolve, reject) => {
    let fr = new Image();
    fr.src = (url);
    fr.onload = () => {
      resolve(fr);
    }
    fr.onerror = (e) => {
      reject(e);
    }
  })
}
