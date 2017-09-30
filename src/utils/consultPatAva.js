export default (consult) => {
  if (consult.patAvatar) {
    return consult.patAvatar
  }
  else if (consult.consulterGender) {
    return `./static/img/pat.${consult.consulterGender}.jpg`
  }
  else {
    return `./static/img/pat.m.jpg`
  }

}
