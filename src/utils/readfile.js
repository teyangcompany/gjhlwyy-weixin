export default file => {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = () => {
            resolve(fr.result);
        }
        fr.onerror = (e) => {
            reject(e);
        }
    })
}