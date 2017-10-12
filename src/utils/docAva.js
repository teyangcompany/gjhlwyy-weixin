export default (doc) => {
    if (doc && doc.docAvatar) {
        return doc.docAvatar;
    } else {
        return "./static/img/doctor.m.png"
    }
}